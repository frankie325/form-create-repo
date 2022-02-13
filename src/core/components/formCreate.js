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
        data() {
            return {
                formCreate: null,
            };
        },
        render(h) {
            // return h("div", "111");
            // return this.formCreate.render;
        },
        beforeCreate() {
            const { rule, option } = this.$options.propsData;
            this.formCreate = new FormCreate(this, rule, option);
        },
    };
}
