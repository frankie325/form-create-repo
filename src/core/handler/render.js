import { extend } from "@/utils";

export default function useRender(Handle) {
    extend(Handle.prototype, {
        render() {
            ++this.loadedId;
            if (this.vm.unique > 0) return this.$render.render();
            else {
                this.vm.unique = 1;
                return [];
            }
        },
    });
}
