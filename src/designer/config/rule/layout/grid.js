const label = "宫格布局";
const name = "grid";

export default {
    icon: "md-grid",
    label,
    name,
    children: "gridItem",
    rule() {
        return {
            type: name,
            props: {
                col: 3,
                padding: "24px",
                border: true,
            },
            children: [],
        };
    },
    props() {
        return [
            {
                title: "最大支持的列数",
                type: "inputNumber",
                field: "col",
            },
            {
                title: "是否宽高一致",
                type: "switch",
                field: "square",
            },
            {
                title: "内容的间距",
                type: "input",
                field: "padding",
            },
            {
                title: "内容是否垂直居中",
                type: "switch",
                field: "center",
            },
            {
                title: "是否显示边框",
                type: "switch",
                field: "border",
            },
            {
                title: "是否开启鼠标悬停效果",
                type: "switch",
                field: "hover",
            },
        ];
    },
};
