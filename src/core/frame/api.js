// 核心api
export default function Api(h) {
    const api = {
        get config() {
            return h.options;
        },
        get options() {
            return h.options;
        },

        /**
         * @description:
         * @param {Object} rule 新增规则
         * @param {String} after 插入到指定表单字段的组件之后
         * @param {Boolean} child 是否插入到子节点中
         * @return {*}
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
    };

    return api;
}
