export default function json() {
    return [
        {
            title: "输入框",
            type: "input",
            field: "input-field",
            value: "123456",
            props: {
                // type: "textarea",
                // rows: 10,
                // autosize: {
                //     minRows: 2,
                //     maxRows: 20,
                // },
            },
            children: [
                {
                    type: "icon",
                    props: {
                        type: "ios-checkmark",
                    },
                    slot: "prefix",
                },
            ],
        },
        {
            title: "选择器",
            type: "select",
            field: "select-field",
            value: "123456",
            options: [
                {
                    label: "标签1",
                    value: "1",
                    disabled: true,
                },
                {
                    label: "标签2",
                    value: "2",
                },
            ],
            props: {
                multiple: true,
            },
        },
    ];
}
