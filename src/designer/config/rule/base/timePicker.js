import { unique } from "@form-create/utils";

const label = "时间选择器";
const name = "timePicker";

export default {
    icon: "md-timer",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            props: {
                type: "time",
                placeholder: "请选择...",
                clearable: true,
                editable: true,
            },
        };
    },
    props() {
        return [
            {
                title: "是否禁用",
                type: "switch",
                field: "disabled",
            },
            {
                title: "显示类型",
                type: "select",
                field: "type",
                options: [
                    {
                        label: "time",
                        value: "time",
                    },
                    {
                        label: "timerange",
                        value: "timerange",
                    },
                ],
                control: [
                    {
                        value: "timerange",
                        rule: [
                            {
                                title: "两个时间之间的分隔符",
                                type: "input",
                                field: "separator",
                            },
                        ],
                    },
                ],
            },
            {
                title: "时间选择器出现的位置",
                type: "select",
                field: "placement",
                options: [
                    {
                        label: "top",
                        value: "top",
                    },
                    {
                        label: "top-start",
                        value: "top-start",
                    },
                    {
                        label: "top-end",
                        value: "top-end",
                    },
                    {
                        label: "bottom",
                        value: "bottom",
                    },
                    {
                        label: "bottom-start",
                        value: "bottom-start",
                    },
                    {
                        label: "bottom-end",
                        value: "bottom-end",
                    },
                    {
                        label: "left",
                        value: "left",
                    },
                    {
                        label: "left-start",
                        value: "left-start",
                    },
                    {
                        label: "left-end",
                        value: "left-end",
                    },
                    {
                        label: "right",
                        value: "right",
                    },
                    {
                        label: "right-start",
                        value: "right-start",
                    },
                    {
                        label: "right-end",
                        value: "right-end",
                    },
                ],
            },
            {
                title: "占位文本",
                type: "input",
                field: "placeholder",
            },
            {
                title: "是否显示底部控制栏",
                type: "switch",
                field: "confirm",
            },
            {
                title: "是否显示清除按钮",
                type: "switch",
                field: "clearable",
            },
            {
                title: "是否完全只读",
                type: "switch",
                field: "readonly",
            },
            {
                title: "文本框是否可以输入",
                type: "switch",
                field: "editable",
            },
        ];
    },
};
