export default function json() {
    return [
        {
            title: "子表单1",
            type: "subForm",
            field: "sub-form1",
            props: {
                rule: [
                    {
                        title: "子输入框1",
                        type: "input",
                        field: "sub-input1",
                        validate: [{ required: true, message: "子输入框1不能为空", trigger: "change" }],
                    },
                    {
                        title: "子输入框2",
                        type: "input",
                        field: "sub-input2",
                        validate: [{ required: true, message: "子输入框2不能为空", trigger: "change" }],
                    },
                    {
                        title: "子表单2",
                        type: "subForm",
                        field: "sub-form2",
                        props: {
                            rule: [
                                {
                                    title: "子输入框3",
                                    type: "input",
                                    field: "sub-input3",
                                    validate: [{ required: true, message: "子输入框3不能为空", trigger: "change" }],
                                },
                                {
                                    title: "子输入框4",
                                    type: "input",
                                    field: "sub-input4",
                                    validate: [{ required: true, message: "子输入框4不能为空", trigger: "change" }],
                                },
                            ],
                            option: {
                                submitBtn: false,
                            },
                        },
                        // wrap: {
                        //     show:false
                        // },
                    },
                ],
                option: {
                    form: {
                        labelPosition: "right",
                        labelWidth: 100,
                    },
                    submitBtn: false,
                },
            },
            // wrap: { show: false },
        },
        {
            title: "输入框",
            type: "input",
            field: "input-field",
            value: "",
            // wrap: {
            //     show: false,
            // },
            effect: {
                str: "我是自定义属性",
            },
            // emit: ["change"],
            emit: [
                {
                    name: "on-change",
                    inject: "注入的参数",
                },
            ],
            // inject: true,
            // on: {
            //     "on-change": [
            //         (...arg) => {
            //             console.log("input-change", ...arg);
            //         },
            //     ],
            // },
            // col: {},
            props: {
                // type: "textarea",
                // rows: 10,
                // autosize: {
                //     minRows: 2,
                //     maxRows: 20,
                // },
            },
            validate: [{ required: true, message: "输入框不能为空", trigger: "change" }],
            children: [
                {
                    type: "icon",
                    props: {
                        type: "ios-checkmark",
                    },
                    slot: "prefix",
                },
            ],
        },
        {
            title: "选择器",
            type: "select",
            field: "select-field",
            value: "123456",
            props: {},
            options: [
                {
                    label: "苹果",
                    value: "apple",
                    slot(h) {
                        return [
                            h("span", "苹果"),
                            h("Icon", {
                                props: {
                                    type: "logo-apple",
                                },
                            }),
                        ];
                    },
                },
                {
                    label: "香蕉",
                    value: "banana",
                },
            ],
            children: [
                {
                    type: "icon",
                    slot: "prefix",
                    props: {
                        type: "ios-add",
                    },
                },
            ],
        },
        // {
        //     title: "单选框",
        //     type: "radio",
        //     field: "radio-field",
        //     value: "选项1",
        //     options: [
        //         {
        //             label: "选项1",
        //             slot(h) {
        //                 return h("Icon", {
        //                     props: {
        //                         type: "logo-apple",
        //                     },
        //                 });
        //             },
        //         },
        //         {
        //             label: "选项2",
        //         },
        //     ],
        // },
        // {
        //     title: "复选框",
        //     type: "checkbox",
        //     field: "checkbox-field",
        //     value: ["选项1"],
        //     options: [
        //         {
        //             label: "选项1",
        //             slot(h) {
        //                 return h("Icon", {
        //                     props: {
        //                         type: "logo-apple",
        //                     },
        //                 });
        //             },
        //         },
        //         {
        //             label: "选项2",
        //         },
        //     ],
        // },
    ];
}
