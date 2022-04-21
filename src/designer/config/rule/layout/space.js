const label = "间距";
const name = "div";

export default {
    customIcon: true,
    icon: "icon-space",
    label,
    name,
    rule() {
        return {
            type: name,
            props: {},
            style: {
                width: "100%",
                height: "20px",
            },
        };
    },
    props() {
        return [
            {
                type: "object",
                field: "style",
                props: {
                    rule: [
                        {
                            title: "高度",
                            type: "input",
                            field: "height",
                        },
                    ],
                },
            },
        ];
    },
};
