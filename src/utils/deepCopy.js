import is from "./type";

function isObject(obj) {
    return obj !== null && typeof obj === "object";
}

export default function deepCopy(target) {
    if (!isObject(target)) {
        // 非引用类型直接返回
        return target;
    } else {
        let copy;
        if (Array.isArray(target)) {
            copy = [];
            for (let i = 0; i < target.length; i++) {
                copy[i] = deepCopy(target[i]);
            }
            // 数组和对象，Map，Set可继续遍历
        } else if (is.Object(target)) {
            copy = {};
            const keys = Object.keys(target);
            for (let i = 0; i < keys.length; i++) {
                copy[keys[i]] = deepCopy(target[keys[i]]);
            }

            // 其他类型调用构造函数创建
        } else if (is.Date(target)) {
            const Ctor = target.constructor;
            copy = new Ctor(target);
        } else {
            /*...*/
        }
        return copy || target;
    }
}
