import { extend, is } from "@/utils";

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
    });
}
