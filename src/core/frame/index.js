import { extend } from "@/utils";
import $FormCreate from "../components/formCreate";

let _vue = null;

export default function FormCreateFactory(config) {
    function FormCreate(vm) {}

    function $form() {
        return _vue.extend($FormCreate(FormCreate));
    }

    function create() {
        console.log("create方法");
    }
    
    function useStatic(create) {
        extend(create, {
            // 注册form-create组件
            install(Vue) {
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
