import { extend } from "@/utils";

export default function (api, h) {
    extend(api, {
        validate() {},
    });
    return api;
}
