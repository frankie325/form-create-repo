import { is, extend } from "@/utils";
import { invoke } from "../frame/utils";

export default function useLifecycle(Handle) {
    extend(Handle.prototype, {
        mounted() {
            this.isMounted = true;
            this.lifecycle("mounted");
        },
        // 执行对应的生命周期
        lifecycle(name) {
            const fn = this.options[name];
            is.Function(fn) && invoke(() => fn(this.api));
            this.vm.$emit(name, this.api);
        },
    });
}
