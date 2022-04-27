import ivuFormCreate from "./core";
import "./style/index.css";

const create = ivuFormCreate();

if (typeof window !== "undefined") {
    if (!window.createFormCreate) {
        window.createFormCreate = create;
    }
    if (window.Vue) {
        create.install(window.Vue);
    }
}

export default create;
