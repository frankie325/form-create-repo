import { extend } from "@/utils";
import { funcProxy } from "../frame/utils";
import useRender from "./render";
import useCache from "./cache";
export default function Render(handle) {
    extend(this, {
        $handle: handle,
        fc: handle.fc,
        vm: handle.vm,
        $h: undefined,
        $manager: handle.$manager,
        orgChildren: {}, //保存每一个rule项的rule.children，没有则为空数组
        tempList: {},
        vNode: new handle.fc.CreateNode(handle.vm),
        cache: {},
    });

    funcProxy(this, {
        options() {
            return handle.options;
        },
        sort() {
            return handle.sort;
        },
    });

    this.initCache();
    this.initRender();
}

useRender(Render);
useCache(Render);
