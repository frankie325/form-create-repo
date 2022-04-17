import input from "./rule/input";
import select from "./rule/select";
import radio from "./rule/radio";
import checkbox from "./rule/checkbox";
import _switch from "./rule/switch";
import slider from "./rule/slider";
import datePicker from "./rule/datePicker";
import timePicker from "./rule/timePicker";
import cascader from "./rule/cascader";
import inputNumber from "./rule/inputNumber";
import rate from "./rule/rate";
import colorPicker from "./rule/colorPicker";

import row from "./rule/row";
import divider from "./rule/divider";
export default function createMenu() {
    return [
        {
            name: "main",
            title: "表单组件",
            list: [input, select, radio, checkbox, _switch, slider, datePicker, timePicker, cascader, inputNumber, rate, colorPicker],
        },
        {
            name: "aide",
            title: "辅助组件",
            list: [],
        },
        {
            name: "layout",
            title: "布局组件",
            list: [row, divider],
        },
    ];
}
