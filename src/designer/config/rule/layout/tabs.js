const label = "标签栏";
const name = "tabs";

export default {
    icon: "md-pricetag",
    label,
    name,
    children: "tabPane",
    rule() {
        return {
            type: name,
            children: [],
            props: {
                type: "line",
                animated: true,
            },
        };
    },
    props() {
        return [
            {
                title: "当前激活的标签页的 name",
                type: "input",
                field: "value",
            },
            {
                title: "页签的基本样式",
                type: "select",
                field: "type",
                options: [
                    {
                        label: "line",
                        value: "line",
                    },
                    {
                        label: "card",
                        value: "card",
                    },
                ],
            },
            // 切换animated，样式会变形
            // {
            //     title: "是否使用 CSS3 动画",
            //     type: "switch",
            //     field: "animated",
            // },
        ];
    },
};
