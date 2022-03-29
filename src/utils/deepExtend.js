import is from "./type";
import { $set } from "./modify";

// 深拷贝方法
export default function deepExtend(origin, target = {}) {
    let isArr = false;
    for (let key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            let clone = target[key];
            if ((isArr = Array.isArray(clone)) || is.Object(clone)) {
                let nst = origin[key] === undefined;
                // 拷贝的为数组时
                if (isArr) {
                    isArr = false;
                    nst && $set(origin, key, []);
                } else if (false) {
                } else {
                    // 拷贝的为对象时
                    nst && $set(origin, key, {});
                }
                // 递归拷贝数组或者对象内的属性
                origin[key] = deepExtend(origin[key], clone);
            } else {
                $set(origin, key, clone);

                // 拷贝的属性存在值的话
                if (!is.Undef(clone)) {
                    // emit配置生成的方法不用拷贝
                    if (!is.Undef(clone.__emit)) {
                        delete origin[key];
                    }

                    // inject注入参数时的原始函数
                    if (!is.Undef(clone.__origin)) {
                        origin[key].__origin = clone.__origin;
                    }
                }
            }
        }
    }
    // 过滤掉由control配置生成的rules，不用拷贝，因为会根据rule.control再次生成联动的rule
    return Array.isArray(origin) ? origin.filter((v) => !v || !v.__ctrl) : origin;
}

export function deepCopy(value) {
    return deepExtend({}, { value }).value;
}
