import is from "@/utils/type";
import { parseFn } from "@/utils/json";

// 进行递归，解析形式为函数字符的值
export const deepParseFn = function (target) {
    for (const key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            let data = target[key];
            if (Array.isArray(data) || is.Object(data)) {
                deepParseFn(data);
            }
            if (is.String(data)) {
                target[key] = parseFn(data);
            }
        }
    }
    return target;
};

// 转换为JSON字符串
// export function toJSON(val) {
//     const type = /object ([a-zA-Z]*)/.exec(Object.prototype.toString.call(val));
//     if (type && _toJSON[type[1].toLowerCase()]) {
//         return _toJSON[type[1].toLowerCase()](val);
//     } else {
//         return val;
//     }
// }

// const _toJSON = {
//     object: function (val) {
//         var json = [];
//         for (var i in val) {
//             if (!hasProperty(val, i)) continue;
//             json.push(toJSON(i) + ": " + (val[i] != null ? toJSON(val[i]) : "null"));
//         }
//         return "{\n " + json.join(",\n ") + "\n}";
//     },
//     array: function (val) {
//         for (var i = 0, json = []; i < val.length; i++) json[i] = val[i] != null ? toJSON(val[i]) : "null";
//         return "[" + json.join(", ") + "]";
//     },
//     // 处理转义字符
//     string: function (val) {
//         var tmp = val.split("");
//         for (var i = 0; i < tmp.length; i++) {
//             var c = tmp[i];
//             c >= " "
//                 ? c === "\\"
//                     ? (tmp[i] = "\\\\")
//                     : c === '"'
//                     ? (tmp[i] = '\\"')
//                     : 0
//                 : (tmp[i] =
//                       c === "\n"
//                           ? "\\n"
//                           : c === "\r"
//                           ? "\\r"
//                           : c === "\t"
//                           ? "\\t"
//                           : c === "\b"
//                           ? "\\b"
//                           : c === "\f"
//                           ? "\\f"
//                           : ((c = c.charCodeAt()), "\\u00" + (c > 15 ? 1 : 0) + (c % 16)));
//         }
//         return '"' + tmp.join("") + '"';
//     },
// };
