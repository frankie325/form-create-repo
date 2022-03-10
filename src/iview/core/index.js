import FormCreateFactory from "@/core";
import manager from "./manager";
import alias from "./alias";
import parsers from "../parsers";
import extendApi from "./api";
import components from "@/components/iview";
function install(create) {
    create.componentAlias(alias);

    components.forEach((component) => {
        create.component(component.name, component);
    });

    parsers.forEach((parser) => {
        create.parser(parser);
    });
}

export default function ivuFormCreate() {
    return FormCreateFactory({
        manager,
        install,
        extendApi,
    });
}
