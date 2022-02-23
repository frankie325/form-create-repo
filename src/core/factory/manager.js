import { extend, unique, mergeProps } from "@/utils";

//用来注册来自不同包的manager方法
export function createManager(proto) {
    class CustomManager extends Manager {}

    Object.assign(CustomManager.prototype, proto);

    return CustomManager;
}

export default function Manager(handle) {
    extend(this, {
        $handle: handle,
        vm: handle.vm,
        options: {},
        ref: "fcForm",
        key: null, //Form组件的key属性
        rule: {}, //渲染Form组件的VNodeData
        mergeOptionsRule: {
            // normal: ["form", "row", "info", "submitBtn", "resetBtn"],
            normal: ["form", "submitBtn", "resetBtn"],
        },
    });
    this.updateKey();
}

extend(Manager.prototype, {
    __init() {
        this.$render = this.$handle.$render;
        this.$r = (...args) => this.$render.renderRule(...args);
    },
    beforeRender() {},
    updateKey() {
        this.key = unique();
    },
    mergeOptions(target, opt) {
        // extend(target, opt);
        return mergeProps(target, [opt], this.mergeOptionsRule);
    },
    updateOptions(opt) {
        this.options = this.mergeOptions(this.getDefaultOptions(), opt);
        this.update();
    },
    getDefaultOptions() {
        return {};
    },
    render(children) {},
});
