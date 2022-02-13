module.exports = {
    // 主题长度限制
    subjectLimit: 100, //默认100
    // 主题分隔符
    // subjectSeparator: ":", //默认冒号
    // 提交类型前缀
    // typePrefix:"", //默认空
    // 提交类型后缀
    // typeSuffix:"", //默认空
    // 说明影响的范围，比如数据层、控制层、视图层等等，根据项目需求设置
    // scopes: [],
    // 可选类型
    types: [
        { value: "init", name: "init:      初始化" },
        { value: "feat", name: "feat:      新功能" },
        { value: "fix", name: "fix:       修复" },
        { value: "docs", name: "docs:      文档变更" },
        { value: "style", name: "style:     代码格式（不影响代码运行的变动）" },
        { value: "refactor", name: "refactor:  重构（既不是增加feature）,也不是修复bug" },
        { value: "pref", name: "pref:      性能优化" },
        { value: "test", name: "test:      增加测试" },
        { value: "chore", name: "chore:     构建过程或辅助工具的变动" },
        { value: "revert", name: "revert:    回退" },
        { value: "build", name: "build:     打包" },
    ],

    // 步骤，即问题列表
    messages: {
        type: "请选择提交的类型；",
        customScope: "请输入修改的范围（可选）",
        subject: "请简要描述提交（必填）",
        body: "请输入详细描述（可选）",
        footer: "请选择要关闭的issue（可选）",
        confirmCommit: "确认要使用以上信息提交？（y/n）",
    },
    // 想跳过的问题列表
    // skipQuestions: ["body", "footer"],
};
