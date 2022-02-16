import FormCreateFactory from "@/core";
import manager from "./manager";

export default function ivuFormCreate() {
    return FormCreateFactory({
        manager,
    });
}
