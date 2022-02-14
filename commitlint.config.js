module.exports = {
    // 从node_modules中解析和加载@commitlint/config-veright
    extents: ["@commitlint/config-conventional"],
    /*
        rule由name和配置数组组成
        数组中第一位为level，可选0,1,2，0为禁用，1为输出警告信息，2为输出错误信息
        第二位为应用与否，可选always|never
        第三位该rule的值
    */
    rules: {
        // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
        "type-enum": [2, "always", ["init", "feat", "fix", "ci", "docs", "style", "refactor", "perf", "test", "chore", "revert", "build"]],
        // <type> 不能为空
        "type-empty": [2, "never"],
        // <type> 格式 小写
        "type-case": [2, "always", "lower-case"],
        // 影响的范围为空禁用，即<scope>可以为空
        "scope-empty": [0],
        // <scope> 格式 小写
        "scope-case": [2, "always", "lower-case"],
        // <subject> 不能为空
        "subject-empty": [2, "never"],
        // <body> 不能为空
        // "body-empty": [2, "never"],
        // <body> 以空行开头
        // "body-leading-blank": [1, "always"],
        // <footer> 以空行开头
        // "footer-leading-blank": [1, "always"],
    },
};
