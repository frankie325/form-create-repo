import Vue from "vue";
import App from "./App.vue";
import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";
Vue.use(ViewUI);

import FormCreate from "@/iview";
import FcDesigner from "@/designer";

Vue.use(FormCreate, {
    form: {
        // clearable: true,
        // inline: true,
        // labelWidth: 200,
        // labelPosition: "right",
    },
    global: {
        // input: {
        //     style: "color:blue",
        //     props: {
        //         clearable: false,
        //         disabled: false,
        //     },
        //     // on: {
        //     //     fun1: [() => {console.log("global")}],
        //     //     fun2: () => {},
        //     // },
        // },
    },
    axios: {
        baseURL: "http://localhost:3000/",
        timeout: 10000,
        headers: [],
    },
    // submitBtn: true,
    // resetBtn: true,
});

Vue.use(FcDesigner);

new Vue({
    el: "#app",
    render: (h) => h(App),
});
