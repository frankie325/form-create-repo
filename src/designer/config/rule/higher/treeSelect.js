import { unique } from "@form-create/utils";
import { treeSelect, request } from "../../default";

const label = "树选择";
const name = "treeSelect";

export default {
    customIcon: true,
    icon: "icon-cascader",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            props: {
                data: treeSelect(),
                placeholder: "请选择...",
            },
            request: request("props.data"),
        };
    },
    props() {
        return [
            {
                title: "可选项的数据源",
                type: "struct",
                field: "data",
                props: {
                    validate(val) {
                        if (!Array.isArray(val)) return "选项数据必须为数组";
                    },
                },
            },
            {
                title: "请求数据",
                type: "struct",
                field: "request",
                props: {
                    validate(val) {
                        if (!Array.isArray(val) && !is.Object(val)) return "请求数据必须为数组或者对象";
                    },
                },
            },
            {
                title: "占位文本",
                type: "input",
                field: "placeholder",
            },
            {
                title: "是否支持多选",
                type: "switch",
                field: "multiple",
                control: [
                    {
                        value: true,
                        rule: [
                            {
                                title: "是否显示多选框",
                                type: "switch",
                                field: "showCheckbox",
                            },
                        ],
                    },
                ],
            },
        ];
    },
};
