import { is } from "@/utils";

const NAME = "fcCheckbox";

export default {
    name: NAME,
    props: {
        formCreateInject: {
            type: Object,
            required: true,
        },
    },
    methods: {
        options() {
            const opt = this.formCreateInject.options;
            return Array.isArray(opt) ? opt : [];
        },
    },
    render(h) {
        return (
            <CheckboxGroup {...this.formCreateInject.prop}>
                {this.options().map((option, index) => {
                    const slot = option.slot;
                    return (
                        <Checkbox {...{ props: option }} key={"" + index + option.label}>
                            {slot ? (is.Function(slot) ? slot(h) : slot) : ""}
                        </Checkbox>
                    );
                })}
            </CheckboxGroup>
        );
    },
};
