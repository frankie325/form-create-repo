const name = "panel";

export default {
    name,
    drag: true,
    dragBtn: false,
    inside: true,
    slot: "content",
    rule() {
        return {
            type: name,
            props: {
                headContent: "面板头内容",
            },
            effect: {
                _name: true,
            },
            children: [],
        };
    },
    props() {
        return [
            {
                title: "当前面板的 name（不可设置）",
                type: "input",
                field: "name",
                props: {
                    disabled: true,
                },
            },
            {
                title: "面板头内容",
                type: "input",
                field: "headContent",
            },
            {
                title: "是否隐藏箭头",
                type: "switch",
                field: "hideArrow",
            },
        ];
    },
};
