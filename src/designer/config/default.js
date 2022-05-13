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

export function treeSelect() {
    return [
        {
            title: "parent1",
            value: "parent1",
            expand: true,
            selected: false,
            checked: false,
            children: [
                {
                    title: "parent 1-1",
                    value: "parent1-1",
                    selected: false,
                    checked: false,
                    children: [
                        {
                            title: "leaf 1-1-1",
                            value: "leaf1",
                            selected: false,
                            checked: false,
                        },
                        {
                            title: "leaf 1-1-2",
                            value: "leaf2",
                            selected: false,
                            checked: false,
                        },
                    ],
                },
                {
                    title: "parent 1-2",
                    value: "parent1-2",
                    selected: false,
                    checked: false,
                    children: [
                        {
                            title: "leaf 1-2-1",
                            value: "leaf3",
                            selected: false,
                            checked: false,
                        },
                        {
                            title: "leaf 1-2-1",
                            value: "leaf4",
                            selected: false,
                            checked: false,
                        },
                    ],
                },
            ],
        },
    ];
}

export function tree() {
    return [
        {
            id: "1",
            title: "parent 1",
            expand: true,
            selected: false,
            checked: false,
            children: [
                {
                    id: "1-1",
                    title: "parent 1-1",
                    children: [
                        {
                            id: "1-1-1",
                            title: "leaf 1-1-1",
                        },
                        {
                            id: "1-1-2",
                            title: "leaf 1-1-2",
                        },
                    ],
                },
                {
                    id: "1-2",
                    title: "parent 1-2",
                    children: [
                        {
                            id: "1-2-1",
                            title: "leaf 1-2-1",
                        },
                        {
                            id: "1-2-2",
                            title: "leaf 1-2-2",
                        },
                    ],
                },
            ],
        },
    ];
}
