import { unique } from "@form-create/utils";

const label = "日期选择器";
const name = "datePicker";

export default {
    icon: "md-calendar",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            props: {
                type: "date",
                placeholder: "请选择...",
                clearable: true,
                editable: true,
                // startDate: new Date(1991, 4, 14),
            },
        };
    },
    props() {
        return [
            {
                title: "显示类型",
                type: "select",
                field: "type",
                options: [
                    {
                        label: "date",
                        value: "date",
                    },
                    {
                        label: "daterange",
                        value: "daterange",
                    },
                    {
                        label: "datetime",
                        value: "datetime",
                    },
                    {
                        label: "datetimerange",
                        value: "datetimerange",
                    },
                    {
                        label: "year",
                        value: "year",
                    },
                    {
                        label: "month",
                        value: "month",
                    },
                ],
                control: [
                    {
                        handle: (v) => v === "daterange" || v === "datetimerange",
                        rule: [
                            {
                                title: "左右面板是否联动",
                                type: "switch",
                                field: "splitPanels",
                            },
                            {
                                title: "两个日期间的分隔符",
                                type: "input",
                                field: "separator",
                            },
                        ],
                    },
                    {
                        value: "date",
                        rule: [
                            {
                                title: "是否选择多个日期",
                                type: "switch",
                                field: "multiple",
                            },
                        ],
                    },
                ],
            },
            {
                title: "是否禁用",
                type: "switch",
                field: "disabled",
            },
            {
                title: "展示的日期格式",
                type: "input",
                field: "format",
            },
            {
                title: "日期选择器出现的位置",
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
                title: "是否显示星期数",
                type: "switch",
                field: "showWeekNumbers",
            },
            {
                title: "是否显示星期数",
                type: "switch",
                field: "startDate",
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
