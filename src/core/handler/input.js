import { extend } from "@/utils";
import is, { hasProperty } from "@/utils/type";
import { $set } from "@/utils/modify";
export default function useInput(Handle) {
    extend(Handle.prototype, {
        getValue(ctx) {
            if (is.Undef(ctx.cacheValue)) {
                ctx.cacheValue = ctx.parser.toValue(this.getFormData(ctx), ctx);
            }
            return ctx.cacheValue;
        },
        setValue(ctx, value, formValue, setFlag) {
            console.log("value值更新了");
            // this.setFormData(ctx, formValue);
        },
        getFormData(ctx) {
            return this.formData[ctx.id];
        },
        setFormData(ctx, formValue) {
            $set(this.formData, ctx.id, formValue);
        },
        // 对rule.value，this.form[]进行拦截，相当于双向数据绑定
        valueHandle(ctx) {
            return {
                enumerable: true,
                get: () => {
                    return this.getValue(ctx);
                },
                set: (value) => {
                    if (this.isChange(ctx, value)) {
                        this.setValue(ctx, value, ctx.parser.toFormValue(value, ctx), true);
                    }
                },
            };
        },
        // 判断rule.value是否发生改变
        isChange(ctx, value) {
            return JSON.stringify(ctx.rule.value, strFn) !== JSON.stringify(value, strFn);
        },
        /*
            表单控件value的初始值
            通过在form-create组件上绑定的value.sync优先级更高
            option.formData次之
            rule.value最低
        */
        appendValue(rule) {
            if (!rule.field || !hasProperty(this.appendData, rule.field)) return;
            rule.value = this.appendData[rule.field];
            delete this.appendData[rule.field];
        },
        /*
            重新对form-create上:value.sync绑定的属性进行设置
            通过valueHandle进行代理
            所以不论是修改了rule.value还是修改了:value.sync绑定的value初始值
            都会触发更新操作
        */
        syncForm() {
            toEmpty(this.form);
            Object.defineProperties(
                this.form,
                this.fields().reduce(
                    (initial, field) => {
                        const ctx = this.getFieldCtx(field);
                        const handle = this.valueHandle(ctx); //通过valueHandle进行代理
                        handle.configurable = true;
                        initial[field] = handle;
                        return initial;
                    },
                    /*
                        先对剩余appendData进行代理，都是在rules中没有定义对应的field控件
                        如果更新了，appendData重新赋为新值即可
                    */
                    Object.keys(this.appendData).reduce((initial, field) => {
                        initial[field] = {
                            enumerable: true,
                            configurable: true,
                            get: () => {
                                return this.appendData[field];
                            },
                            set: (val) => {
                                this.appendData[field] = val;
                            },
                        };
                        return initial;
                    }, {})
                )
            );

            this.syncValue(); 
        },
        //更新到form-create上:value.sync绑定的属性
        syncValue() {
            // this.vm._updateValue({ ...this.form }); //浅拷贝会丢失get，set方法
            this.vm._updateValue(this.form);
        },
        fields() {
            return Object.keys(this.fieldCtx);
        },
    });
}

function strFn(key, val) {
    return typeof val === "function" ? "" + val : val;
}

function toEmpty(obj) {
    Object.keys(obj).forEach((k) => delete obj[k]);
}
