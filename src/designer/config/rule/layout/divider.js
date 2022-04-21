const label = "分割线";
const name = "divider";

export default {
    icon: "md-remove",
    label,
    name,
    rule() {
        return {
            type: name,
            props: {
                title: "标题",
                orientation: "center",
                size: "default",
            },
        };
    },
    props() {
        return [
            {
                title: "分割线标题",
                type: "input",
                field: "title",
            },
            {
                title: "分割线标题的位置",
                type: "select",
                options: [
                    {
                        label: "left",
                        value: "left",
                    },
                    {
                        label: "center",
                        value: "center",
                    },
                    {
                        label: "right",
                        value: "right",
                    },
                ],
                field: "orientation",
            },
            {
                title: "是否虚线",
                type: "switch",
                field: "dashed",
            },
            {
                title: "文字是否显示为普通正文样式",
                type: "switch",
                field: "plain",
            },
            {
                title: "尺寸",
                type: "select",
                options: [
                    {
                        label: "small",
                        value: "small",
                    },
                    {
                        label: "default",
                        value: "default",
                    },
                ],
                field: "size",
            },
        ];
    },
};
