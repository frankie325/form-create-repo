const name = "input";

export default {
    name,
    // rule.value，form-create上v-model绑定的值修改了，对formData[ctx.id]设置的值，可以进行转化
    toFormValue(value, ctx) {
        return value;
    },
    // 访问formData[ctx.id]值时，可以进行转化
    toValue(formValue, ctx) {
        return formValue;
    },
    mergeProp(ctx) {
        let props = ctx.prop.props;
        // 设置了autosize，则rows不会生效，默认展示行数取minRows
        if (props.autosize && props.autosize.minRows) {
            props.rows = props.autosize.minRows || 2;
        }
    },
};
