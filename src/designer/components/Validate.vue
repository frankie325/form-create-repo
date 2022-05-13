<template>
    <FormCreate :rule="rule" :option="option" :value="formValue" @input="onInput"></FormCreate>
</template>

<script>
export function setMessage(title, validate) {
    validate.forEach((v) => {
        if (v.mode) {
            v.message = `${title}格式不正确`;
            return;
        }
        if (v.required) {
            v.message = `${title}不能为空`;
        }
    });
    return validate;
}

export default {
    name: "Validate",
    inject: ["designer"],
    props: {
        value: Array,
    },
    watch: {
        value(n) {
            this.formValue = this.parseValue(n);
        },
    },
    data() {
        return {
            formValue: {},
            option: {
                form: {
                    labelPosition: "top",
                    size: "small",
                    labelWidth: null,
                },
                submitBtn: false,
            },
            rule: [
                {
                    title: "字段类型",
                    type: "select",
                    field: "type",
                    value: undefined,
                    props: {
                        clearable: true,
                    },
                    options: [
                        //  {value: undefined, label: '请选择'},
                        { value: "string", label: "String" },
                        { value: "array", label: "Array" },
                        { value: "number", label: "Number" },
                        { value: "integer", label: "Integer" },
                        { value: "float", label: "Float" },
                        { value: "object", label: "Object" },
                        { value: "date", label: "Date" },
                        { value: "url", label: "url" },
                        { value: "hex", label: "hex" },
                        { value: "email", label: "email" },
                    ],
                    control: [
                        {
                            handle: (v) => {
                                return !!v;
                            },
                            rule: [
                                {
                                    type: "group",
                                    field: "validate",
                                    value: [],
                                    props: {
                                        expand: 1,
                                        rule: [
                                            {
                                                title: "触发方式",
                                                type: "select",
                                                field: "trigger",
                                                value: "change",
                                                options: [
                                                    { label: "change", value: "change" },
                                                    { label: "submit", value: "submit" },
                                                    { label: "blur", value: "blur" },
                                                ],
                                            },
                                            {
                                                title: "是否必填",
                                                type: "switch",
                                                field: "required",
                                                value: true,
                                                inject: true,
                                                on: {
                                                    // "on-change": this.updateMessage,
                                                },
                                            },
                                            {
                                                title: "验证方式",
                                                type: "select",
                                                field: "mode",
                                                value: "",
                                                props: {
                                                    clearable: true,
                                                },
                                                options: [
                                                    { value: "pattern", label: "正则表达式" },
                                                    { value: "min", label: "最小长度" },
                                                    { value: "max", label: "最大长度" },
                                                    { value: "len", label: "长度" },
                                                ],
                                                inject: true,
                                                on: {
                                                    // "on-change": this.updateMessage,
                                                },
                                                control: [
                                                    {
                                                        value: "pattern",
                                                        rule: [
                                                            {
                                                                title: "正则表达式",
                                                                type: "input",
                                                                field: "pattern",
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        value: "min",
                                                        rule: [
                                                            {
                                                                title: "最小长度",
                                                                type: "inputNumber",
                                                                field: "min",
                                                                value: 0,
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        value: "max",
                                                        rule: [
                                                            {
                                                                title: "最大长度",
                                                                type: "inputNumber",
                                                                field: "max",
                                                                value: 0,
                                                            },
                                                        ],
                                                    },
                                                    {
                                                        value: "len",
                                                        rule: [
                                                            {
                                                                title: "长度",
                                                                type: "inputNumber",
                                                                field: "len",
                                                                value: 0,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                            {
                                                title: "错误信息",
                                                type: "input",
                                                field: "message",
                                                value: "",
                                                // inject: true,
                                                // on: {
                                                //     "hook:mounted": ({ api }) => {
                                                //         if (this.designer.activeRule) {
                                                //             let msg = "请输入";
                                                //             if (api.form.mode) {
                                                //                 msg = "正确的";
                                                //             }
                                                //             api.setValue("message", msg + this.designer.activeRule.title);
                                                //         }
                                                //         // console.log("validate", inject);
                                                //     },
                                                // },
                                            },
                                        ],
                                    },
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    },
    created() {
        if (this.value.length) {
            this.formValue = this.parseValue(this.value);
        }
    },
    methods: {
        onInput(formData) {
            let val = [];
            const { validate, type } = formData;

            if (type && validate.length === 0) {
                return this.$emit("input", val);
            } else if (type) {
                validate.forEach((v) => {
                    v.type = type;
                });
                val = [...validate];
            }
            this.$emit("input", val);
        },
        parseValue(n) {
            let title = this.designer.activeRule.title;
            let val = {
                validate: n ? [...setMessage(title, n)] : [],
                type: n.length ? n[0].type : undefined,
            };
            return val;
        },
    },
};
</script>
