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

export function request() {
    return [
        {
            to: "options",
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
