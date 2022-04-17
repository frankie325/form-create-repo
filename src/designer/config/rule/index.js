import input from "./input";
import select from "./select";
import radio from "./radio";
import checkbox from "./checkbox";
import _switch from "./switch"; //switch是关键字，直接使用会报错
import slider from "./slider";
import datePicker from "./datePicker";
import timePicker from "./timePicker";
import cascader from "./cascader";
import inputNumber from "./inputNumber";
import rate from "./rate";
import colorPicker from "./colorPicker";
import row from "./row";
import col from "./col";
import divider from "./divider";

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
    [row.name]: row,
    [col.name]: col,
    [divider.name]: divider,
};

export default ruleList;
