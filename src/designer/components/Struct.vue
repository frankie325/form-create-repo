<template>
    <div class="fc-struct">
        <Button size="small" style="width: 100%" @click="showModal = true">{{ title }}</Button>
        <Modal :width="700" class="fc-struct-modal" v-model="showModal" :title="title">
            <div ref="editor" v-if="showModal"></div>
            <div slot="footer">
                <Button type="primary">确定</Button>
                <Button>取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror";

export default {
    name: "Struct",
    props: {
        title: {
            type: String,
            default: "编辑数据",
        },
    },
    watch: {
        showModal(n) {
            if (n) {
                this.load();
            } else {
            }
        },
    },
    data() {
        return {
            showModal: false,
            editor: null,
        };
    },
    methods: {
        load() {
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
                    value: "[]",
                    styleActiveLine: true, // 光标行背景高亮
                    closebrackets: true, // 自动补全功能
                    foldGutter: true, //折叠功能
                    matchBrackets: true, // 自动括号匹配功能
                });
            });
        },
    },
};
</script>

<style>
.fc-struct-modal .CodeMirror {
    height: 350px;
}

.fc-struct-modal .CodeMirror-scroll {
    overflow-x: hidden !important;
}

.CodeMirror-lint-tooltip {
    z-index: 2021 !important;
}
</style>
