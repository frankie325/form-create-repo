import { unique } from "@/utils";

const label = "颜色选择器";
const name = "colorPicker";

export default {
    icon: "md-color-palette",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            props: {
                editable: true,
                hue: true,
                recommend: true,
            },
        };
    },
    props() {
        return [
            {
                title: "是否禁用",
                type: "switch",
                field: "disabled",
            },
            {
                title: "是否可以输入色值",
                type: "switch",
                field: "editable",
            },
            {
                title: "是否支持透明度选择",
                type: "switch",
                field: "alpha",
            },
            {
                title: "是否支持色彩选择",
                type: "switch",
                field: "hue",
            },
            {
                title: "是否显示推荐的颜色预设",
                type: "switch",
                field: "recommend",
            },
            {
                title: "是否开启 capture 模式",
                type: "switch",
                field: "capture",
            },
            {
                title: "颜色格式",
                type: "select",
                field: "format",
                options: [
                    {
                        label: "hsl",
                        value: "hsl",
                    },
                    {
                        label: "hsv",
                        value: "hsv",
                    },
                    {
                        label: "hex",
                        value: "hex",
                    },
                    {
                        label: "rgb",
                        value: "rgb",
                    },
                ],
            },
        ];
    },
};
