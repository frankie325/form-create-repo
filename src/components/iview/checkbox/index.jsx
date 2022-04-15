import { is } from "@/utils";

const NAME = "fcCheckbox";

export default {
    name: NAME,
    props: {
        formCreateInject: {
            type: Object,
            required: true,
        },
        value: {
            type: Array,
            default: () => [],
        },
        disabled: Boolean,
        border: Boolean,
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
            trueValue: [],
        };
    },
    methods: {
        options() {
            const opt = this.formCreateInject.options;
            return Array.isArray(opt) ? opt : [];
        },
        update() {
            this.trueValue =
                this.options()
                    .filter((o) => this.value.indexOf(o.value) > -1)
                    .map((o) => o.label) || [];
        },
        onInput(n) {
            this.$emit(
                "input",
                this.options()
                    .filter((o) => n.indexOf(o.label) > -1)
                    .map((o) => o.value) || []
            );
        },
    },
    created() {
        this.update();
    },
    render(h) {
        return (
            <CheckboxGroup {...this.formCreateInject.prop} value={this.trueValue} on-input={this.onInput}>
                {this.options().map((option, index) => {
                    const props = { ...option };
                    delete props.value;
                    const slot = props.slot;
                    return (
                        <Checkbox disabled={this.disabled} border={this.border} {...{ props }} key={"" + index + props.label}>
                            {slot ? (is.Function(slot) ? slot(h) : slot) : ""}
                        </Checkbox>
                    );
                })}
            </CheckboxGroup>
        );
    },
};
