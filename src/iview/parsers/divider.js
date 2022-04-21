const name = "divider";

export default {
    name,
    // 新增了props.title，设置分割线标题，会覆盖rule.children
    mergeProp(ctx) {
        const props = ctx.prop.props || {};
        if (props.title) ctx.rule.children = [props.title];
    },
};
