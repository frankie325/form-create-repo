<template>
    <Layout class="fc-designer">
        <Header class="fc-header">
            <Button icon="md-arrow-down" @click="setJson">导入JSON</Button>
            <Button icon="md-arrow-down" @click="setOption">导入Option</Button>
            <Button type="primary" icon="ios-paper" @click="genJson">生成JSON</Button>
            <Button type="success" @click="genTemplate">生成组件</Button>
        </Header>
        <fc-designer ref="designer"></fc-designer>
        <Footer class="fc-side-footer">Footer</Footer>
        <Modal class="fc-struct-modal" :width="700" v-model="showModal" :title="title[type]" :footer-hide="type > 1">
            <div ref="editor" v-if="showModal"></div>
            <div slot="footer">
                <span style="color: red; float: left; text-align: left" v-if="err">输入内容格式有误{{ err !== true ? err : "" }}</span>
                <Button type="primary" @click="onOk">确定</Button>
                <Button @click="showModal = false">取消</Button>
            </div>
        </Modal>
    </Layout>
</template>

<script>
// 引入codemirror主要文件
import CodeMirror from "codemirror/lib/codemirror";
import "codemirror/lib/codemirror.css";

// 引入mode，支持对应语法高亮显示
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/vue/vue";
// import "codemirror/mode/xml/xml";
// import "codemirror/mode/css/css";
// import "codemirror/addon/mode/overlay";
// import "codemirror/addon/mode/simple";
// import "codemirror/addon/selection/selection-pointer";
// import "codemirror/mode/handlebars/handlebars";
// import "codemirror/mode/htmlmixed/htmlmixed";
// import "codemirror/mode/pug/pug";

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

import FormCreate from "@/iview";
import { is } from "@/utils";
import { deepParseFn } from "./utils";
const TITLE = ["设置生成规则", "设置Option", "生成规则", "生成组件"];
export default {
    name: "Designer",
    watch: {
        value() {
            this.load();
        },
        showModal(n) {
            if (!n) {
                this.value = null;
                this.err = false;
            }
        },
    },
    data() {
        return {
            showModal: false,
            value: null,
            editor: null,
            err: null,
            title: TITLE,
            type: -1,
        };
    },
    methods: {
        load() {
            let val;
            if (this.type === 2) {
                val = FormCreate.toJson(this.value, 2);
            } else if (this.type === 3) {
                val = this.value;
            } else {
                val = JSON.stringify(this.value, null, 2);
            }

            this.$nextTick(() => {
                this.editor = CodeMirror(this.$refs.editor, {
                    lineNumbers: true, //显示行号
                    // mode: "javascript", //实现javascript代码高亮
                    theme: "idea", // 主题
                    mode: this.type === 3 ? { name: "vue" } : "application/json",
                    gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"], //设置左侧gutters的类名，需配合对应的功能使用
                    lint: true, //开启校验错误提示
                    line: true,
                    tabSize: 2, //制表符的宽度。默认为 4
                    lineWrapping: true, //在长行时文字是换行还是滚动,true为换行
                    value: val || "",
                    styleActiveLine: true, // 光标行背景高亮
                    closebrackets: true, // 自动补全功能
                    foldGutter: true, //折叠功能
                    matchBrackets: true, // 自动括号匹配功能
                });

                this.editor.on("blur", () => {
                    this.err = this.editor.state.lint.marked.length > 0;
                });
            });
        },

        onOk() {
            if (this.err) return;
            const json = this.editor.getValue();
            let val = JSON.parse(json);

            // 导入JSON时
            if (this.type === 0) {
                if (!Array.isArray(val)) {
                    this.err = "：生成规则必须为数组";
                    return;
                }
                this.$refs.designer.setRule(FormCreate.parseJson(json));

                // 导入Option时
            } else {
                if (!is.Object(val)) {
                    this.err = "：option必须为对象";
                    return;
                }
                this.$refs.designer.setOption(deepParseFn(val));
            }
            this.showModal = false;
        },
        setJson() {
            this.showModal = true;
            this.type = 0;
            this.value = [];
        },
        setOption() {
            this.showModal = true;
            this.type = 1;
            this.value = { form: {} };
        },
        genJson() {
            this.showModal = true;
            this.type = 2;
            this.value = this.$refs.designer.getRule();
        },
        genTemplate() {
            this.showModal = true;
            this.type = 3;
            this.value = this.makeTemplate();
        },
        makeTemplate() {
            const rule = this.$refs.designer.getRule();
            const opt = this.$refs.designer.getOption();
            return `<template>  
    <FormCreate
        v-model="fApi"
        :rule="rule"
        :option="option"
    ></FormCreate>
</template>

<script>
import FormCreate from "@\/iview"

export default {
    data(){
        return {
            fApi: null,
            rule: FormCreate.parseJson(${FormCreate.toJson(rule)}),
            option: FormCreate.parseJson(${FormCreate.toJson(opt)})
        }
    }
    methods:{

    }
}
<\/script>
`;
        },
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

.fc-struct-modal .CodeMirror {
    height: 400px;
}

.fc-struct-modal .CodeMirror-scroll {
    overflow-x: hidden !important;
}

.CodeMirror-lint-tooltip {
    z-index: 2021 !important;
}
</style>
