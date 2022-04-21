const label = "按钮";
const name = "button";

export default {
    customIcon: true,
    icon: "icon-button",
    label,
    name,
    rule() {
        return {
            type: name,
            props: {
                type: "primary",
                size: "default",
                content: "内容",
            },
        };
    },
    props() {
        return [
            {
                type: "input",
                field: "content",
                title: "内容",
            },
            {
                type: "select",
                field: "type",
                title: "类型",
                options: [
                    {
                        label: "default",
                        value: "default",
                    },
                    {
                        label: "primary",
                        value: "primary",
                    },
                    {
                        label: "dashed",
                        value: "dashed",
                    },
                    {
                        label: "text",
                        value: "text",
                    },
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
                title: "尺寸",
                type: "select",
                field: "size",
                options: [
                    {
                        label: "default",
                        value: "default",
                    },
                    {
                        label: "large",
                        value: "large",
                    },
                    {
                        label: "small",
                        value: "small",
                    },
                ],
            },
            {
                title: "是否使按钮背景透明",
                field: "ghost",
                type: "switch",
            },
            {
                title: "是否圆形按钮",
                type: "switch",
                field: "circle",
            },
            {
                title: "是否长度为 100%",
                type: "switch",
                field: "long",
            },
            {
                title: "是否禁用",
                type: "switch",
                field: "disabled",
            },
            {
                title: "设置按钮的图标",
                type: "input",
                field: "icon",
            },
            {
                title: "跳转的链接",
                type: "input",
                field: "to",
            },
            {
                title: "跳转时是否添加浏览记录",
                type: "switch",
                field: "replace",
            },
            {
                title: "跳转方式，相当于 a 标签的 target 属性",
                type: "select",
                field: "target",
                options: [
                    {
                        label: "_self",
                        value: "_self",
                    },
                    {
                        label: "_blank",
                        value: "_blank",
                    },
                    {
                        label: "_parent",
                        value: "_parent",
                    },
                    {
                        label: "_top",
                        value: "_top",
                    },
                ],
            },
        ];
    },
};
