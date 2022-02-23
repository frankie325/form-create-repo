import { extend, mergeProps } from "@/utils";
import getConfig from "./config";

export default {
    getDefaultOptions() {
        return getConfig();
    },
    // 合并选项时调用，设置Form表单的属性
    update() {
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
    // 设置Form表单的属性
    beforeRender() {
        const { key, ref, $handle } = this;
        extend(this.rule, { key, ref });
        extend(this.rule.props, {
            model: $handle.formData,
            rules: $handle.validate(),
        });
    },
    render(children) {
        return this.$r(this.rule, children);
    },
    // 创建FormItem
    makeWrap(ctx, children) {
        const rule = ctx.prop;
        const key = `${this.key}${ctx.key}`;
        const wrap = mergeProps(rule.wrap, [
            {
                props: {
                    label: rule.title,
                    prop: ctx.id,
                },
                key: key,
                ref: ctx.wrapRef,
                type: "formItem",
            },
        ]);

        return this.$r(wrap, children);
    },
};
