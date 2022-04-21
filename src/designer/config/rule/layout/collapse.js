const label = "折叠面板";
const name = "collapse";

export default {
    customIcon: true,
    icon: "icon-collapse",
    label,
    name,
    children: "panel",
    rule() {
        return {
            type: name,
            props: {
                value: "0",
            },
            children: [],
        };
    },
    props() {
        return [
            {
                title: "当前激活的面板的 name",
                type: "input",
                field: "value",
            },
            {
                title: "是否开启手风琴模式",
                type: "switch",
                field: "accordion",
            },
            {
                title: "是否开启简洁模式",
                type: "switch",
                field: "simple",
            },
        ];
    },
};
