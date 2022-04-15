import input from "./input";
import select from "./select";
import radio from "./radio";
import checkbox from "./checkbox";
import _switch from "./switch"; //switch是关键字，直接使用会报错
import slider from "./slider";
import colorPicker from "./colorPicker";
import row from "./row";
import col from "./col";

const ruleList = {
    [input.name]: input,
    [select.name]: select,
    [radio.name]: radio,
    [checkbox.name]: checkbox,
    [_switch.name]: _switch,
    [slider.name]: slider,
    [colorPicker.name]: colorPicker,
    [row.name]: row,
    [col.name]: col,
};

export default ruleList;
