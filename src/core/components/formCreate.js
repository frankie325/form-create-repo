const Name = "FormCreate";

export default function $FormCreate(FormCreate) {
    return {
        name: Name,
        model: {
            prop: "api",
        },
        props: {
            rule: {
                type: Array,
                required: true,
            },
            option: {
                type: Object,
                default() {
                    return {};
                },
            },
            value: Object,
            api: Object,
        },
        watch: {
            // value:{

            // },
            option: {
                handler(n) {
                    this.formCreate.initOptions(n);
                    console.log("----------FormCreate实例----------", this.formCreate);
                },
                deep: true,
            },
            // 只监听顶层rules的变化
            rule(n) {
                // 如果新rules在旧rules每一项都一样，则不用重新更新
                if (n.length === this.renderRule.length && n.every((v) => this.renderRule.indexOf(v) > -1)) return;
                this.formCreate.$handle.reloadRule(n);
                this._renderRule();
            },
        },
        data() {
            return {
                $f: {},
                isShow: true,
                updateValue: "",
                unique: 1, //通过在render过程对unique操作，收集form-create渲染Watcher
                renderRule: [...(this.rule || [])],
                formData: {},
                validate: {},
            };
        },
        render(h) {
            console.log("form-create重新渲染");
            // return h(
            //     "div",
            //     {
            //         style: { color: "red" },
            //         // class: "div1",
            //         // class: { div1: true },
            //         class: [{ div1: true }, "div2", ["div3"]],
            //     },
            //     "1111"
            // );
            return this.formCreate.render();
        },
        methods: {
            // 当rules更新时，通过操作unique，实现重新执行render的过程
            _refresh() {
                ++this.unique;
            },
            _renderRule() {
                this.renderRule = [...(this.rule || [])];
            },
            _updateValue(value) {
                this.updateValue = JSON.stringify(value);
                this.$emit("update:value", value);
            },
        },
        updated() {
            console.log("form-create执行updated钩子");
        },
        beforeCreate() {
            const { rule, option } = this.$options.propsData;
            this.formCreate = new FormCreate(this, rule, option);
        },
        mounted() {
            console.log("---------form-create实例---------", this);
            console.log("----------FormCreate实例----------", this.formCreate);
        },
    };
}
