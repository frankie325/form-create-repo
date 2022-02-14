import { extend } from "@/utils";
import $FormCreate from "../components/formCreate";
import Handle from "../handler";
let _vue = null;

export default function FormCreateFactory(config) {
    function FormCreate(vm, rules, options) {
        extend(this, {
            vm,
            rules,
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
            this.options = options;
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
