export default function field() {
    return [
        {
            title: "表单字段",
            type: "input",
            field: "field",
            value: "",
        },
        {
            title: "标签名称",
            type: "input",
            field: "title",
            value: "",
        },
        {
            title: "联动数据",
            type: "struct",
            field: "_control",
            props: {},
        },
    ];
}
