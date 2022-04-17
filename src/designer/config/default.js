export function options() {
    return [
        {
            label: "选项一",
            value: 1,
        },
        {
            label: "选项二",
            value: 2,
        },
    ];
}

export function request(to = "options") {
    return [
        {
            to: to,
            axios: {
                url: "",
                method: "post",
                data: {},
            },
            parse(res) {
                return res.data;
            },
            altKeys: {},
        },
    ];
}

export function cascaderData() {
    return [
        {
            value: "beijing",
            label: "北京",
            children: [
                {
                    value: "gugong",
                    label: "故宫",
                },
                {
                    value: "tiantan",
                    label: "天坛",
                },
                {
                    value: "wangfujing",
                    label: "王府井",
                },
            ],
        },
        {
            value: "jiangsu",
            label: "江苏",
            children: [
                {
                    value: "nanjing",
                    label: "南京",
                    children: [
                        {
                            value: "fuzimiao",
                            label: "夫子庙",
                        },
                    ],
                },
                {
                    value: "suzhou",
                    label: "苏州",
                    children: [
                        {
                            value: "zhuozhengyuan",
                            label: "拙政园",
                        },
                        {
                            value: "shizilin",
                            label: "狮子林",
                        },
                    ],
                },
            ],
        },
    ];
}
