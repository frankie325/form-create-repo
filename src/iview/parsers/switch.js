const name = "switch";

export default {
    name,
    // 新增了props.open和props.close属性，并转换为插槽
    mergeProp(ctx) {
        const props = ctx.prop.props || {};
        const scopedSlots = ctx.prop.scopedSlots || {};
        if (!scopedSlots.open && props.open) scopedSlots.open = () => props.open;
        if (!scopedSlots.close && props.close) scopedSlots.close = () => props.close;
        ctx.prop.scopedSlots = scopedSlots;
    },
};
