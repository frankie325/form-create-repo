import { extend, is, toArray } from "@/utils";
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
         * @description: 表单校验
         * @param {Function} callback 回调
         * @return {*}
         */
        validate(callback) {
            const forms = api.children;
            const valid = (flag) => {
                let _flag = true;
                forms.forEach((form) => {
                    form.validate((f) => {
                        if (!f) {
                            _flag = false;
                        }
                    });
                });
                callback(_flag && flag);
            };
            h.$manager.validate(valid);
        },
        /**
         * @description: 对指定字段进行表单校验
         * @param {String} field 校验字段
         * @param {Function} callback 回调
         */
        validateField(field, callback) {
            const ctx = h.getFieldCtx(field);
            if (!ctx) return;
            const sub = h.subForm[ctx.id];
            const valid = (error) => {
                let _flag = true;
                sub &&
                    toArray(sub).forEach((form) => {
                        form.validate((f) => {
                            if (!f) {
                                _flag = false;
                            }
                        });
                    });
                if (!_flag) {
                    callback("子表单验证未通过");
                } else {
                    callback(error);
                }
            };
            // debugger
            h.$manager.validateField(ctx.id, valid);
        },
        /**
         * @description: 清除指定表单组件的校验状态
         * @param {String | string[]} fields 指定的表单字段，不填则为全部
         * @param {Boolean} clearSub 是否清除子表单校验状态
         */
        clearValidateState(fields, clearSub) {
            api.helper.tidyFields(fields).forEach((field) => {
                if (clearSub) this.clearSubValidateState(field, clearSub);
                h.getCtxs(field).forEach((ctx) => {
                    h.$manager.clearValidateState(ctx);
                });
            });
        },
        /**
         * @description: 清除指定子表单的校验状态
         * @param {String | string[]} fields 指定的子表单表单字段
         */
        clearSubValidateState(fields, clearSub) {
            api.helper.tidyFields(fields).forEach((field) => {
                h.getCtxs(field).forEach((ctx) => {
                    const subForm = h.subForm[ctx.id];
                    if (!subForm) return;
                    if (Array.isArray(subForm)) {
                        subForm.forEach((form) => {
                            form.clearValidateState(undefined, clearSub);
                        });
                    } else if (subForm) {
                        subForm.clearValidateState(undefined, clearSub);
                    }
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
