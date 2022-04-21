const label = "警告提示";
const name = "alert";

export default {
    icon: "md-alert",
    label,
    name,
    rule() {
        return {
            type: name,
            props: {
                content: "提示内容",
                type: "info",
                fade: true,
            },
        };
    },
    props() {
        return [
            {
                title: "内容",
                type: "input",
                field: "content",
            },
            {
                title: "警告提示样式",
                type: "select",
                field: "type",
                options: [
                    {
                        label: "info",
                        value: "info",
                    },
                    {
                        label: "success",
                        value: "success",
                    },
                    {
                        label: "warning",
                        value: "warning",
                    },
                    {
                        label: "error",
                        value: "error",
                    },
                ],
            },
            {
                title: "是否可关闭",
                type: "switch",
                field: "closable",
            },
            {
                title: "是否显示图标",
                type: "switch",
                field: "showIcon",
            },
            {
                title: "是否应用动画",
                type: "switch",
                field: "fade",
            },
        ];
    },
};
