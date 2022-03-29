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
            // control配置无法在拖拽区域生成，先定义成别名
            field: "_control",
            value: [],
            props: {
                defaultValue: [],
                validate(val) {
                    if (!Array.isArray(val)) return false;
                    if (!val.length) return true;
                    return !val.some(({ rule }) => {
                        return !Array.isArray(rule);
                    });
                },
            },
        },
    ];
}
