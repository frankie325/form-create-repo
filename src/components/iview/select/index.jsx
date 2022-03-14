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
        console.log("-------select-------", ctx);
        const options = ctx.props.formCreateInject.options;
        return (
            <Select {...ctx.data}>
                {(Array.isArray(options) ? options : []).map((option, index) => {
                    // console.log("select", option);
                    // return (
                    //     <Option
                    //         disabled={option.disabled}
                    //         tag={option.tag}
                    //         label={option.label}
                    //         value={option.value}
                    //         key={"" + option.label + index}
                    //     ></Option>
                    // );
                    return <Option {...{ props: option }} key={"" + option.label + index}></Option>;
                })}
            </Select>
        );
    },
};
