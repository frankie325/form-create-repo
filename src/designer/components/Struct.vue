<template>
    <div class="fc-struct">
        <Button size="small" style="width: 100%" @click="showModal = true">{{ title }}</Button>
        <Modal :width="700" class="fc-struct-modal" v-model="showModal" :title="title">
            <div ref="editor" v-if="showModal"></div>
            <div slot="footer">
                <span style="color: red; float: left; text-align: left" v-if="err">输入内容格式有误{{ err !== true ? err : "" }}</span>
                <Button type="primary" @click="onOk">确定</Button>
                <Button>取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror";
import { toJson } from "@/utils";
import { deepParseFn } from "../utils";

export default {
    name: "Struct",
    props: {
        value: [Object, Array],
        title: {
            type: String,
            default: "编辑数据",
        },
        defaultValue: {
            required: false,
        },
        validate: Function,
    },
    watch: {
        showModal(n) {
            if (n) {
                this.load();
            } else {
                this.err = false;
            }
        },
        value() {
            this.load();
        },
    },
    data() {
        return {
            showModal: false,
            editor: null,
            err: null,
            oldVal: null,
        };
    },
    methods: {
        load() {
            const val = toJson(this.value || this.defaultValue, 2);
            this.oldVal = val;
            this.$nextTick(() => {
                this.editor = CodeMirror(this.$refs.editor, {
                    lineNumbers: true, //显示行号
                    // mode: "javascript", //实现javascript代码高亮
                    theme: "idea", // 主题
                    mode: "application/json",
                    gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"], //设置左侧gutters的类名，需配合对应的功能使用
                    lint: true, //开启校验错误提示
                    line: true,
                    tabSize: 2, //制表符的宽度。默认为 4
                    lineWrapping: true, //在长行时文字是换行还是滚动,true为换行
                    value: val || "[]",
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
            const str = this.editor.getValue();

            let val;
            try {
                // 将JSON字符转换为js表达式
                val = eval("(function(){return " + str + "})()");
            } catch (e) {
                this.err = `(${e})`;
                return;
            }

            if (this.validate && false === this.validate(val)) {
                this.err = true;
                return;
            }

            this.showModal = false;
            if (toJson(val, 2) !== this.oldVal) {
                this.$emit("input", deepParseFn(val));
            }
        },
    },
};
</script>

<style></style>
