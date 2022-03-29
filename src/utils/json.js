import deepExtend from "./deepExtend";
import is from "./type";
import { err } from "./console";
// 匹配普通函数或者箭头函数
const fnExpReg = /^([\w$_]+|\([^)]*?\))\s*=>|^function(?:\s+[\w$]+)?\s*\(/;

// 将rules规则转化为JSON
export function toJson(obj, space) {
    return JSON.stringify(
        deepExtend([], obj, true),
        function (key, val) {
            if (val && val._isVue === true) {
                return undefined;
            }

            // 非函数，则不改变原来的值
            if (typeof val !== "function") {
                return val;
            }

            // 将函数转为字符
            return "" + val;
        },
        space
    );
}

function makeFn(fn) {
    return eval(`(function(){ return ${fn} })()`);
}

// 解析函数字符
export function parseFn(fn) {
    let v = fn.trim();
    try {
        if (fnExpReg.test(fn)) {
            v = makeFn(v);
        }
    } catch (e) {
        err(`解析失败:${v}\n\n err:${e}`);
        return undefined;
    }
    return v;
}

// 对导入的JSON进行解析
export function parseJson(json, mode) {
    return JSON.parse(json, function (k, v) {
        if (is.String(v)) {
            return parseFn(v, mode);
        } else {
            return v;
        }
    });
}
