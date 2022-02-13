import Vue from "vue";
import App from "./App.vue";


import FormCreate from "@/iview";
Vue.use(FormCreate);

new Vue({
    el: "#app",
    render: (h) => h(App),
});
