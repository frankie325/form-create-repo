import input from "./rule/base/input";
import select from "./rule/base/select";
import radio from "./rule/base/radio";
import checkbox from "./rule/base/checkbox";
import _switch from "./rule/base/switch";
import slider from "./rule/base/slider";
import datePicker from "./rule/base/datePicker";
import timePicker from "./rule/base/timePicker";
import cascader from "./rule/base/cascader";
import inputNumber from "./rule/base/inputNumber";
import rate from "./rule/base/rate";
import colorPicker from "./rule/base/colorPicker";

import treeSelect from "./rule/higher/treeSelect";

import row from "./rule/layout/row";
import grid from "./rule/layout/grid";
import tabs from "./rule/layout/tabs";
import collapse from "./rule/layout/collapse";
import divider from "./rule/layout/divider";
import space from "./rule/layout/space";

import button from "./rule/aide/button";
import alert from "./rule/aide/alert";

export default function createMenu() {
    return [
        {
            name: "main",
            title: "基础组件",
            list: [input, select, radio, checkbox, _switch, slider, datePicker, timePicker, cascader, inputNumber, rate, colorPicker],
        },
        {
            name: "higher",
            title: "高级组件",
            list: [treeSelect],
        },
        {
            name: "layout",
            title: "布局组件",
            list: [row, grid, tabs, collapse, divider, space],
        },
        {
            name: "aide",
            title: "辅助组件",
            list: [button, alert],
        },
    ];
}
