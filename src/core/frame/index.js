import { extend, deepCopy, is } from "@/utils";
import $FormCreate from "../components/formCreate";
import Handle from "../handler";
import { createManager } from "../factory/manager";
import { mergeGlobal } from "./utils";
let _vue = null;

export default function FormCreateFactory(config) {
    let globalConfig = {
        // ui配置
        form: {},
        submitBtn: {},
        resetBtn: {},
        wrap: {},

        // 基础配置
        global: {},
        mounted: () => {},
        onSubmit: () => {},
    };

    function FormCreate(vm, rules, options) {
        extend(this, {
            vm,
            rules,
            manager: createManager(config.manager), //用来注册来自不同包的manager方法
        });
        this.init();
        this.initOptions(options);
    }

    extend(FormCreate.prototype, {
        init() {
            const vm = this.vm;
            const h = new Handle(this);
            this.$handler = h;

            vm.$on("hook:created", () => {
                this.created();
            });
        },
        initOptions(options) {
            this.options = deepCopy(globalConfig); //由Vue.use注册的顶层配置优先级最高
            this.updateOptions(options);
        },
        mergeOptions(globalOptions, userOptions) {
            userOptions = deepCopy(userOptions);
            // console.log(userOptions)
            if (userOptions.global) {
                userOptions.global = mergeGlobal(userOptions.global, globalOptions.global);
                delete globalOptions.global; // 防止下面继续合并
            }

            return this.$handler.$manager.mergeOptions(userOptions, globalOptions);
        },
        updateOptions(userOptions) {
            this.options = this.mergeOptions(this.options, userOptions); //用户传递的配置优先级为次
            this.$handler.$manager.updateOptions(this.options); //iview包里的默认配置优先级最低
        },
        created() {},
    });

    function $form() {
        return _vue.extend($FormCreate(FormCreate));
    }

    function create() {
        console.log("create方法");
    }

    function useStatic(create) {
        extend(create, {
            // Vue.use注册form-create组件，options为顶层配置
            install(Vue, options) {
                if (is.Object(options)) {
                    globalConfig = { ...globalConfig, ...options };
                }
                if (Vue._installedFormCreate === true) return;
                _vue = Vue;
                Vue.component("FormCreate", $form());
                Vue._installedFormCreate = true;
            },
        });
    }

    useStatic(create);

    return create;
}
