import { unique } from "@form-create/utils";
import { tree, request } from "../../default";

const label = "树形控件";
const name = "tree";

export default {
    customIcon: true,
    icon: "icon-tree",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            props: {
                data: tree(),
                selectNode: true,
            },
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
                    defaultValue: request("props.data"),
                    validate(val) {
                        if (!Array.isArray(val) && !is.Object(val)) return "请求数据必须为数组或者对象";
                    },
                },
            },
            {
                title: "是否支持多选",
                type: "switch",
                field: "multiple",
            },
            {
                title: "是否显示多选框",
                type: "switch",
                field: "showCheckbox",
                control: [
                    {
                        value: true,
                        rule: [
                            {
                                title: "父子节点之间是否相互关联",
                                type: "switch",
                                field: "checkStrictly",
                            },
                            {
                                title: "点击节点是否选中多选框",
                                type: "switch",
                                field: "checkDirectly",
                            },
                        ],
                    },
                ],
            },
            {
                title: "没有数据时的提示",
                type: "input",
                field: "emptyText",
            },
            {
                title: "是否能够选中节点",
                type: "switch",
                field: "selectNode",
            },
            {
                title: "点击节点是否展开",
                type: "switch",
                field: "expandNode",
            },
        ];
    },
};
