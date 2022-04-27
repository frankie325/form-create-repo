import { byCtx, mergeRule } from "./utils";
import { extend, deepCopy } from "@form-create/utils";
import is, { hasProperty } from "@form-create/utils/type";
import { $set } from "@form-create/utils/modify";
import { invoke } from "./utils";
// 核心api
export default function Api(h) {
    function tidyFields(fields) {
        if (is.Undef(fields)) {
            fields = h.fields();
        } else if (!Array.isArray(fields)) {
            fields = [fields];
        }
        return fields;
    }

    function props(fields, key, val) {
        tidyFields(fields).forEach((field) => {
            h.getCtxs(field).forEach((ctx) => {
                $set(ctx.rule, key, val);
                h.$render.clearCache(ctx);
            });
        });
    }

    function allSubForm() {
        const subs = h.subForm;
        return Object.keys(subs).reduce((initial, k) => {
            const sub = subs[k];
            if (!sub) return initial;
            if (Array.isArray(sub)) initial.push(...sub);
            else initial.push(sub);
            return initial;
        }, []);
    }

    const api = {
        get config() {
            return h.options;
        },
        get options() {
            return h.options;
        },
        get form() {
            return h.form;
        },
        get rule() {
            return h.rules;
        },
        get parent() {
            return h.vm.$pfc;
        },
        get children() {
            return allSubForm();
        },
        helper: {
            tidyFields,
            props,
        },
        /**
         * @description: 获取所有表单字段
         * @return {string[]}
         */
        fields: () => h.fields(),
        /**
         * @description: 获取指定表单字段的值
         * @param {String} field 指定字段
         * @return {any}
         */
        getValue(field) {
            if (is.String(field)) {
                const ctx = h.getFieldCtx(field);
                if (!ctx) return;
                return deepCopy(ctx.rule.value);
            }
        },
        /**
         * @description: 设置表单值，全部覆盖，没有定义的字段全部设置为undefined
         * @param {Object} formData
         */
        coverValue(formData) {
            h.deferSyncValue(() => {
                api.fields().forEach((key) => {
                    const ctxs = h.fieldCtx[key];
                    if (!ctxs) return (h.appendData[key] = formData[key]);
                    const flag = hasProperty(formData, key);
                    ctxs.forEach((ctx) => {
                        ctx.rule.value = flag ? formData[key] : undefined;
                    });
                });
            });
        },
        /**
         * @description: 设置表单值，采用合并
         * @param {Object} formData
         * 或者
         * @param {field} 表单字段
         * @param {value} 值
         */
        setValue(field) {
            let formData = field;
            if (arguments.length >= 2) formData = { [field]: arguments[1] };
            h.deferSyncValue(() => {
                Object.keys(formData).forEach((key) => {
                    const ctxs = h.fieldCtx[key];
                    if (!ctxs) return (h.appendData[key] = formData[key]);
                    ctxs.forEach((ctx) => {
                        ctx.rule.value = formData[key];
                    });
                });
            });
        },
        /**
         * @description: 重置表单数据为初始时候的值
         * @param {String | string[]} fields 指定的表单字段，不填则为全部
         */
        resetFields(fields) {
            tidyFields(fields).forEach((field) => {
                h.getCtxs(field).forEach((ctx) => {
                    // h.onInput(ctx, ctx.defaultValue);
                    // h.$render.clearCache(ctx);
                    ctx.rule.value = deepCopy(ctx.defaultValue);
                    // h.refreshControl(ctx);
                });
            });
        },
        /**
         * @description: 隐藏指定的表单控件，Dom节点不渲染，表单验证不会生效
         * @param {Boolean} state 是否开启隐藏
         * @param {String | string[]} fields 指定的表单字段
         */
        hidden(state, fields) {
            props(fields, "hidden", !!state);
            h.refresh();
        },
        /**
         * @description: 通过 display:none 隐藏指定的表单控件，Dom渲染，表单验证生效
         * @param {Boolean} state 是否开启隐藏
         * @param {String | string[]} fields 指定的表单字段
         */
        display(state, fields) {
            props(fields, "show", !!state);
            h.refresh();
        },
        /**
         * @description: 禁用表单组件
         * @param {Boolean} disabled 是否禁用
         * @param { 不填 | String | string[]} fields 指定的表单字段，不填则禁用所有
         */
        disabled(disabled, fields) {
            tidyFields(fields).forEach((field) => {
                h.getCtxs(field).forEach((ctx) => {
                    $set(ctx.rule.props, "disabled", !!disabled);
                    h.$render.clearCache(ctx);
                });
            });
            h.refresh();
        },
        /**
         * @description: 移除指定表单字段的表单组件
         * @param {String} field 指定的表单字段
         */
        removeField(field) {
            const ctx = h.getCtx(field);
            h.deferSyncValue(() => {
                h.getCtxs(field).forEach((ctx) => {
                    ctx.rm();
                });
            }, true);
            return ctx ? ctx.origin : undefined;
        },
        /**
         * @description:删除rule对应的表单组件
         * @param {*} rule 指定rule对象
         */
        removeRule(rule) {
            const ctx = rule && byCtx(rule);
            if (!ctx) return;
            ctx.rm();
            return ctx.origin;
        },
        /**
         * @description:新增追加规则到指定位置
         * @param {Object} rule 新的规则
         * @param {String} after 插入到指定表单字段的组件之后
         * @param {Boolean} child 是否插入到子节点中
         */
        append(rule, after, child) {
            let index = h.sort.length - 1,
                rules;
            const ctx = h.getCtx(after);
            if (ctx) {
                if (child) {
                    rules = ctx.rule.children;
                    index = ctx.rule.children.length - 1;
                } else {
                    index = ctx.root.indexOf(ctx.origin);
                    rules = ctx.root;
                }
            } else rules = h.rules;
            rules.splice(index + 1, 0, rule);
        },
        /**
         * @description: 新增前置规则到指定位置
         * @param {Object} rule 新的规则
         * @param {String} before 插入到指定表单字段的组件之前
         * @param {Boolean} child 是否插入到子节点中
         */
        prepend(rule, before, child) {
            let index = 0,
                rules;
            const ctx = h.getCtx(before);
            if (ctx) {
                if (child) {
                    rules = ctx.rule.children;
                } else {
                    index = ctx.root.indexOf(ctx.origin);
                    rules = ctx.root;
                }
            } else rules = h.rules;
            rules.splice(index, 0, rule);
        },
        /**
         * @description:获取所有表单组件规则
         * @param {Boolean} origin 是否返回原始规则（creator实例）
         * @return {Object}
         */
        model(origin) {
            return h.fields().reduce((initial, key) => {
                const ctx = h.fieldCtx[key][0];
                initial[key] = origin ? ctx.origin : ctx.rule;
                return initial;
            }, {});
        },
        /**
         * @description: 更新指定规则，合并方式
         * @param {String} field 表单字段
         * @param {Object} rule 表单规则
         * @return {*}
         */
        mergeRule(field, rule) {
            h.getCtxs(field).forEach((ctx) => {
                mergeRule(ctx.rule, rule);
                h.$render.clearCache(ctx);
            });
            h.refresh();
        },
        /**
         * @description: 一次更新多个指定规则，合并方式
         * @param {Object} rules 规则对象
         */
        mergeRules(rules) {
            Object.keys(rules).forEach((field) => {
                api.mergeRule(field, rules[field]);
            });
        },
        /**
         * @description: 更新指定规则，覆盖方式
         * @param {String} field 表单字段
         * @param {Object} rule 表单规则
         * @return {*}
         */
        updateRule(field, rule) {
            h.getCtxs(field).forEach((ctx) => {
                extend(ctx.rule, rule);
                h.$render.clearCache(ctx);
            });
            h.refresh();
        },
        /**
         * @description: 一次更新多个指定规则，覆盖方式
         * @param {Object} rules 规则对象
         */
        updateRules(rules) {
            Object.keys(rules).forEach((field) => {
                api.updateRule(field, rules[field]);
            });
        },
        /**
         * @description: 更新表单组件的校验规则
         * @param {String} field 表单字段
         * @param {Object | Array} validate 校验规则
         * @param {Boolean} merge 是否采用合并方式，否则直接覆盖
         */
        updateValidate(field, validate, merge) {
            if (merge) {
                api.mergeRule(field, { validate });
            } else {
                // debugger
                props(field, "validate", validate);
                api.nextTick(() => {
                    api.clearValidateState(field);
                });
                // h.refresh();
            }
        },
        /**
         * @description: 批量更新表单组件的校验规则
         * @param {Object} validates 校验规则
         * @param {*} merge 是否采用合并方式，否则直接覆盖
         */
        updateValidates(validates, merge) {
            Object.keys(validates).forEach((field) => {
                api.updateValidate(field, validates[field], merge);
            });
        },
        /**
         * @description: 刷新校验规则
         */
        refreshValidate() {
            h.vm.validate = {};
            api.refresh();
        },
        /**
         * @description: 获取表单数据，返回的值不是双向绑定
         * @param {String | string[]} fields 指定的表单字段，不填则为全部
         */
        formData(fields) {
            return tidyFields(fields).reduce((initial, id) => {
                const ctx = h.getFieldCtx(id);
                if (!ctx) return initial;
                initial[ctx.field] = deepCopy(ctx.rule.value);
                return initial;
            }, {});
        },
        /**
         * @description: 获取表单数据，返回的值为双向绑定
         */
        bind() {
            return api.form;
        },
        /**
         * @description: 表示表单中的值是否发生了变化
         */
        changeStatus() {
            return h.changeStatus;
        },
        /**
         * @description: 清除变化状态
         */
        clearChangeStatus() {
            h.changeStatus = false;
        },
        /**
         * @description: 刷新表单渲染
         */
        refresh() {
            allSubForm().forEach((sub) => {
                sub.refresh();
            });
            h.$render.clearCacheAll();
            h.refresh();
        },
        /**
         * @description: 更新表单配置
         * @param {Object} options 表单配置规则
         */
        updateOptions(options) {
            h.fc.updateOptions(options);
            api.refresh();
        },
        /**
         * @description: 刷新表单配置
         */
        refreshOptions() {
            h.$manager.updateOptions(h.options);
            api.refresh();
        },
        /**
         * @description: 更新表单提交事件方法
         * @param {Function} fn 提交方法
         */
        onSubmit(fn) {
            api.updateOptions({ onSubmit: fn });
        },
        /**
         * @description: 隐藏表单
         * @param {Boolean} hide
         */
        hideForm(hide) {
            $set(h.vm, "isShow", !hide);
        },
        /**
         * @description: 重载表单，重新加载新的rules规则
         * @param {Array} rules rules规则数组
         */
        reload(rules) {
            h.reloadRule(rules);
        },
        /**
         * @description: 销毁表单
         */
        destroy() {
            h.vm.$el.parentNode && h.vm.$el.parentNode.removeChild(h.vm.$el);
            h.vm.$destroy();
        },
        /**
         * @description: 表单重新渲染后的回调
         * @param {Function} fn
         */
        nextTick(fn) {
            h.bus.$once("next-tick", fn);
            h.refresh();
        },
        /**
         * @description: 执行传入的方法后，如果表单没重新渲染，会自动重新渲染
         * @param {Function} fn
         */
        nextRefresh(fn) {
            fn && invoke(fn);
            h.nextRefresh();
        },
    };

    return api;
}
