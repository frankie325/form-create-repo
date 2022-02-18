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
        },
        data() {
            return {
                updateValue: "",
                renderRule: [...(this.rule || [])],
            };
        },
        render(h) {
            console.log("form-create重新渲染");
            return h(
                "div",
                {
                    style: { color: "red" },
                    // class: "div1",
                    // class: { div1: true },
                    class: [{ div1: true }, "div2", ["div3"]],
                },
                "1111"
            );
            // return this.formCreate.render;
        },
        methods: {
            _renderRule() {
                this.renderRule = [...(this.rule || [])];
            },
            _updateValue(value) {
                this.updateValue = JSON.stringify(value);
                this.$emit("update:value", value);
            },
        },
        updated() {
            console.log("form-create执行updated钩子")
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
