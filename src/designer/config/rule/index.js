import input from "./input";
import select from "./select";
import row from "./row";
import col from "./col";

const ruleList = {
    [input.name]: input,
    [select.name]: select,
    [row.name]: row,
    [col.name]: col,
};

export default ruleList;
