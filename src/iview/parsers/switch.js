const name = "switch";

export default {
    name,
    // 新增了props.open和props.close属性，并转换为插槽
    mergeProp(ctx) {
        const props = ctx.prop.props || {};
        const scopedSlots = ctx.prop.scopedSlots || {};
        if (props.open) scopedSlots.open = () => props.open;
        if (props.close) scopedSlots.close = () => props.close;
        ctx.prop.scopedSlots = scopedSlots;
    },
};
