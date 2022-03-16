const label = "栅格布局";
const name = "row";

export default {
    icon: "md-reorder",
    label,
    name,
    rule() {
        return {
            type: name,
            props: {},
            children: [],
        };
    },
    children: "col",
};
