import { unique } from "@form-create/utils";
import { options, request } from "../../default";

const label = "选择器";
const name = "select";

export default {
    icon: "md-arrow-dropdown-circle",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            props: {
                // transfer: false,
                placeholder: "请选择...",
                notFoundText: "无匹配数据",
                placement: "bottom-start",
            },
            options: options(),
            request: request(),
        };
    },
    props() {
        return [
            {
                title: "选项数据",
                type: "struct",
                field: "options",
                props: {
                    validate(val) {
                        if (!Array.isArray(val)) return "选项数据必须为数组";
                    },
                },
            },
            {
                title: "请求数据",
                type: "struct",
                field: "request",
                props: {
                    validate(val) {
                        if (!Array.isArray(val) && !is.Object(val)) return "请求数据必须为数组或者对象";
                    },
                },
            },
            {
                title: "是否禁用",
                type: "switch",
                field: "disabled",
            },
            {
                title: "占位文本",
                type: "input",
                field: "placeholder",
            },
            {
                title: "是否支持多选",
                type: "switch",
                field: "multiple",
                control: [
                    {
                        value: true,
                        rule: [
                            {
                                title: "最多显示 tag 数",
                                type: "inputNumber",
                                field: "maxTagCount",
                                value: null,
                            },
                        ],
                    },
                ],
            },
            {
                title: "是否显示清空按钮",
                type: "switch",
                field: "clearable",
            },
            {
                title: "是否支持搜索",
                type: "switch",
                field: "filterable",
                control: [
                    {
                        value: true,
                        rule: [
                            {
                                title: "在搜索时，是否只按照 label 进行搜索",
                                type: "switch",
                                field: "filterByLabel",
                            },
                        ],
                    },
                ],
            },
            {
                title: "当下拉列表为空时显示的内容",
                type: "input",
                field: "notFoundText",
            },
            // iview的Select无法动态响应placement和transfer的变化
            // {
            //     title: "弹窗的展开方向",
            //     type: "select",
            //     field: "placement",
            //     options: [
            //         {
            //             label: "top",
            //             value: "top",
            //         },
            //         {
            //             label: "bottom",
            //             value: "bottom",
            //         },
            //         {
            //             label: "top-start",
            //             value: "top-start",
            //         },
            //         {
            //             label: "bottom-start",
            //             value: "bottom-start",
            //         },
            //         {
            //             label: "top-end",
            //             value: "top-end",
            //         },
            //         {
            //             label: "bottom-end",
            //             value: "bottom-end",
            //         },
            //     ],
            // },
            // {
            //     title: "是否将弹层放置于 body 内",
            //     type: "switch",
            //     field: "transfer",
            // },
            {
                title: "前缀图标",
                type: "input",
                field: "prefix",
            },
        ];
    },
};
