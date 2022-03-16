const name = "col";

export default {
    name,
    drag: true,
    dragBtn: false,
    inside: true,
    rule() {
        return {
            type: name,
            props: {
                span: 12,
            },
            children: [],
        };
    },
};
