import { $set } from "./modify";

const _extend =
    Object.assign ||
    function (target) {
        for (let b, c = 1; c < arguments.length; c++) {
            for (const d in (b = arguments[c])) {
                Object.prototype.hasOwnProperty.call(b, d) && $set(target, d, b[d]);
            }
        }
        return target;
    };

export default function extend() {
    _extend.apply(this, arguments);
}
