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
    props() {
        return [
            {
                title: "栅格的占位格数",
                type: "slider",
                field: "span",
                props: {
                    min: 0,
                    max: 24,
                    step: 1,
                },
            },
            {
                title: "栅格左侧的间隔格数",
                type: "slider",
                field: "offset",
                value: 0,
                props: {
                    min: 0,
                    max: 24,
                    step: 1,
                },
            },
            {
                title: "栅格向右移动格数",
                type: "slider",
                field: "push",
                value: 0,
                props: {
                    min: 0,
                    max: 24,
                    step: 1,
                },
            },
            {
                title: "栅格向左移动格数",
                type: "slider",
                field: "pull",
                value: 0,
                props: {
                    min: 0,
                    max: 24,
                    step: 1,
                },
            },
            {
                title: "栅格的顺序",
                type: "inputNumber",
                field: "order",
                value: null,
            },
        ];
    },
};
