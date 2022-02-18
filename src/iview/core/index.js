import FormCreateFactory from "@/core";
import manager from "./manager";
import alias from "./alias";
import parsers from "../parsers";

function install(create) {
    create.componentAlias(alias);

    parsers.forEach((parser) => {
        create.parser(parser);
    });
}

export default function ivuFormCreate() {
    return FormCreateFactory({
        manager,
        install,
    });
}
