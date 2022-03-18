import { extend, is, mergeProps } from "@/utils";
import { hasProperty } from "@/utils/type";

export default function useEffect(Handle) {
    extend(Handle.prototype, {
        /*
        处理自定义属性
        {
            name:"str", 
            components: "*", 
            input: true, //拥有rule.field字段才会触发自定义属性的事件
            init(){},...
        }
        */
        useProvider() {
            const ps = this.fc.providers;
            Object.keys(ps).forEach((k) => {
                const prop = ps[k];
                prop._c = getComponent(prop);
                this.onEffect(prop);
                this.providers[k] = prop;
            });
        },
        // 监听rule.effect中的变化
        watchEffect(ctx) {
            const vm = this.vm;
            Object.keys(ctx.rule.effect || {}).forEach((k) => {
                ctx.watch.push(
                    vm.$watch(
                        () => ctx.rule.effect[k],
                        (n) => {
                            this.effect(ctx, "watch", { [k]: n });
                        },
                        {
                            deep: true,
                            // sync: true,
                        }
                    )
                );
            });
        },
        // 将自定义属性所选的组件，注册对应方法到bus上
        // 在处理rule的不同阶段中，触发绑定在bus对应的方法，并触发自定义属性中的方法
        onEffect(provider) {
            const used = [];
            (provider._c || ["*"]).forEach((name) => {
                // debugger
                const type = name === "*" ? "*" : this.getType(name);
                if (used.indexOf(type) > -1) return;
                used.push(type);

                // 注册自定义属性指定组件对应的事件，在处理rule的不同阶段进行触发
                this.bus.$on(`p:${provider.name}:${type}:${provider.input ? 1 : 0}`, (event, args) => {
                    provider[event] && provider[event](...args);
                });
            });

            provider._used = used;
        },
        ruleEffect(rule, event, append) {
            this.emitEffect(
                {
                    rule,
                    input: !!rule.field,
                    type: this.getType(rule.type),
                },
                event,
                append
            );
        },
        effect(ctx, event, custom) {
            this.emitEffect(
                {
                    rule: ctx.rule,
                    input: ctx.input,
                    type: ctx.trueType,
                    ctx,
                    custom,
                },
                event
            );
        },
        /*
            配置rule.effect对象
            {
                [自定义属性]:自定义属性值
            }
            当effect中存在以自定义属性为键
            则在处理rule的各个阶段中，触发自定义属性的方法
        */
        emitEffect({ ctx, rule, input, type, custom }, event, append) {
            if (!type || type === "fcFragment") return;
            const effect = custom ? custom : rule.effect || {};
            Object.keys(effect).forEach((attr) => {
                const p = this.providers[attr];
                if (!p || (p.input && !input)) return;

                let _type;
                if (!p._c) {
                    _type = "*";
                } else if (p._used.indexOf(type) > -1) {
                    _type = type;
                } else {
                    return;
                }

                const data = { value: effect[attr], getValue: () => this.getEffect(rule, attr), ...(append || {}) };

                if (ctx) {
                    data.getProp = () => ctx.effectData(attr);
                    data.clearProp = () => ctx.clearEffectData(attr);
                    // 往this.payload设置rule配置，在render过程进行合并
                    data.mergeProp = (prop) => mergeProps(data.getProp(), [prop]);
                }
                this.bus.$emit(`p:${attr}:${_type}:${p.input ? 1 : 0}`, event, [data, rule, this.api]);
            });
        },
        // 获取effect定义的属性值
        getEffect(rule, name) {
            if (hasProperty(rule, "effect") && hasProperty(rule.effect, name)) {
                return rule.effect[name];
            } else {
                return undefined;
            }
        },
    });
}

// 数组去重
function unique(arr) {
    return arr.filter((item, index, arr) => {
        return arr.indexOf(item, 0) === index;
    });
}

// 处理component属性，为需要注册自定义属性的组件名称数组
function getComponent(p) {
    const c = p.components;
    if (Array.isArray(c)) return unique(c.filter((v) => v !== "*"));
    else if (is.String(c)) return [c];
    else return false;
}
