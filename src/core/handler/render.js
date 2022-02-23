import { extend } from "@/utils";

export default function useRender(Handle) {
    extend(Handle.prototype, {
        render() {
            ++this.loadedId;
            return this.$render.render();
        },
    });
}
