import { extend, is } from "@/utils";
import { mergeRule } from "../frame/utils";
export default function useRender(Render) {
    extend(Render.prototype, {
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
        // 合并option.global中的配置到rule
        mergeGlobal(ctx) {
            const g = this.$handle.options.global;
            if (!g) return;
            if (!ctx.cacheConfig) {
                ctx.cacheConfig = g[ctx.originType] || g[ctx.type] || g[ctx.trueType] || {};
            }
            ctx.prop = mergeRule({}, [ctx.prop, g["*"], ctx.cacheConfig]);
        },
        render() {
            if (!this.vm.isShow) {
                return;
            }
            this.$h = this.vm.$createElement;
            this.$manager.beforeRender();

            let vn;

            const make = () => this.renderList();

            vn = make();
            console.log(vn);

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
            // console.log(ctx);
            if (ctx.rule.type === "hidden") return;
            const rule = ctx.rule;
            if (!this.cache[ctx.id]) {
                let vn;
                let cacheFlag = true; //是否需要缓存
                const _type = ctx.trueType;

                if (false) {
                } else {
                    ctx.initProp(); //重新合并rule，比如重新注入参数后的事件
                    this.mergeGlobal(ctx);
                    this.ctxProp(ctx);
                    let prop = ctx.prop;

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

                    if (ctx.input && prop.native !== false) {
                        vn = this.$manager.makeWrap(ctx, vn);
                    }
                }
                if (cacheFlag) {
                    this.setCache(ctx, vn, parent);
                }

                return vn;
            }
            return this.getCache(ctx);
        },
        renderChildren(ctx) {
            const { children } = ctx.rule,
                orgChildren = this.orgChildren[ctx.id];
            // console.log(children);
            return children.map((child) => {
                if (!child) return; //无效的，直接返回
                if (is.String(child)) return child;
                if (child.__fc__) {
                    return this.renderCtx(child.__fc__, ctx);
                }
            });
        },
        onMounted(ctx) {},
        onInput(ctx, value) {
            this.$handle.onInput(ctx, value);
        },
        // 绑定v-model
        ctxProp(ctx, custom) {
            const { ref, key, rule } = ctx;
            const props = [
                {
                    ref: ref,
                    key: rule.key || `${key}fc`,
                    slot: undefined,
                    on: {
                        "hook:mounted": () => {
                            this.onMounted(ctx);
                        },
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
            // console.log(ctx.prop.on)
        },
        // 根据rule.type在CreateNode实例中找到对应的方法生成VNode
        defaultRender(ctx, children) {
            const prop = ctx.prop;
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
