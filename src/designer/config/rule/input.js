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
    props() {
        return [
            {
                title: "输入框类型",
                type: "select",
                field: "type",
                options: [
                    {
                        label: "text",
                        value: "text",
                    },
                    {
                        label: "password",
                        value: "password",
                    },
                    {
                        label: "textarea",
                        value: "textarea",
                    },
                    {
                        label: "url",
                        value: "url",
                    },
                    {
                        label: "email",
                        value: "email",
                    },
                    {
                        label: "date",
                        value: "date",
                    },
                    {
                        label: "number",
                        value: "number",
                    },
                    {
                        label: "tel",
                        value: "tel",
                    },
                ],
            },
            {
                title: "占位文本",
                type: "input",
                field: "placeholder",
                value: "",
            },
        ];
    },
};
