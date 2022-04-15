import { unique } from "@/utils";
import { options, request } from "../default";

const label = "单选框";
const name = "radio";

export default {
    icon: "md-radio-button-on",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            props: {
                buttonStyle: "default",
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
                title: "是否显示边框",
                type: "switch",
                field: "border",
            },
            {
                title: "是否开启按钮样式",
                type: "switch",
                field: "type",
                props: {
                    trueValue: "button",
                    falseValue: null,
                },
                control: [
                    {
                        value: "button",
                        rule: [
                            {
                                title: "按钮填充样式",
                                type: "radio",
                                field: "buttonStyle",
                                options: [
                                    {
                                        label: "default",
                                        value: "default",
                                    },
                                    {
                                        label: "solid",
                                        value: "solid",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        handle: (v) => v !== "button",
                        rule: ["vertical"],
                    },
                ],
            },
            {
                title: "是否垂直排列",
                type: "switch",
                field: "vertical",
            },
        ];
    },
};
