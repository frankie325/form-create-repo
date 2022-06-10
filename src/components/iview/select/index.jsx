import { is } from "@form-create/utils";

const NAME = "fcSelect";

export default {
    name: NAME,
    functional: true,
    props: {
        formCreateInject: {
            type: Object,
            required: true,
        },
    },
    render(h, ctx) {
        const options = ctx.props.formCreateInject.options;
        return (
            <Select {...ctx.data}>
                {(Array.isArray(options) ? options : []).map((option, index) => {
                    const slot = option.slot;
                    delete option.slot;
                    return (
                        <Option {...{ props: option }} key={"" + index + option.label}>
                            {slot ? (is.Function(slot) ? slot(h, { ...option }) : slot) : ""}
                        </Option>
                    );
                })}
                {ctx.children}
            </Select>
        );
    },
};
