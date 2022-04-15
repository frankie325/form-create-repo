import { extend, toCase, is } from "@/utils";
import BaseParser from "../factory/parser";
import { invoke } from "../frame/utils";
import { $del } from "@/utils/modify";
export default function useContext(Handle) {
    extend(Handle.prototype, {
        getCtx(id) {
            return this.getFieldCtx(id) || this.getNameCtx(id)[0] || this.ctxs[id];
        },
        getCtxs(id) {
            return this.fieldCtx[id] || this.nameCtx[id] || (this.ctxs[id] ? [this.ctxs[id]] : []);
        },
        getNameCtx(name) {
            return this.nameCtx[name] || [];
        },
        getType(originType) {
            const map = this.fc.CreateNode.aliasMap;
            const type = map[originType] || map[toCase(originType)] || originType;
            return toCase(type);
        },
        getParser(ctx) {
            const list = this.fc.parsers;
            return list[ctx.originType] || list[toCase(ctx.type)] || list[ctx.trueType] || BaseParser;
        },
        bindParser(ctx) {
            ctx.setParser(this.getParser(ctx));
        },
        noWatch(fn) {
            if (!this.noWatchFn) {
                this.noWatchFn = fn;
            }
            invoke(fn);
            if (this.noWatchFn === fn) {
                this.noWatchFn = null;
            }
        },
        getFieldCtx(field) {
            return (this.fieldCtx[field] || [])[0];
        },
        setIdCtx(ctx, key, type) {
            const field = `${type}Ctx`;
            if (!this[field][key]) {
                this[field][key] = [ctx];
            } else {
                this[field][key].push(ctx);
            }
        },
        // 将ctx实例设置到handler.ctxs中，不论有没有定义rule.field都会进行设置
        setCtx(ctx) {
            const { id, field, name, rule } = ctx;
            this.ctxs[id] = ctx;
            name && this.setIdCtx(ctx, name, "name");
            if (!ctx.input) return;
            this.setIdCtx(ctx, field, "field");
            this.setFormData(ctx, ctx.parser.toFormValue(rule.value, ctx));
        },
        watchCtx(ctx) {
            const vm = this.vm;
            // 下列属性不需要监听变化
            // const none = ["field", "value", "vm", "template", "name", "config", "control", "inject", "sync", "payload", "optionsTo", "update"];
            const none = ["field", "value", "vm", "template", "name", "config", "control", "inject", "update"];

            Object.keys(ctx.rule)
                .filter((k) => k[0] !== "_" && none.indexOf(k) === -1)
                .forEach((key) => {
                    ctx.watch.push(
                        vm.$watch(
                            () => ctx.rule[key],
                            (n, o) => {
                                if (this.loading || this.noWatchFn || this.reloading) return;
                                // debugger
                                this.watching = true;
                                if (["props", "on", "nativeOn"].indexOf(key) > -1) {
                                    this.parseInjectEvent(ctx.rule, n || {});
                                } else if (["emit", "nativeEmit"].indexOf(key) > -1) {
                                    this.parseEmit(ctx, key === "emit");
                                } else if (key === "request") {
                                    this.parseRequest(ctx);
                                    this.runRequest(ctx);
                                } else if (key === "type") {
                                    ctx.updateType();
                                    this.bindParser(ctx);
                                } else if (key === "children") {
                                    // debugger;
                                    const flag = is.trueArray(n);
                                    this.deferSyncValue(() => {
                                        if (n !== o) {
                                            this.rmSub(o);
                                            this.$render.initOrgChildren();
                                        }
                                    });
                                    flag && this.loadChildren(n, ctx);
                                    this.vm.$emit("update", this.api);
                                }
                                this.$render.clearCache(ctx);
                                this.watching = false;
                                this.refresh();
                            },
                            {
                                deep: key !== "children",
                                sync: key === "children",
                            }
                        )
                    );
                });

            this.watchEffect(ctx);
        },
        rmSub(sub) {
            is.trueArray(sub) &&
                sub.forEach((r) => {
                    r && r.__fc__ && this.rmCtx(r.__fc__);
                });
        },
        rmIdCtx(ctx, key, type) {
            const field = `${type}Ctx`;
            const lst = this[field][key];
            if (!lst) return false;
            const flag = lst.splice(lst.indexOf(ctx) >>> 0, 1).length > 0;
            if (!lst.length) {
                delete this[field][key];
            }
            return flag;
        },
        rmCtx(ctx) {
            if (ctx.deleted) return;
            const { id, field, input, name } = ctx;

            // 重新定义value，不再代理到formData，因为在下面已经删除了
            // 因为rule还会用到，不然初始化时value的值为undefined
            if (ctx.input) {
                Object.defineProperty(ctx.rule, "value", {
                    value: ctx.rule.value,
                    writable: true,
                });
            }
            // debugger;
            $del(this.ctxs, id);
            $del(this.$render.orgChildren, id);
            $del(this.vm.ctxInject, id);
            $del(this.formData, id);
            $del(this.subForm, id);
            $del(ctx, "cacheValue");

            input && this.rmIdCtx(ctx, field, "field");
            name && this.rmIdCtx(ctx, name, "name");

            this.syncForm();

            this.deferSyncValue(() => {
                // debugger
                // if (!this.reloading) {
                if (ctx.parser.loadChildren !== false) {
                    if (is.trueArray(ctx.rule.children)) {
                        ctx.rule.children.forEach((c) => {
                            c.__fc__ && this.rmCtx(c.__fc__);
                        });
                    }
                    if (ctx.root === this.rules) {
                        this.vm._renderRule();
                    }
                }
                // }
            }, input);

            const index = this.sort.indexOf(id);
            if (index > -1) {
                this.sort.splice(index, 1);
            }

            this.$render.clearCache(ctx);
            ctx.delete();
            this.effect(ctx, "deleted");
            input && !this.fieldCtx[field] && this.vm.$emit("removeField", field, ctx.rule, this.api);
            ctx.rule.__ctrl || this.vm.$emit("removeRule", ctx.rule, this.api);
            return ctx;
        },
    });
}
