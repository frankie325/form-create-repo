import Api from "../frame/api";
import { extend } from "@form-create/utils";
import { funcProxy } from "../frame/utils";
import Render from "../render";
import useLoader from "./loader";
import useContext from "./context";
import useInput from "./input";
import useRender from "./render";
import useInject from "./inject";
import useEffect from "./effect";
import useLifecycle from "./lifecycle";
import useRequest from "./request";

export default function Handle(fc) {
    extend(this, {
        fc,
        vm: fc.vm,
        rules: fc.rules,
        subForm: {}, //子表单
        formData: {}, //表单数据
        appendData: {},
        form: {},
        deferSyncFn: undefined,
        api: undefined,
        watching: false, //rule中监听的属性变化了则为true
        loading: undefined, //表示正在处理所有rules
        sort: [], //保存最顶层的rule对应的ctx.id，按顺序排列，也是生成VNode时的顺序
        ctxs: {}, //所有rule对应的ctx实例，不论有没有定义rule.field都会进行设置
        nameCtx: {
            // "rule.name" : [ ctx ] //没有定义rule.name则不会进行设置
        },
        fieldCtx: {
            // "rule.field" : [ ctx ] //没有定义rule.field则不会进行设置
        },
        loadedId: 1,
        cycleLoad: false,
        isMounted: false,
        changeStatus: false,
        nextTick: null,
        nextReload: () => {
            this.lifecycle("reload");
        },
        providers: {},
    });

    funcProxy(this, {
        options() {
            return fc.options;
        },
        bus() {
            return fc.bus;
        },
    });
    this.initData(fc.rules);

    this.$manager = new fc.manager(this);
    this.$render = new Render(this);
    this.api = fc.extendApi(Api(this), this);
}

extend(Handle.prototype, {
    initData(rules) {
        extend(this, {
            ctxs: {},
            fieldCtx: {},
            nameCtx: {},
            sort: [],
            rules,
        });
    },
    initAppendData() {
        this.appendData = { ...this.appendData, ...(this.fc.options.formData || {}), ...(this.vm.value || {}) };
    },
    init() {
        this.initAppendData();
        this.useProvider();
        this.loadRule();
        this.$manager.__init();
        // debugger
        this.vm.$set(this.vm, "formData", this.formData);
    },
});

useLoader(Handle);
useContext(Handle);
useInput(Handle);
useRender(Handle);
useInject(Handle);
useEffect(Handle);
useLifecycle(Handle);
useRequest(Handle);
