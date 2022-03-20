import getConfig from "./config";
import { extend, mergeProps } from "@/utils";
import is, { hasProperty } from "@/utils/type";
function isFalse(val) {
    return val === false;
}

function tidyBool(opt, name) {
    // debugger
    if (hasProperty(opt, name) && !is.Object(opt[name])) {
        opt[name] = { show: !!opt[name] };
    }
}

export default {
    validate(callback) {
        return this.form().validate(callback);
    },
    validateField(field, callback) {
        return this.form().validateField(field, callback);
    },
    clearValidateState(ctx) {
        const fItem = this.vm.$refs[ctx.wrapRef];
        fItem.resetField();
    },
    getDefaultOptions() {
        return getConfig();
    },
    tidyOptions(options) {
        // debugger
        ["submitBtn", "resetBtn", "wrap", "col"].forEach((name) => {
            tidyBool(options, name);
        });
        return options;
    },
    mergeProp(ctx) {
        ctx.prop = mergeProps(
            ctx.prop,
            [
                {
                    wrap: this.options.wrap || {},
                    // col: this.options.col || {},
                },
            ],
            { normal: ["wrap"] }
        );
        this.setSize(ctx.prop.props);
    },
    setSize(props) {
        if (!props.size && this.options.form.size) {
            props.size = this.options.form.size;
        }
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
        if (children.length) {
            children.push(this.makeFormBtn());
        }
        return this.$r(this.rule, children);
    },
    // 创建FormItem
    makeWrap(ctx, children) {
        const rule = ctx.prop;
        const uni = `${this.key}${ctx.key}`;

        const item =
            rule.wrap && isFalse(rule.wrap.show)
                ? children
                : this.$r(
                      {
                          props: {
                              label: rule.title,
                              ...(rule.wrap || {}),
                              prop: ctx.id,
                          },
                          key: `${uni}fi`,
                          ref: ctx.wrapRef,
                          type: "formItem",
                      },
                      children
                  );

        if (rule.col && !isFalse(rule.col.show)) return this.makeCol(rule, uni, item);
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
    makeFormBtn() {
        let vn = [];
        if (!isFalse(this.options.submitBtn.show)) {
            vn.push(this.makeSubmitBtn());
        }

        if (!isFalse(this.options.resetBtn.show)) {
            vn.push(this.makeResetBtn());
        }

        if (!vn.length) return;
        // debugger
        const item = this.$r(
            {
                type: "formItem",
                key: `${this.key}fb`,
            },
            vn
        );

        return item;
    },
    makeSubmitBtn() {
        const submitBtn = this.options.submitBtn;
        this.setSize(submitBtn);
        return this.$r(
            {
                type: "button",
                props: submitBtn,
                style: { width: submitBtn.width },
                on: {
                    click: () => {
                        const fApi = this.$handle.api;
                        submitBtn.click ? submitBtn.click(fApi) : fApi.submit();
                    },
                },
                key: `${this.key}b1`,
            },
            [submitBtn.innerText]
        );
    },
    makeResetBtn() {
        const resetBtn = this.options.resetBtn;
        this.setSize(resetBtn);
        return this.$r(
            {
                type: "button",
                props: resetBtn,
                style: { width: resetBtn.width, marginLeft: "15px" },
                on: {
                    click: () => {
                        const fApi = this.$handle.api;
                        resetBtn.click ? resetBtn.click(fApi) : fApi.resetFields();
                    },
                },
                key: `${this.key}b2`,
            },
            [resetBtn.innerText]
        );
    },
};
