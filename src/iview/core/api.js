import { extend, is } from "@/utils";
import { invoke } from "@/core/frame/utils";

function tidyBtnProp(btn, def) {
    if (is.Boolean(btn)) {
        btn = { show: btn };
    } else if (!is.Undef(btn) && !is.Object(btn)) btn = { show: def };
    return btn;
}

export default function extendApi(api, h) {
    extend(api, {
        /**
         * @description: 表单校验，支持Promise
         * @param {Function} callback 回调
         * @return {*}
         */
        validate(callback) {
            return h.$manager.validate(callback);
        },
        /**
         * @description: 对指定字段进行表单校验，支持Promise
         * @param {String} field 校验字段
         * @param {Function} callback 回调
         */
        validateField(field, callback) {
            const ctx = h.getFieldCtx(field);
            return h.$manager.validateField(ctx.id, callback);
        },
        /**
         * @description: 清除指定表单组件的校验
         * @param {String | string[]} fields 指定的表单字段，不填则为全部
         */
        clearValidateState(fields) {
            api.helper.tidyFields(fields).forEach((field) => {
                h.getCtxs(field).forEach((ctx) => {
                    h.$manager.clearValidateState(ctx);
                });
            });
        },
        /**
         * @description: 修改提交按钮
         * @param {Object} props 提交按钮的属性
         */
        submitBtnProps(props = {}) {
            let btn = tidyBtnProp(h.options.submitBtn, true);
            extend(btn, props);
            h.options.submitBtn = btn;
            api.refreshOptions();
        },
        /**
         * @description: 修改重置按钮
         * @param {Object} props 重置按钮的属性
         */
        resetBtnProps(props = {}) {
            let btn = tidyBtnProp(h.options.resetBtn, false);
            extend(btn, props);
            h.options.resetBtn = btn;
            api.refreshOptions();
        },
        btn: {
            loading(loading = true) {
                api.submitBtnProps({ loading: !!loading });
            },
            disabled(disabled = true) {
                api.submitBtnProps({ disabled: !!disabled });
            },
            show(show = true) {
                api.submitBtnProps({ show: !!show });
            },
        },
        resetBtn: {
            loading(loading = true) {
                api.resetBtnProps({ loading: !!loading });
            },
            disabled(disabled = true) {
                api.resetBtnProps({ disabled: !!disabled });
            },
            show(show = true) {
                api.resetBtnProps({ show: !!show });
            },
        },
        /**
         * @description: 表单提交
         * @param {*} successFn 成功时的回调
         * @param {*} failFn 失败时的回调
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
