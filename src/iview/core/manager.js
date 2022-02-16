import getConfig from "./config";

export default {
    getDefaultOptions() {
        return getConfig();
    },
    update() {
        // 设置Form表单的属性
        const form = this.options.form;
        this.rule = {
            props: { ...form },
            nativeOn: {
                submit: (e) => {
                    e.preventDefault();
                },
            },
            class: [form.className, form.class, "form-create"],
            style: form.style,
            type: "form",
        };
    },
};
