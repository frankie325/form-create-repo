import { unique } from "@/utils";

const label = "数字输入框";
const name = "inputNumber";

export default {
    icon: "md-calculator",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            value: null,
            props: {
                placeholder: "请输入...",
                min: -Infinity,
                max: Infinity,
                editable: true,
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
                title: "占位文本",
                type: "input",
                field: "placeholder",
            },
            {
                title: "最大值",
                type: "inputNumber",
                field: "max",
            },
            {
                title: "最小值",
                type: "inputNumber",
                field: "min",
            },
            {
                title: "按钮位置是否置于两侧",
                type: "switch",
                field: "controlsOutside",
            },
            {
                title: "每次改变的步伐，可以是小数",
                type: "inputNumber",
                field: "step",
                value: 1,
                props: {
                    min: 0,
                },
            },
            {
                title: "是否只读",
                type: "switch",
                field: "readonly",
            },
            {
                title: "是否可编辑",
                type: "switch",
                field: "editable",
            },
            {
                title: "数值精度",
                type: "inputNumber",
                field: "precision",
                value: 0,
                props: {
                    min: 0,
                    step: 1,
                },
            },
            {
                title: "是否实时响应数据",
                type: "switch",
                field: "activeChange",
            },
        ];
    },
};
