// 定义组件解析器，可以由用户决定返回什么样的值
const BaseParser = {
    init(ctx) {
    },
    // 从内部访问value，比如v-model绑定访问的时候，会经过toFormValue的转换
    toFormValue(value, ctx) {
        return value
    },
    // 从外部访问value，比如rule.value或:value.sync绑定的属性进行访问，会经过toValue的转换
     /*
        所以当v-model绑定的值变化时，要调用toValue去改变外部访问时的代理目标，即cacheValue
        当外部改变value时，要调用toFormValue改变内部访问时的代理目标formData
    */
    toValue(formValue, ctx) {
        return formValue;
    },
    mounted(ctx) {
    },
    // 默认使用render.defaultRender生成VNode，还有一些组件在parser文件中定义了自己生成VNode的方法
    render(children, ctx) {
        return ctx.$render.defaultRender(ctx, children);
    },
    preview(children, ctx) {
        return ctx.$render.defaultRender(ctx, children);
    },
    mergeProp(ctx) {
    }
}

export default BaseParser;