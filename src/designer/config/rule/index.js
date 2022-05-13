import input from "./base/input";
import select from "./base/select";
import radio from "./base/radio";
import checkbox from "./base/checkbox";
import _switch from "./base/switch"; //switch是关键字，直接使用会报错
import slider from "./base/slider";
import datePicker from "./base/datePicker";
import timePicker from "./base/timePicker";
import cascader from "./base/cascader";
import inputNumber from "./base/inputNumber";
import rate from "./base/rate";
import colorPicker from "./base/colorPicker";
import tree from "./base/tree";

import treeSelect from './higher/treeSelect'
import city from './higher/city'

import row from "./layout/row";
import col from "./layout/col";
import grid from "./layout/grid";
import gridItem from "./layout/gridItem";
import tabs from "./layout/tabs";
import tabPane from "./layout/tabPane";
import collapse from "./layout/collapse";
import panel from "./layout/panel";
import divider from "./layout/divider";
import space from "./layout/space";

import button from "./aide/button";
import alert from "./aide/alert";

const ruleList = {
    [input.name]: input,
    [select.name]: select,
    [radio.name]: radio,
    [checkbox.name]: checkbox,
    [_switch.name]: _switch,
    [slider.name]: slider,
    [datePicker.name]: datePicker,
    [timePicker.name]: timePicker,
    [cascader.name]: cascader,
    [inputNumber.name]: inputNumber,
    [rate.name]: rate,
    [colorPicker.name]: colorPicker,
    [tree.name]: tree,
    [treeSelect.name]: treeSelect,
    [city.name]: city,
    [row.name]: row,
    [col.name]: col,
    [grid.name]: grid,
    [gridItem.name]: gridItem,
    [tabs.name]: tabs,
    [tabPane.name]: tabPane,
    [collapse.name]: collapse,
    [panel.name]: panel,
    [divider.name]: divider,
    [space.name]: space,
    [button.name]: button,
    [alert.name]: alert,
};

export default ruleList;
