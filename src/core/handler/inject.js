import { extend, is, toLine } from "@form-create/utils";

export default function useInject(Handle) {
    extend(Handle.prototype, {
        // 为rule.on、rule.nativeOn、rule.props中的事件注入参数
        parseInjectEvent(rule, on) {
            const inject = rule.inject || this.options.injectEvent;
            return this.parseEventList(rule, on, inject);
        },
        /*  
            {
                "on-change": [()=>{},...],
                "on-blur": ()=>{},
            }
        */
        parseEventList(rule, data, inject) {
            Object.keys(data).forEach((k) => {
                const fn = this.parseEvent(rule, data[k], inject);
                if (fn) {
                    data[k] = fn; // 重新赋值为注入参数后的方法
                }
            });
        },
        parseEvent(rule, fn, inject) {
            if (is.Function(fn) && inject !== false && !is.Undef(inject)) {
                return this.inject(rule, fn, inject);
            } else if (Array.isArray(fn) && fn[0]) {
                return this.parseEventList(rule, fn, inject);
            } else if (is.String(fn)) {
            }
        },
        // 注入的参数
        getInjectData(self, inject) {
            const { option, rule } = this.vm.$options.propsData;

            return {
                api: this.api,
                $f: this.api,
                rule,
                option,
                self: self.__origin__,
                inject,
            };
        },
        inject(self, _fn, inject) {
            if (_fn.__origin) {
                if (this.watching && !this.loading) return _fn;
                _fn = _fn.__origin;
            }

            const h = this;

            const fn = function (...args) {
                const data = h.getInjectData(self, inject);
                data.args = [...args];
                args.unshift(data); //注入的参数在第一个位置
                return _fn.apply(this, args);
            };
            fn.__origin = _fn;
            // fn.__
            return fn;
        },
        /*
         使用emit配置，如下
         {
            type:'input',
            field:'inputField',
            title:'change 事件',
            emit:['change'],
            nativeEmit:['change', 'blur'],
            emit: [{
                name: 'change',
                inject: ['自定义参数,数据类型不限']
            }],
            emitPrefix:'prefix1'
         },
         <form-create @input-field-change="change"/>
         <form-create @prefix1-change="change"/>

         处理emit配置项，并生成注入了fApi,rule和自定义属性作为首参的事件对象
        */
        parseEmit(ctx, on) {
            let event = {},
                rule = ctx.rule,
                { emitPrefix, field, name, inject } = rule;

            let emit = rule[on ? "emit" : "nativeEmit"] || [];

            if (is.trueArray(emit)) {
                let emitKey = emitPrefix || field || name;
                if (emitKey) {
                    if (!on) emitKey = `native-${emitKey}`;
                    emit.forEach((eventName) => {
                        if (!eventName) return;
                        let eventInject;
                        if (is.Object(eventName)) {
                            eventInject = eventName.inject;
                            eventName = eventName.name;
                        }

                        const fieldKey = toLine(`${emitKey}-${eventName}`);
                        const fn = (...args) => {
                            this.vm.$emit(fieldKey, ...args);
                            this.vm.$emit("emit-event", fieldKey, ...args);
                        };
                        fn.__emit = true;

                        // rule.inject为false，则不开启emit事件的参数注入
                        if (!eventInject && inject === false) {
                            event[eventName] = fn;
                        } else {
                            // 三个地方可以配置注入参数，emit中，rule.inject，options.injectEvent
                            let _inject = eventInject || inject || this.options.injectEvent;
                            event[eventName] = is.Undef(_inject) ? fn : this.inject(rule, fn, _inject);
                        }
                    });
                }
            }

            ctx.computed[on ? "on" : "nativeOn"] = event;
            return event;
        },
    });
}
