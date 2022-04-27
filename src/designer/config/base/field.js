import { is } from "@form-create/utils";

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
            props: {
                defaultValue: [],
                validate(val) {
                    if (!Array.isArray(val) && !is.Object(val)) return "联动数据必须为数组或者对象";
                },
            },
        },
    ];
}
