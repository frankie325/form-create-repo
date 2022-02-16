import { mergeProps } from "@/utils";

// 合并option.global属性
export function mergeGlobal(target, merge) {
    if (!target) return;
    Object.keys(merge).forEach((key) => {
        if (target[key]) {
            target[key] = mergeRule(target[key], merge[key]);
        } else {
            target[key] = merge[key];
        }
    });
    return target;
}

function mergeRule(rule, merge) {
    // console.log(rule, merge);
    return mergeProps(rule, Array.isArray(merge) ? merge : [merge]);
}
