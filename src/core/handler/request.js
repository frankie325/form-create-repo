import { extend, is, toArray } from "@form-create/utils";
import { hasProperty } from "@form-create/utils/type";
import { err } from "@form-create/utils/console";

// 根据传入的取值路径path，设置值到rule属性上
function deepSet(data, path, val) {
    let _data = data,
        to;
    (path || "").split(".").forEach((key) => {
        if (to) {
            if (!_data[to] || typeof _data[to] != "object") {
                _data[to] = {};
            }
            _data = _data[to];
        }
        to = key;
    });

    _data[to] = val;
}

export default function useRequest(Handle) {
    extend(Handle.prototype, {
        parseRequest(ctx) {
            ctx.request = [];
            let request = ctx.rule.request;
            request = toArray(request);

            request.forEach(async (r) => {
                const altKeys = r.altKeys;
                const axios = r.axios;
                const to = r.to || "options"; //默认设置的属性为rule.options
                // const isNest = is.String(r.nestKey) || is.trueArray(r.nestKey);
                let nestKey = undefined;

                if (!axios || !r.axios.url) return;

                if (is.String(r.nestKey) && r.nestKey.length) {
                    nestKey = [r.nestKey, "children"];
                } else if (is.trueArray(r.nestKey)) {
                    r.nestKey.length === 1 ? (nestKey = [r.nestKey[0], "children"]) : (nestKey = r.nestKey.slice(0, 2));
                }

                // 防止嵌套key和替换key重复设置
                if (nestKey && hasProperty(altKeys, nestKey[0])) delete altKeys[nestKey[0]];

                const result = async () => {
                    let res;
                    try {
                        const data = await this.fc.request(axios);
                        res = r.parse ? r.parse(data) : data;
                        // 替换数据中的字段
                        if (is.Object(altKeys) && Object.keys(altKeys).length !== 0) {
                            res = this.alternativeKeys(res, nestKey, altKeys);
                        }
                    } catch (e) {
                        err(e, ctx.rule);
                    }

                    return {
                        to,
                        response: res,
                    };
                };

                ctx.request.push(result);
            });
        },
        alternativeKeys(data, nestKey, altKeys) {
            return data.map((item) => {
                Object.keys(altKeys).forEach((k) => {
                    item[k] = item[altKeys[k]];
                    delete item[altKeys[k]];
                });

                if (nestKey && Array.isArray(item[nestKey[0]])) {
                    item[nestKey[1]] = this.alternativeKeys(item[nestKey[0]], nestKey, altKeys);
                } else {
                    item[nestKey[1]] = [];
                }

                delete item[nestKey[0]];
                return item;
            });
        },
        runRequest(ctx) {
            const request = ctx.request;
            request.forEach(async (r) => {
                const data = await r();
                data.response && deepSet(ctx.rule, data.to, data.response);
            });
        },
    });
}
