import { extend, toCase } from "@/utils";
import BaseParser from "../factory/parser";
export default function useContext(Handle) {
    extend(Handle.prototype, {
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
        watchCtx(ctx) {
            const vm = this.vm;
            // 下列属性不需要监听变化
            const none = ["field", "value", "vm", "template", "name", "config", "control", "inject", "sync", "payload", "optionsTo", "update"];

            Object.keys(ctx.rule)
                .filter((k) => none.indexOf(k) === -1)
                .forEach((key) => {
                    ctx.watch.push(
                        vm.$watch(() => ctx.rule[key]),
                        (n, o) => {
                            this.watching = true;
                            if (false) {
                            } else if (key === "type") {
                                ctx.updateType();
                            }
                            this.watching = false;
                        },
                        {
                            deep: key !== "children",
                            sync: key === "children",
                        }
                    );
                });
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
    });
}
