import { extend, is, toArray } from "@form-create/utils";
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

                if (!axios || !r.axios.url) return;

                const result = async () => {
                    let res;
                    try {
                        const data = await this.fc.request(axios);
                        res = r.parse ? r.parse(data) : data;
                        // 替换数据中的字段
                        if (is.Object(altKeys) && Object.keys(altKeys).length !== 0) {
                            res = res.map((i) => {
                                Object.keys(altKeys).forEach((k) => {
                                    i[k] = i[altKeys[k]];
                                    delete i[altKeys[k]];
                                });
                                return i;
                            });
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
        runRequest(ctx) {
            const request = ctx.request;
            request.forEach(async (r) => {
                const data = await r();
                data.response && deepSet(ctx.rule, data.to, data.response);
            });
        },
    });
}
