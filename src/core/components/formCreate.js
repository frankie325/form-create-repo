const Name = "FormCreate";

export default function $FormCreate(FormCreate) {
    return {
        name: Name,
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
        },
        watch: {
            option: {
                handler(n) {
                    this.formCreate.initOptions(n);
                    console.log("----------FormCreate实例----------", this.formCreate);
                },
                deep: true,
            },
        },
        data() {
            return {};
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
                11
            );
            // return this.formCreate.render;
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
