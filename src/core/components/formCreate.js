import { extend } from "@/utils";

const Name = "FormCreate";

export default function $FormCreate(FormCreate) {
    return {
        name: Name,
        model: {
            prop: "api",
        },
        // 注入参数，子表单使用
        provide() {
            return {
                $pfc: this,
            };
        },
        inject: { $pfc: { default: null } },
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
            extendOption: Boolean, //子表单为true
        },
        watch: {
            // 只监听顶层rules的变化
            rule(n) {
                // 如果新rules在旧rules每一项都一样，则不用重新更新
                if (n.length === this.renderRule.length && n.every((v) => this.renderRule.indexOf(v) > -1)) return;
                this.formCreate.$handle.reloadRule(n);
                this._renderRule();
            },
            /*
                当rule和value同时修改时，保证先触发rule的更新（监听顺序），重新reloadRule
                否则当value修改引起control配置操作了顶层规则，会先_renderRule，导致无法reloadRule
            */ 
            value: {
                handler(n) {
                    if (JSON.stringify(n) === this.updateValue) return;
                    this.$f.coverValue(n);
                },
                deep: true,
            },
            option: {
                handler(n) {
                    // debugger
                    this.formCreate.initOptions(n);
                    this.$f.refresh();
                },
                deep: true,
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
                ctxInject: {},
                destroyed: false,
            };
        },
        render(h) {
            console.log("form-create重新渲染");
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
                if (this.destroyed) return;
                this.updateValue = JSON.stringify(value);
                this.$emit("update:value", value);
            },
        },
        updated() {
            console.log("form-create执行updated钩子", this);
        },
        beforeCreate() {
            const { rule, option } = this.$options.propsData;
            this.formCreate = new FormCreate(this, rule, option);
            Object.keys(this.formCreate.prop).forEach((k) => {
                extend(this.$options[k], this.formCreate.prop[k]);
            });
            this.$emit("beforeCreate", this.formCreate.api());
        },
        mounted() {
            console.log("---------form-create实例---------", this);
            console.log("----------FormCreate实例----------", this.formCreate);
        },
    };
}
