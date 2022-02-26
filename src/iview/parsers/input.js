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
    mergeProp(ctx) {},
};
