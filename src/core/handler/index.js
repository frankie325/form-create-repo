import { extend } from "@/utils";

export default function Handler(fc) {
    extend(this, {
        fc,
        vm: fc.vm,
    });
}
