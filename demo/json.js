export default function json() {
    return [
        // {
        //     title: "子表单1",
        //     type: "subForm",
        //     field: "sub-form1",
        //     props: {
        //         rule: [
        //             {
        //                 title: "子输入框1",
        //                 type: "input",
        //                 field: "sub-input1",
        //                 validate: [{ required: true, message: "子输入框1不能为空", trigger: "change" }],
        //             },
        //             {
        //                 title: "子输入框2",
        //                 type: "input",
        //                 field: "sub-input2",
        //                 validate: [{ required: true, message: "子输入框2不能为空", trigger: "change" }],
        //             },
        //             {
        //                 title: "子表单2",
        //                 type: "subForm",
        //                 field: "sub-form2",
        //                 props: {
        //                     rule: [
        //                         {
        //                             title: "子输入框3",
        //                             type: "input",
        //                             field: "sub-input3",
        //                             validate: [{ required: true, message: "子输入框3不能为空", trigger: "change" }],
        //                         },
        //                         {
        //                             title: "子输入框4",
        //                             type: "input",
        //                             field: "sub-input4",
        //                             validate: [{ required: true, message: "子输入框4不能为空", trigger: "change" }],
        //                         },
        //                     ],
        //                     option: {
        //                         submitBtn: false,
        //                     },
        //                 },
        //                 // wrap: {
        //                 //     show:false
        //                 // },
        //             },
        //         ],
        //         option: {
        //             form: {
        //                 labelPosition: "right",
        //                 labelWidth: 100,
        //             },
        //             submitBtn: false,
        //         },
        //     },
        //     // wrap: { show: false },
        // },
        // {
        //     title: "数组组件",
        //     type: "group",
        //     field: "validate",
        //     value: [],
        //     props: {
        //         // max: 3,
        //         // min: 2,
        //         expand: 2,
        //         // field: "arr-input",
        //         rules: [
        //             {
        //                 title: "数组输入框",
        //                 type: "input",
        //                 field: "arr-input",
        //             },
        //             {
        //                 title: "数组选择器",
        //                 type: "select",
        //                 field: "trigger",
        //                 options: [
        //                     {
        //                         label: "String",
        //                         value: "string",
        //                     },
        //                 ],
        //             },
        //         ],
        //     },
        // },
        {
            title: "输入框",
            type: "input",
            field: "input-field",
            value: "",
            className: "input-wrap",
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
                type: "textarea",
                rows: 10,
                autosize: {
                    minRows: 5,
                    maxRows: 20,
                },
            },
            wrap: {
                // required: true,
            },
            // iview的第一个校验规则required如果为false，则没有必填标记
            // validate: [
            //     { required: false, message: "不能为空2", trigger: "blur" },
            //     { required: true, message: "不能为空1", trigger: "change" },
            // ],
            validate: [{ mode: "pattern", type: "string", pattern: /^[1-9]\d*$/, message: "不符合正则表达式", trigger: "change" }],
            // validate: [{ mode: "min", required: true, type: "string", min: 10, message: "最小长度为10", trigger: "change" }],
            // validate: [{ mode: "max", type: "string", max: 10, message: "最大长度为10", trigger: "change" }],
            // validate: [{ mode: "len", type: "string", len: 10, message: "长度为10", trigger: "change" }],
            // children: [
            //     {
            //         type: "icon",
            //         props: {
            //             type: "ios-checkmark",
            //         },
            //         slot: "prefix",
            //     },
            // ],
        },
        {
            title: "选择器",
            type: "select",
            field: "select-field",
            value: [],
            props: {
                multiple: true,
            },
            validate: [{ mode: "min", required: true, type: "array", min: 1, message: "最少选中一个元素", trigger: "change" }],
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
            // children: [
            //     {
            //         type: "icon",
            //         slot: "prefix",
            //         props: {
            //             type: "ios-add",
            //         },
            //     },
            // ],
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
