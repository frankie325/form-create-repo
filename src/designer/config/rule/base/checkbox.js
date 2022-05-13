import { unique } from "@form-create/utils";
import { options, request } from "../../default";

const label = "多选框";
const name = "checkbox";

export default {
    icon: "md-checkbox",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            props: {},
            options: options(),
        };
    },
    props() {
        return [
            {
                title: "选项数据",
                type: "struct",
                field: "options",
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
                    defaultValue: request(),
                    validate(val) {
                        if (!Array.isArray(val) && !is.Object(val)) return "请求数据必须为数组或者对象";
                    },
                },
            },
            {
                title: "是否禁用",
                type: "switch",
                field: "disabled",
            },
            {
                title: "是否显示边框",
                type: "switch",
                field: "border",
            },
        ];
    },
};
