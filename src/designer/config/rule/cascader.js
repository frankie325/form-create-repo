import { unique } from "@/utils";
import { cascaderData, request } from "../default";

const label = "级联选择";
const name = "cascader";

export default {
    icon: "ios-list-box",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            props: {
                data: cascaderData(),
                placeholder: "请选择...",
                trigger: "click",
                notFoundText: "无匹配数据",
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
                title: "是否禁用",
                type: "switch",
                field: "disabled",
            },
            {
                title: "是否显示清除按钮",
                type: "switch",
                field: "clearable",
            },
            {
                title: "占位文本",
                type: "input",
                field: "placeholder",
            },
            {
                title: "次级菜单展开方式",
                type: "select",
                field: "trigger",
                options: [
                    {
                        label: "click",
                        value: "click",
                    },
                    {
                        label: "hover",
                        value: "hover",
                    },
                ],
            },
            {
                title: "是否选择即改变选项值",
                type: "switch",
                field: "changeOnSelect",
            },
            {
                title: "是否支持搜索",
                type: "switch",
                field: "filterable",
            },
            {
                title: "当搜索列表为空时显示的内容",
                type: "input",
                field: "notFoundText",
            },
        ];
    },
};
