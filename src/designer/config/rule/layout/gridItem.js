const name = "gridItem";

export default {
    name,
    drag: true,
    dragBtn: false,
    inside: true,
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
