// 定义组件解析器，可以由用户决定返回什么样的值
const BaseParser = {
    init(ctx) {
    },
    toFormValue(value, ctx) {
        return value
    },
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