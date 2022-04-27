import { unique } from "@form-create/utils";

const label = "开关";
const name = "switch";

export default {
    icon: "ios-switch",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            props: {},
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
                title: "打开时显示的内容",
                type: "input",
                field: "open",
            },
            {
                title: "关闭时显示的内容",
                type: "input",
                field: "close",
            },
            {
                title: "打开时的背景色",
                type: "colorPicker",
                field: "trueColor",
                props: {
                    transfer: true,
                },
            },
            {
                title: "关闭时的背景色",
                type: "colorPicker",
                field: "falseColor",
                props: {
                    transfer: true,
                },
            },
        ];
    },
};
