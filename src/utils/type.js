const is = {
    type(arg, type) {
        return Object.prototype.toString.call(arg) === "[object " + type + "]";
    },
    Undef(v) {
        return v === undefined || v === null;
    },
    Element(arg) {
        return typeof arg === "object" && arg !== null && arg.nodeType === 1 && !is.Object(arg);
    },
    trueArray(data) {
        return Array.isArray(data) && data.length > 0;
    },
};

["Date", "Object", "Function", "String", "Boolean", "Array", "Number", "RegExp"].forEach((t) => {
    is[t] = function (arg) {
        return is.type(arg, t);
    };
});

// 判断对象是否有指定的属性，不包含原型链上的
export function hasProperty(rule, k) {
    return {}.hasOwnProperty.call(rule, k);
}

export default is;
