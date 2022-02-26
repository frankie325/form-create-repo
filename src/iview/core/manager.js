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
        const uni = `${this.key}${ctx.key}`;
        const wrap = {
            props: {
                label: rule.title,
                ...(rule.wrap || {}),
                prop: ctx.id,
            },
            key: `${uni}fi`,
            ref: ctx.wrapRef,
            type: "formItem",
        };

        const item = this.$r(wrap, children);
        if (rule.col) return this.makeCol(rule, uni, item);
        return item;
    },
    // 创建Col
    makeCol(rule, uni, children) {
        const col = rule.col;
        return this.$r(
            {
                type: "col",
                props: col || { span: 24 },
                key: `${uni}col`,
            },
            children
        );
    },
};
