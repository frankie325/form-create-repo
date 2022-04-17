const name = "slider";

export default {
    name,
    toFormValue(value, ctx) {
        let isArr = Array.isArray(value),
            props = ctx.rule.props,
            min = props.min || 0,
            parseValue;
        //根据props.range的取值，来决定value的类型
        if (props.range === true) {
            parseValue = isArr ? value : [parseFloat(min), parseFloat(value || min)];
        } else {
            parseValue = isArr ? parseFloat(value[0] || min) : parseFloat(value);
        }
        return parseValue;
    },
};
