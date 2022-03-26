const label = "栅格布局";
const name = "row";

export default {
    icon: "md-reorder",
    label,
    name,
    children: "col",
    rule() {
        return {
            type: name,
            props: {},
            children: [],
        };
    },
    props() {
        return [];
    },
};
