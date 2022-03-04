import { mergeProps, is } from "@/utils";
import { logError } from "@/utils/console";

export function enumerable(value, writable) {
    return {
        value,
        enumerable: false,
        configurable: false,
        writable: !!writable,
    };
}

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

export function mergeRule(rule, merge) {
    // console.log(rule, merge);
    return mergeProps(rule, Array.isArray(merge) ? merge : [merge]);
}

// rule如果是由maker生成，则为creator实例，执行getRule方法，得到rule
export function getRule(rule) {
    return is.Function(rule.getRule) ? rule.getRule() : rule;
}

export function funcProxy(target, proxy) {
    Object.defineProperties(
        target,
        Object.keys(proxy).reduce((initial, key) => {
            initial[key] = {
                get() {
                    return proxy[key]();
                },
            };
            return initial;
        }, {})
    );
}

export function byCtx(rule) {
    return rule.__fc__ || (rule.__origin__ ? rule.__origin__.__fc__ : null);
}

// 错误拦截，并执行该方法
export function invoke(fn, def) {
    try {
        def = fn();
    } catch (e) {
        logError(e);
    }
    return def;
}
