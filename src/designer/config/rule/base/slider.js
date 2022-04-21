import { unique } from "@/utils";
import { is } from "@/utils";
const label = "滑块";
const name = "slider";

export default {
    icon: "md-git-commit",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            value: 0,
            props: {
                min: 0,
                max: 100,
                step: 1,
                activeChange: true,
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
                title: "最小值",
                type: "inputNumber",
                field: "min",
            },
            {
                title: "最大值",
                type: "inputNumber",
                field: "max",
            },
            {
                title: "步长，建议能被（max - min）整除",
                type: "inputNumber",
                field: "step",
            },
            {
                title: "是否开启双滑块模式",
                type: "switch",
                field: "range",
                control: [
                    {
                        handle: (v) => !v,
                        rule: [
                            {
                                title: "是否显示数字输入框",
                                type: "switch",
                                field: "showInput",
                                control: [
                                    {
                                        value: true,
                                        rule: [
                                            {
                                                title: "数字输入框的尺寸",
                                                type: "select",
                                                field: "inputSize",
                                                options: [
                                                    {
                                                        label: "large",
                                                        value: "large",
                                                    },
                                                    {
                                                        label: "small",
                                                        value: "small",
                                                    },
                                                    {
                                                        label: "default",
                                                        value: "default",
                                                    },
                                                ],
                                            },
                                            {
                                                title: "是否实时响应数据",
                                                type: "switch",
                                                field: "activeChange",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                title: "是否显示间断点，建议步长不密集时使用",
                type: "switch",
                field: "showStops",
            },
            {
                title: "设置标记",
                type: "struct",
                field: "marks",
                props: {
                    defaultValue: {},
                    validate(val) {
                        if (!is.Object(val)) return "标记数据必须为对象";
                    },
                },
            },
        ];
    },
};
