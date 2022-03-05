import { extend, is } from "@/utils";
import { invoke } from "@/core/frame/utils";
export default function extendApi(api, h) {
    extend(api, {
        /**
         * @description: 表单校验，支持Promise 
         * @param {*} callback 回调
         * @return {*}
         */        
        validate(callback) {
            return h.$manager.validate(callback);
        },
        /**
         * @description: 表单校验
         * @param {*} successFn 成功时的回调
         * @param {*} failFn 失败时的回调
         * @return {*}
         */        
        submit(successFn, failFn) {
            api.validate((valid) => {
                let formData = api.formData();
                if (valid) {
                    if (is.Function(successFn)) {
                        invoke(() => successFn(formData, this));
                    } else {
                        is.Function(h.options.onSubmit) && invoke(() => h.options.onSubmit(formData, this));
                        h.vm.$emit("submit", formData, this);
                    }
                } else {
                    is.Function(failFn) && invoke(() => failFn(formData, this));
                }
            });
        },
    });
    return api;
}
