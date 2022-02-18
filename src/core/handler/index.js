import { extend } from "@/utils";
import { funcProxy } from "../frame/utils";
import Render from "../render";
import useLoader from "./loader";
import useContext from "./context";
import useInput from "./input";

export default function Handle(fc) {
    extend(this, {
        fc,
        vm: fc.vm,
        rules: fc.rules,
        formData: {},
        appendData: {},
        form: {},
        api: null,
        watching: false, //rule中监听的属性变化了则为true
        loading: undefined, //表示正在处理所有rules
        ctxs: {}, //所有rule对应的ctx实例
        nameCtx: {
            // "rule.name" : [ ctx ] //没有定义rule.name则不会进行设置
        },
        fieldCtx: {
            // "rule.field" : [ ctx ] //没有定义rule.field则不会进行设置
        },
    });

    funcProxy(this, {
        options() {
            return fc.options;
        },
    });

    this.$manager = new fc.manager(this); //
    this.$render = new Render(this);
}

extend(Handle.prototype, {
    init() {
        console.log("Handle.init");
        this.appendData = { ...(this.fc.options.formData || {}), ...(this.vm.value || {}), ...this.appendData };
        this.loadRule();
    },
});

useLoader(Handle);
useContext(Handle);
useInput(Handle);
