import { extend } from "@/utils";
import { funcProxy } from "../frame/utils";
import useRender from "./render";


export default function Render(handle) {
    extend(this, {
        $handle: handle,
        fc: handle.fc,
        vm: handle.vm,
        $manager: handle.$manager,
        orgChildren: {}, //保存每一个rule项的rule.children，没有则为空数组
    });

    funcProxy(this, {
        options() {
            return handle.options;
        },
    });
}

useRender(Render);
