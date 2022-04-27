// 连字符转驼峰，如果首字母大写则转为小写
export default function toCase(str) {
    const to = str.replace(/(-[a-z])/g, function (v) {
        return v.replace('-', '').toLocaleUpperCase();
    });

    return lower(to);
}

// 首字母小写
export function lower(str) {
    return str.replace(str[0], str[0].toLowerCase());
}
