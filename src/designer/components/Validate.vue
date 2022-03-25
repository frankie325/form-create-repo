<template>
    <FormCreate :rule="rule" :option="option" :value="formValue" @update:value="onInput"></FormCreate>
</template>

<script>
export default {
    name: "Validate",
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
                                            },
                                            {
                                                title: "验证方式",
                                                type: "select",
                                                field: "mode",
                                                value: "",
                                                options: [
                                                    { value: "pattern", label: "正则表达式" },
                                                    { value: "min", label: "最小长度" },
                                                    { value: "max", label: "最大长度" },
                                                    { value: "len", label: "长度" },
                                                ],
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
            let val = {
                validate: n ? [...n] : [],
                type: n.length ? n[0].type : undefined,
            };
            // val.validate.forEach
            return val;
        },
    },
};
</script>
