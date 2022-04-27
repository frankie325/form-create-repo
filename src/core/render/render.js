import { extend, is } from "@form-create/utils";
import { $set } from "@form-create/utils/modify";
import { mergeRule } from "../frame/utils";
import { lower } from "@form-create/utils/toCase";
export default function useRender(Render) {
    extend(Render.prototype, {
        initRender() {
            this.tempList = {};
            this.clearOrgChildren();
        },
        // 保存每一个rule项的rule.children，没有则为空数组
        initOrgChildren() {
            const ctxs = this.$handle.ctxs;
            this.orgChildren = Object.keys(ctxs).reduce((initial, id) => {
                if (ctxs[id].parser.loadChildren !== false) {
                    const children = ctxs[id].rule.children;
                    initial[id] = is.trueArray(children) ? [...children] : [];
                }
                return initial;
            }, {});
        },
        clearOrgChildren() {
            this.orgChildren = {};
        },
        // 合并option.global中的配置到rule
        mergeGlobal(ctx) {
            const g = this.$handle.options.global;
            if (!g) return;
            if (!ctx.cacheConfig) {
                ctx.cacheConfig = g[ctx.originType] || g[ctx.type] || g[ctx.trueType] || {};
            }
            // debugger;
            ctx.prop = mergeRule({}, [g["*"], ctx.cacheConfig, ctx.prop]);
        },
        render() {
            // debugger
            if (!this.vm.isShow) {
                return;
            }
            this.$h = this.vm.$createElement;
            this.$manager.beforeRender();

            let vn;

            const make = () => this.renderList();

            vn = make();
            // 生成Form包裹所有组件
            return this.$manager.render(vn);
        },
        renderList() {
            return this.sort
                .map((id) => {
                    return this.renderCtx(this.$handle.ctxs[id]);
                })
                .filter((val) => val !== undefined);
        },
        renderCtx(ctx, parent) {
            // debugger
            // console.log(ctx);
            if (ctx.rule.type === "hidden") return;
            const rule = ctx.rule;

            /*
            没有缓存，则进入下述的过程
            只要访问了form-create的响应式数据都会收集form-create的渲染Watcher
            当响应式数据变化时，触发form-create更新
            */
            if (!this.cache[ctx.id]) {
                let vn;
                let cacheFlag = true; //是否需要缓存
                const _type = ctx.trueType;

                const isShow = is.Undef(rule.show) || !!rule.show;

                if (_type === "fcFragment") {
                    vn = this.renderChildren(ctx);
                } else {
                    ctx.initProp(); //重新合并rule，比如重新注入参数后的事件
                    this.mergeGlobal(ctx);
                    this.ctxProp(ctx);
                    let prop = ctx.prop;

                    prop.props.formCreateInject = this.injectProp(ctx);

                    if (prop.hidden) {
                        this.setCache(ctx, undefined, parent);
                        return;
                    }

                    // 递归处理rule.children
                    let children = [];
                    if (ctx.parser.renderChildren) {
                        children = ctx.parser.renderChildren(ctx);
                    } else if (ctx.parser.loadChildren !== false) {
                        children = this.renderChildren(ctx);
                    }

                    vn = ctx.parser.render(children, ctx); //调用parser解析器生成VNode，没有则调用defaultRender
                    // debugger
                    if (ctx.input && prop.native !== false) {
                        vn = this.$manager.makeWrap(ctx, vn);
                    }

                    if (!isShow) {
                        vn = this.display(vn);
                    }
                    vn = this.item(ctx, vn);
                }
                if (cacheFlag) {
                    this.setCache(ctx, vn, parent);
                }

                return vn;
            }
            return this.getCache(ctx);
        },
        injectProp(ctx) {
            // 这里对ctxInject操作，会导致form-create执行完render，再次执行render
            if (!this.vm.ctxInject[ctx.id]) {
                $set(this.vm.ctxInject, ctx.id, {
                    api: this.$handle.api,
                    options: [],
                    children: [],
                    prop: {},
                    field: ctx.field,
                    rule: ctx.rule,
                });
            }
            const inject = this.vm.ctxInject[ctx.id];

            extend(inject, {
                options: ctx.prop.options,
                children: ctx.rule.children,
                prop: (function () {
                    const temp = { ...ctx.prop };
                    temp.on = temp.on ? { ...temp.on } : {};
                    delete temp.model;
                    return temp;
                })(),
            });
            return inject;
        },
        display(vn) {
            if (Array.isArray(vn)) {
                const data = [];
                vn.forEach((v) => {
                    if (Array.isArray(v)) return this.display(v);
                    if (this.none(v)) data.push(vn);
                });
                return data;
            } else {
                return this.none(vn);
            }
        },
        none(vn) {
            if (vn && vn.data) {
                if (Array.isArray(vn.data.style)) {
                    vn.data.style.push({ display: "none" });
                } else {
                    vn.data.style = [vn.data.style, { display: "none" }];
                }
                return vn;
            }
        },
        item(ctx, vn) {
            return this.$h(
                "fcFragment",
                {
                    slot: ctx.rule.slot,
                    key: ctx.key,
                },
                [vn]
            );
        },
        // 注入参数，可以提供给自定义组件使用
        injectProp(ctx) {
            if (!this.vm.ctxInject[ctx.id]) {
                $set(this.vm.ctxInject, ctx.id, {
                    api: this.$handle.api,
                    form: this.fc.create,
                    subForm: (subForm) => {
                        this.$handle.addSubForm(ctx, subForm);
                    },
                    options: [],
                    children: [],
                    prop: {},
                    field: ctx.field,
                    rule: ctx.rule,
                });
            }
            const inject = this.vm.ctxInject[ctx.id];
            extend(inject, {
                options: ctx.prop.options,
                children: ctx.rule.children,
                prop: (function () {
                    const temp = { ...ctx.prop };
                    temp.on = temp.on ? { ...temp.on } : {};
                    delete temp.model;
                    return temp;
                })(),
            });
            return inject;
        },
        renderChildren(ctx) {
            const { children } = ctx.rule,
                orgChildren = this.orgChildren[ctx.id];
            // debugger;
            const notRm = (child) => {
                return !is.String(child) && child.__fc__ && this.$handle.ctxs[child.__fc__.id];
            };
            // 通过this.splice删除rule.children时，删除相应的ctx实例
            orgChildren.forEach((child, index) => {
                if (!child) return;
                if (children.indexOf(child) === -1 && notRm(child)) {
                    this.$handle.rmCtx(child.__fc__);
                    orgChildren.splice(index, 1);
                }
            });

            // console.log(children);
            return children.map((child) => {
                if (!child) return;
                if (is.String(child)) return child;
                if (child.__fc__) {
                    return this.renderCtx(child.__fc__, ctx);
                }
            });
        },
        onMounted(ctx) {
            ctx.el = this.vm.$refs[ctx.ref];
            if (ctx.el) {
                (ctx.el.$el || ctx.el).__rule__ = ctx.rule;
            }
            ctx.parser.mounted(ctx);
            this.$handle.effect(ctx, "mounted");
            this.$handle.runRequest(ctx);
        },
        // onUpdated(ctx) {
        //     this.$handle.effect(ctx, "updated");
        //     console.log(ctx)
        // },
        onInput(ctx, value) {
            this.$handle.onInput(ctx, value);
        },
        // 绑定v-model
        ctxProp(ctx, custom) {
            const { ref, key, rule } = ctx;
            this.$manager.mergeProp(ctx, custom);
            ctx.parser.mergeProp(ctx, custom);

            const props = [
                {
                    ref: ref,
                    key: rule.key || `${key}fc`,
                    slot: undefined,
                    on: {
                        "hook:mounted": () => {
                            this.onMounted(ctx);
                        },
                        // "hook:updated": () => {
                        //     this.onUpdated(ctx);
                        // },
                    },
                },
            ];

            if (ctx.input) {
                props.push({
                    model: {
                        value: this.$handle.getFormData(ctx),
                        callback: (value) => {
                            this.onInput(ctx, value);
                        },
                        expression: `formData.${ctx.id}`,
                    },
                });
            }
            mergeRule(ctx.prop, props);
        },
        // 根据rule.type在CreateNode实例中找到对应的方法生成VNode
        defaultRender(ctx, children) {
            const prop = ctx.prop;
            // if(ctx.type=="select") debugger

            if (this.vNode[ctx.type]) return this.vNode[ctx.type](prop, children);

            if (this.vNode[ctx.originType]) return this.vNode[ctx.originType](prop, children);

            return this.vNode.make(lower(ctx.originType), prop, children);
        },
        // 用来生成非rule规则项的VNode，比如Form、FormItem等
        renderRule(rule, children, origin) {
            if (!rule) return;

            let type;
            if (origin) {
                type = rule.type;
            } else {
                if (rule.type) {
                    type = this.vNode.aliasMap[rule.type];
                }
            }
            let data = [[children]];
            return this.$h(type, { ...rule }, data);
        },
    });
}
