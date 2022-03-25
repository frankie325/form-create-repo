export default function form() {
    return [
        {
            title: "表单名称",
            type: "input",
            field: "name",
            value: "",
            validate: [{ required: true, message: "表单名称不能为空", trigger: "change" }],
        },
        {
            title: "表单组件尺寸",
            type: "radio",
            field: "size",
            value: "default",
            options: [
                {
                    label: "default",
                },
                {
                    label: "large",
                },
                {
                    label: "small",
                },
            ],
        },
        {
            title: "标签宽度",
            type: "inputNumber",
            field: "labelWidth",
            value: 0,
            style: {
                width: "100%",
            },
            props: {
                formatter: (value) => `${value}px`,
            },
        },
        {
            title: "标签位置",
            type: "radio",
            field: "labelPosition",
            value: "right",
            options: [
                {
                    label: "right",
                },
                {
                    label: "left",
                },
                {
                    label: "top",
                },
            ],
        },
        {
            title: "是否在标签后添加冒号",
            type: "switch",
            field: "labelColon",
            value: false,
        },
        {
            title: "是否隐藏必选标记",
            type: "switch",
            field: "hideRequiredMark",
            value: false,
        },
        {
            title: "是否显示校验错误信息",
            type: "switch",
            field: "showMessage",
            value: true,
        },
    ];
}
