import input from "./rule/input";
import select from "./rule/select";
import radio from "./rule/radio";
import checkbox from "./rule/checkbox";
import _switch from "./rule/switch";
import slider from "./rule/slider";
import colorPicker from "./rule/colorPicker";

import row from "./rule/row";
export default function createMenu() {
    return [
        {
            name: "main",
            title: "表单组件",
            list: [input, select, radio, checkbox, _switch, slider, colorPicker],
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
