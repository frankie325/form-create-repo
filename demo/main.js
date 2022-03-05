import Vue from "vue";
import App from "./App.vue";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";

Vue.use(ViewUI);

import FormCreate from "@/iview";
Vue.use(FormCreate, {
    form: {
        clearable: true,
        inline: true,
        labelWidth: 200,
        labelPosition: "right",
    },
    global: {
        input: {
            style: "color:blue",
            props: {
                clearable: false,
                disabled: false,
            },
            // on: {
            //     fun1: [() => {console.log("global")}],
            //     fun2: () => {},
            // },
        },
    },
    // submitBtn: true,
    // resetBtn: true,
});

new Vue({
    el: "#app",
    render: (h) => h(App),
});
