import FormCreateFactory from "@form-create/core";
import manager from "./manager";
import alias from "./alias";
import parsers from "../parsers";
import extendApi from "./api";
import components from "../components";

function install(create) {
    create.componentAlias(alias);

    components.forEach((component) => {
        create.component(component.name, component);
    });

    parsers.forEach((parser) => {
        create.parser(parser);
    });
}

// 子表单，则修改marginLeft优先级
function setFormItemContentStyle() {
    const nodeList = document.querySelectorAll(".sub-form-create .ivu-form-item-content");
    nodeList.forEach((node) => {
        const ml = node.style.marginLeft;
        node.style.setProperty("margin-left", ml, "important");
    });
}

export default function ivuFormCreate() {
    return FormCreateFactory({
        manager,
        install,
        extendApi,
        setFormItemContentStyle,
    });
}
