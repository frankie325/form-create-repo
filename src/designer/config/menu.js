import input from "./rule/input";
import select from "./rule/select";

import row from "./rule/row";
export default function createMenu() {
    return [
        {
            name: "main",
            title: "表单组件",
            list: [input, select],
        },
        {
            name: "aide",
            title: "辅助组件",
            list: [],
        },
        {
            name: "layout",
            title: "布局组件",
            list: [row],
        },
    ];
}
