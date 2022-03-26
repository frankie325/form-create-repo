<template>
    <Layout class="fc-designer">
        <Header class="fc-header">
            <Button>导入JSON</Button>
            <Button icon="ios-paper">生成JSON</Button>
        </Header>
        <fc-designer ref="designer"></fc-designer>
        <Footer class="fc-side-footer">Footer</Footer>
    </Layout>
</template>

<script>
// 引入codemirror主要文件
import CodeMirror from "codemirror/lib/codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";

import jsonlint from "jsonlint-mod"; // 安装jsonlint开启对JSON的校验，并挂载到window
// 校验错误提示需要引入
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/lint";
// 需要什么校验，还需要安装对应的依赖，这里用到JSON校验即可
import "codemirror/addon/lint/json-lint";
// import "codemirror/addon/lint/javascript-lint";

// 引入主题 可以从 codemirror/theme/ 下引入多个
import "codemirror/theme/idea.css";

// addon文件内为codemirror提供的功能
import "codemirror/addon/edit/closebrackets"; //自动补全功能

// 代码段折叠功能
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/foldgutter.css";

import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/xml-fold.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/comment-fold.js";

// 括号匹配高亮提示功能
import "codemirror/addon/edit/matchbrackets";
export default {
    name: "Designer",
    data() {
        return {};
    },
    beforeCreate() {
        window.jsonlint = jsonlint;
    },
};
</script>

<style>
.fc-designer {
    height: 100%;
    min-height: 500px;
}
.fc-header {
    background: #fff !important;
}
</style>
