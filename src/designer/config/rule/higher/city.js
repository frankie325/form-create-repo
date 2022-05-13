import { unique } from "@form-create/utils";

const label = "城市选择器";
const name = "city";

export default {
    customIcon: true,
    icon: "icon-city",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            props: {
                placeholder: "请选择...",
                searchPlaceholder: "输入城市名称搜索",
                size: "default",
            },
        };
    },
    props() {
        return [
            {
                title: "是否禁用选择器",
                type: "switch",
                field: "disabled",
            },
            {
                title: "双向绑定的值是否为城市名称",
                type: "switch",
                field: "useName",
            },
            {
                title: "预设城市",
                type: "struct",
                field: "cities",
                props: {
                    validate(val) {
                        if (!Array.isArray(val)) return "选项数据必须为数组";
                    },
                },
            },
            {
                title: "是否显示后缀“市”",
                type: "switch",
                field: "showSuffix",
            },
            // {
            //     title: "选择框大小",
            //     type: "select",
            //     field: "size",
            //     options: [
            //         {
            //             label: "default",
            //             value: "default",
            //         },
            //         {
            //             label: "large",
            //             value: "large",
            //         },
            //         {
            //             label: "small",
            //             value: "small",
            //         },
            //     ],
            // },
            {
                title: "搜索框默认文字",
                type: "input",
                field: "searchPlaceholder",
            },
        ];
    },
};
