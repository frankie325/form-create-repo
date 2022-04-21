const name = "panel";

export default {
    name,
    // 新增了props.headContent，方便设置折叠面板的面板头内容
    mergeProp(ctx) {
        const props = ctx.prop.props || {};
        const scopedSlots = ctx.prop.scopedSlots || {};
        if (!scopedSlots.default && props.headContent) scopedSlots.default = () => props.headContent;
        ctx.prop.scopedSlots = scopedSlots;
    },
};
