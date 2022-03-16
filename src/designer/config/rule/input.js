import { unique } from "@/utils";

const label = "输入框";
const name = "input";

export default {
    icon: "md-create",
    label,
    name,
    rule() {
        return {
            type: name,
            title: label,
            field: unique(),
            props: {},
        };
    },
};
