import { is } from "@form-create/utils";

const NAME = "fcRadio";

export default {
    name: NAME,
    props: {
        formCreateInject: {
            type: Object,
            required: true,
        },
        disabled: Boolean,
        border: Boolean,
        value: {},
    },
    watch: {
        "formCreateInject.options": {
            handler() {
                this.update();
            },
            deep: true,
        },
        value() {
            this.update();
        },
    },
    data() {
        return {
            trueValue: "",
        };
    },
    methods: {
        options() {
            const opt = this.formCreateInject.options;
            return Array.isArray(opt) ? opt : [];
        },
        // 因为RadioGroup的v-model绑定的值是由option.label去设置的
        // 这里先根据option.value和this.value来选择匹配的option.label（RadioGroup同理）
        update() {
            this.trueValue = this.options()
                .filter((o) => o.value === this.value)
                .reduce((initial, o) => o.label, "");
        },
        onInput(n) {
            this.$emit(
                "input",
                this.options()
                    .filter((o) => o.label === n)
                    .reduce((initial, o) => o.value, "")
            );
        },
    },
    created() {
        this.update();
    },
    render(h) {
        return (
            <RadioGroup {...this.formCreateInject.prop} value={this.trueValue} on-input={this.onInput}>
                {this.options().map((option, index) => {
                    const props = { ...option };
                    delete props.value;
                    const slot = props.slot;
                    delete option.slot;
                    return (
                        <Radio disabled={this.disabled} border={this.border} {...{ props }} key={"" + index + props.label}>
                            {slot ? (is.Function(slot) ? slot(h, { ...option }) : slot) : ""}
                        </Radio>
                    );
                })}
            </RadioGroup>
        );
    },
};
