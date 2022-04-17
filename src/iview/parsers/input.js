const name = "input";

export default {
    name,
    mergeProp(ctx) {
        let props = ctx.prop.props;
        // 设置了autosize，则rows不会生效，默认展示行数取minRows
        if (props.autosize && props.autosize.minRows) {
            props.rows = props.autosize.minRows || 2;
        }
    },
};
