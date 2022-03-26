import { unique } from "@/utils";

const label = "选择器";
const name = "select";

export default {
    icon: "md-arrow-dropdown-circle",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            props: {
                transfer: true,
            },
            options: [
                {
                    label: "选项1",
                    value: "1",
                },
                {
                    label: "选项2",
                    value: "2",
                },
            ],
        };
    },
    props() {
        return [];
    },
};
