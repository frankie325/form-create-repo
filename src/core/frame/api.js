import { byCtx } from "./utils";
import { is } from "@/utils";
import { $set } from "@/utils/modify";
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

    const api = {
        get config() {
            return h.options;
        },
        get options() {
            return h.options;
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
         * @description: 隐藏指定的表单控件，Dom节点不渲染，表单验证不会生效
         * @param {Boolean} state 是否开启隐藏
         * @param {String | string[]} fields 指定的表单字段
         */
        hidden(state, fields) {
            props(fields, "hidden", !!state);
            h.refresh();
        },
    };

    return api;
}
