const name = "button";

export default {
    name,
    // 新增了props.content，设置按钮内容，会覆盖rule.children
    mergeProp(ctx) {
        const props = ctx.prop.props || {};
        if (props.content) ctx.rule.children = [props.content];
    },
};
