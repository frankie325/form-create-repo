import { extend } from "@/utils";

export default function useRender(Render) {
    extend(Render.prototype, {
        initCache() {
            this.clearCacheAll();
        },
        clearCache(ctx) {
            if (!this.cache[ctx.id]) {
                // ctx.parent &&
                return;
            }

            this.cache[ctx.id] = null;
        },
        clearCacheAll() {
            this.cache = {};
        },
        setCache(ctx, vnode, parent) {
            this.cache[ctx.id] = {
                vnode,
                use: false,
                parent,
                slot: ctx.rule.slot,
            };
        },
        getCache(ctx) {
            const cache = this.cache[ctx.id];
            cache.use = true;
            return cache.vnode;
        },
    });
}
