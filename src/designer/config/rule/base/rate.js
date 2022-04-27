import { unique } from "@form-create/utils";

const label = "评分";
const name = "rate";

export default {
    icon: "md-star",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            props: {
                count: 5,
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
                title: "star 总数",
                type: "inputNumber",
                field: "count",
            },
            {
                title: "是否允许半选",
                type: "switch",
                field: "allowHalf",
            },
            {
                title: "是否显示提示文字",
                type: "switch",
                field: "showText",
            },
            {
                title: "是否可以取消选择",
                type: "switch",
                field: "clearable",
            },
            {
                title: "自定义字符",
                type: "input",
                field: "character",
            },
            {
                title: "使用图标",
                type: "input",
                field: "icon",
            },
        ];
    },
};
