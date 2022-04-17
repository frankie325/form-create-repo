const label = "分割线";
const name = "divider";

export default {
    icon: "md-remove",
    label,
    name,
    rule() {
        return {
            type: name,
            props: {},
        };
    },
    props() {
        return [
            {
                title: "是否虚线",
                type: "switch",
                field: "dashed",
            },
        ];
    },
};
