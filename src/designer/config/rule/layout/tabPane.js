const name = "tabPane";

export default {
    name,
    drag: true,
    dragBtn: false,
    inside: true,
    rule() {
        return {
            type: name,
            props: {
                label: "标签页",
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
                title: "当前标签页的 name（不可设置）",
                type: "input",
                field: "name",
                props: {
                    disabled: true,
                },
            },
            {
                title: "选项卡头显示文字",
                type: "input",
                field: "label",
            },
            {
                title: "选项卡图标",
                type: "input",
                field: "icon",
            },
            // {
            //     title: "是否禁用该选项卡",
            //     type: "switch",
            //     field: "disabled",
            // },
        ];
    },
};
