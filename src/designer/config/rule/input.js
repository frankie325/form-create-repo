import { unique } from "@/utils";

const label = "输入框";
const name = "input";

export default {
    icon: "md-create",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            props: {
                placeholder: "请输入...",
                maxlength: null,
                border: true,
                autosize: {
                    minRows: 2,
                    maxRows: null,
                },
            },
        };
    },
    props() {
        return [
            {
                title: "输入框类型",
                type: "select",
                field: "type",
                value: "",
                options: [
                    {
                        label: "text",
                        value: "text",
                    },
                    {
                        label: "password",
                        value: "password",
                    },
                    {
                        label: "textarea",
                        value: "textarea",
                    },
                    {
                        label: "number",
                        value: "number",
                    },
                ],
                control: [
                    {
                        value: "textarea",
                        rule: [
                            {
                                type: "object",
                                field: "autosize",
                                props: {
                                    rule: [
                                        {
                                            title: "最小行数",
                                            type: "inputNumber",
                                            field: "minRows",
                                        },
                                        {
                                            title: "最大行数",
                                            type: "inputNumber",
                                            field: "maxRows",
                                        },
                                    ],
                                },
                            },
                        ],
                    },
                ],
            },
            {
                title: "占位文本",
                type: "input",
                field: "placeholder",
                value: "",
            },
            {
                title: "是否显示清空按钮",
                type: "switch",
                field: "clearable",
            },
            {
                title: "是否显示边框",
                type: "switch",
                field: "border",
            },
            {
                title: "是否禁用",
                type: "switch",
                field: "disabled",
            },
            {
                title: "是否只读",
                type: "switch",
                field: "readonly",
            },
            {
                title: "是否显示切换密码图标",
                type: "switch",
                field: "password",
            },
            {
                title: "是否显示输入字数统计",
                type: "switch",
                field: "showWordLimit",
                control: [
                    {
                        handle: (val) => val > 0,
                        rule: [
                            {
                                title: "最大输入长度",
                                type: "inputNumber",
                                field: "maxlength",
                            },
                        ],
                    },
                ],
            },
            {
                title: "输入框头部图标",
                type: "input",
                field: "prefix",
            },
            {
                title: "输入框尾部图标",
                type: "input",
                field: "suffix",
            },
            {
                title: "是否显示为搜索型输入框",
                type: "switch",
                field: "search",
                control: {
                    value: true,
                    rule: [
                        {
                            title: "搜索型输入框是否显示为按钮",
                            type: "switch",
                            field: "enterButton",
                        },
                    ],
                },
            },
        ];
    },
};
