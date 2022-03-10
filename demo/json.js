export default function json() {
    return [
        {
            title: "输入框",
            type: "input",
            field: "input-field",
            value: "123456",
            props: {
                type: "textarea",
                rows: 10,
                // autosize: {
                //     minRows: 2,
                //     maxRows: 20,
                // },
            },
        },
        {
            title: "选择器",
            type: "select",
            field: "select-field",
            value: "123456",
            props: {},
        },
    ];
}
