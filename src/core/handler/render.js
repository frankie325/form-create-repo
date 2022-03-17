import { extend } from "@/utils";

export default function useRender(Handle) {
    extend(Handle.prototype, {
        clearNextTick() {
            this.nextTick && clearTimeout(this.nextTick);
            this.nextTick = null;
        },
        // form-create更新后，触发bus.$once绑定的next-tick方法
        bindNextTick(fn) {
            this.clearNextTick();
            this.nextTick = setTimeout(() => {
                fn();
                this.nextTick = null;
            }, 0);
        },
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
