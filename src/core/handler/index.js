import { extend } from "@/utils";
import { funcProxy } from "../frame/utils";
import Render from "../render";
import useLoader from "./loader";
import useContext from "./context";
import useInput from "./input";
import useRender from "./render";
export default function Handle(fc) {
    extend(this, {
        fc,
        vm: fc.vm,
        rules: fc.rules,
        formData: {}, //表单数据
        appendData: {},
        form: {},
        deferSyncFn:undefined,
        api: undefined,
        watching: false, //rule中监听的属性变化了则为true
        loading: undefined, //表示正在处理所有rules
        sort: [], //保存最顶层的rule对应的ctx.id，按顺序排列，生成VNode时用到
        ctxs: {}, //所有rule对应的ctx实例，不论有没有定义rule.field都会进行设置
        nameCtx: {
            // "rule.name" : [ ctx ] //没有定义rule.name则不会进行设置
        },
        fieldCtx: {
            // "rule.field" : [ ctx ] //没有定义rule.field则不会进行设置
        },
        loadedId: 1,
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
        this.$manager.__init();
        this.vm.$set(this.vm, "formData", this.formData);
    },
});

useLoader(Handle);
useContext(Handle);
useInput(Handle);
useRender(Handle);
