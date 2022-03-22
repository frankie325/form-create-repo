const NAME = "fcSubForm";

export default {
    name: NAME,
    props: {
        rule: Array,
        option: Object,
        formCreateInject: {
            type: Object,
            required: true,
        },
        value: {
            type: Object,
            default: () => ({}),
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        syncDisabled: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            cacheValue: "",
            cacheRule: {},
            type: undefined,
        };
    },
    watch: {
        disabled(n) {
            this.syncDisabled && this.cacheRule.$f.disabled(n);
        },
        value(n) {
            this.setValue(n);
        },
    },
    methods: {
        setValue(value) {
            const str = JSON.stringify(value);
            if (this.cacheValue === str) return;
            this.cacheValue = str;
            this.cacheRule.$f.coverValue(value || {});
        },
        addRule() {
            const option = this.option
                ? this.option
                : {
                      submitBtn: false,
                      resetBtn: false,
                  };
            option.formData = { ...(this.value || {}) };
            this.cacheRule = { rule: this.rule || [], option };
        },
        formData(value) {
            this.cacheValue = JSON.stringify(value);
            this.$emit("input", value);
            this.$emit("change", value);
        },
        add$f($f) {
            this.cacheRule.$f = $f;
            this.subForm();
            this.$nextTick(() => {
                this.syncDisabled && $f.disabled(this.disabled);
                this.$emit("itemMounted", $f);
            });
        },
        subForm() {
            this.formCreateInject.subForm(this.cacheRule.$f);
        },
        emitEvent(name, ...args) {
            this.$emit(name, args);
        },
    },
    created() {
        this.addRule();
        this.type = this.formCreateInject.form.$form();
    },
    render(h) {
        const { rule, option } = this.cacheRule;
        const Type = this.type;
        return (
            <Type
                on={{
                    "update:value": this.formData,
                    "emit-event": this.emitEvent,
                    input: this.add$f,
                }}
                rule={rule}
                option={option}
                extendOption={true}
            />
        );
    },
};
