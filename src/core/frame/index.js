import { extend, deepCopy, is, toCase } from "@/utils";
import { mergeGlobal } from "./utils";

import $FormCreate from "../components/formCreate";
import fragment from "../components/fragment";
import Handle from "../handler";
import { createManager } from "../factory/manager";
import createNodeFactory from "../factory/node";
import BaseParser from "../factory/parser";
let _vue = null;

function _parseProp(name, id) {
    let prop;
    if (arguments.length === 2) {
        prop = arguments[1];
        id = prop[name];
    } else {
        prop = arguments[2];
    }

    return { id, prop };
}

function nameProp() {
    return _parseProp("name", ...arguments);
}

export default function FormCreateFactory(config) {
    const parsers = {};
    const maker = {};
    const CreateNode = createNodeFactory();

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
            CreateNode,
            parsers,
            bus: new _vue(),
            extendApi: config.extendApi || ((api) => api), //注册来自不同包的api
        });
        this.init();
        this.initOptions(options);
    }

    extend(FormCreate.prototype, {
        init() {
            const vm = this.vm;
            const h = new Handle(this);
            this.$handle = h;
            vm.$f = h.api;
            vm.$emit("input", h.api);
            vm.$on("hook:created", () => {
                this.created();
            });

            vm.$on("hook:mounted", () => {
                this.mounted();
            });

            vm.$on("hook:updated", () => {
                h.bindNextTick(() => this.bus.$emit("next-tick", h.api));
            });
        },
        initOptions(options) {
            this.options = deepCopy(globalConfig); //由Vue.use注册的顶层配置
            this.updateOptions(options);
        },
        mergeOptions(globalOptions, userOptions) {
            userOptions = deepCopy(userOptions);

            if (userOptions.global) {
                userOptions.global = mergeGlobal(globalOptions.global, userOptions.global);
                delete userOptions.global; // 防止下面继续合并
            }

            return this.$handle.$manager.mergeOptions(globalOptions, userOptions);
        },
        updateOptions(userOptions) {
            this.options = this.mergeOptions(this.options, userOptions); //用户传递的配置优先级大于顶层配置
            this.$handle.$manager.updateOptions(this.options); //iview包里的默认配置优先级最低
        },
        created() {
            this.$handle.init();
            this.vm.$emit("created", this.api());
        },
        api() {
            return this.$handle.api;
        },
        mounted() {
            this.$handle.mounted();
        },
        render() {
            return this.$handle.render();
        },
    });

    function $form() {
        return _vue.extend($FormCreate(FormCreate));
    }

    function $vnode() {
        return _vue.extend(fragment);
    }

    function create() {
        console.log("create方法");
    }

    function component(id, component) {
        console.log(id, component);
    }

    // 注册来自iview包的
    function componentAlias(alias) {
        // 在CreateNode原型上生成创建表单表单控件VNode的原型方法
        CreateNode.use(alias);
    }

    // 注册组件解析器
    function parser() {
        /*  
            {
                    name:"input",
                    merge: true,
                    toValue(){},
                    ...等方法
            }
            经过nameProp处理parser为
            {
                id: "input",
                prop: {
                    name:"input",
                    merge: true,
                    toValue(){},
                    ...等方法
                }
            }
        */
        const data = nameProp(...arguments);
        if (!data.id || !data.prop) return;
        const name = toCase(data.id);
        const parser = data.prop;

        // 当用户使用了create.parser注册了组件解析器，与之前设置的组件解析器冲突了，
        // 如果设置了merge属性，则会进行合并，新的优先级高，否则直接覆盖
        const base = parser.merge === true ? parsers[name] : undefined;
        parsers[name] = { ...(base || BaseParser), ...parser };

        /*
        生成的parsers对象
        parsers = {
            input: {
                name: "input",
                merge: true,
                toValue(){},
                ...等方法
            }
        }
        */
    }

    function useAttr(create) {
        extend(create, {
            component,
            componentAlias,
            parser,
        });
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
                Vue.component("FcFragment", $vnode()); //注册fragment组件
                Vue._installedFormCreate = true;
            },
        });
    }

    useAttr(create);
    useStatic(create);

    CreateNode.use({ fragment: "fcFragment" });

    if (config.install) config.install(create);
    return create;
}
