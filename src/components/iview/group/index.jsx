import { hasProperty } from "@form-create/utils/type";

const NAME = "fcGroup";
const AddIcon = "md-add-circle";
const RemoveIcon = "md-remove-circle";
export default {
    name: NAME,
    props: {
        field: String, // 将子表单内的字段值，作为为数组组件双向绑定的值
        rule: [Array, Object],
        rules: Array,
        expand: [String, Number],
        option: Object,
        formCreateInject: {
            type: Object,
            required: true,
        },
        button: {
            type: Boolean,
            default: true,
        },
        value: {
            type: Array,
            default: () => [],
        },
        iconSize: {
            type: [String, Number],
            default: 24,
        },
        onBeforeRemove: {
            type: Function,
            default: () => {},
        },
        onBeforeAdd: {
            type: Function,
            default: () => {},
        },
        max: {
            type: [String, Number],
            default: 0,
        },
        min: {
            type: [String, Number],
            default: 0,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        syncDisabled: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            len: 0,
            cacheValue: {},
            cacheRule: {},
            type: undefined,
        };
    },
    computed: {
        formRule() {
            if (this.rule) {
                return Array.isArray(this.rule) ? this.rule : [this.rule];
            }
            if (this.rules) {
                return this.rules;
            }
            return [];
        },
    },
    watch: {
        disabled(n) {
            if (this.syncDisabled) {
                const lst = this.cacheRule;
                Object.keys(lst).forEach((k) => {
                    lst[k].$f.disabled(n);
                });
            }
        },
        expand(n) {
            let d = n - this.value.length;
            if (d > 0) {
                this.expandRule(d);
            }
        },
        value(n) {
            n = n || [];
            let keys = Object.keys(this.cacheRule),
                total = keys.length,
                len = total - n.length;

            //len < 0, 新数组长度比旧数组长度长
            if (len < 0) {
                // 扩张新增的部分
                for (let i = len; i < 0; i++) {
                    this.addRule(n.length + i);
                }
                // 重新更新旧的部分的值
                for (let i = 0; i < total; i++) {
                    this.setValue(keys[i], n[i]);
                }
            } else {
                //len > 0, 新数组长度比旧数组长度短
                if (len > 0) {
                    // 删除旧数组长的部分
                    for (let i = 0; i < len; i++) {
                        this.removeRule(keys[total - i - 1]);
                    }
                    this.subForm();

                    // 全部更新
                    n.forEach((val, i) => {
                        this.setValue(keys[i], n[i]);
                    });
                }
            }
        },
    },
    methods: {
        addRule(i, emit) {
            const rule = this.formCreateInject.form.deepCopy(this.formRule);
            const option = this.option
                ? { ...this.option }
                : {
                      submitBtn: false,
                      resetBtn: false,
                  };
            
            option.formData = this.field ? { [this.field]: this._value(this.value[i]) } : this.value[i] || {};
            this.$set(this.cacheRule, ++this.len, { rule, option });
            if (emit) {
                this.$nextTick(() => this.$emit("add", rule, Object.keys(this.cacheRule).length - 1));
            }
        },
        add(i) {
            if (this.disabled || false === this.onBeforeAdd(this.value)) {
                return;
            }
            this.addRule(i, true);
        },
        del(index, key) {
            if (this.disabled || false === this.onBeforeRemove(this.value, index)) {
                return;
            }
            this.removeRule(key, true);
            this.subForm();
            this.value.splice(index, 1);
            this.input(this.value);
        },
        // 拿到field指定字段的值
        _value(v) {
            return v && hasProperty(v, this.field) ? v[this.field] : v;
        },
        cache(k, value) {
            this.cacheValue[k] = JSON.stringify(value);
        },
        input(value) {
            this.$emit("input", value);
            this.$emit("change", value);
        },
        formData(key, formData) {
            const cacheRule = this.cacheRule;
            const keys = Object.keys(cacheRule);
            if (keys.filter((k) => cacheRule[k].$f).length !== keys.length) {
                return;
            }
            const value = keys.map((k) => {
                const data = key === k ? formData : { ...this.cacheRule[k].$f.form };
                const value = this.field ? data[this.field] || null : data;
                this.cache(k, value);
                return value;
            });
            this.input(value);
        },
        // 更新子表的formData
        setValue(key, value) {
            const field = this.field,
                $f = this.cacheRule[key].$f;
            if (field) {
                value = { [field]: this._value(value) };
            }
            if (this.cacheValue[key] === JSON.stringify(field ? value[field] : value)) {
                return;
            }
            this.cache(key, value);
            $f.coverValue(value || {});
        },
        // 子表单的emit事件
        emitEvent(name, args, index, key) {
            this.$emit(name, ...args, this.cacheRule[key].$f, index);
        },
        // 设置子表单的$f, 为api
        add$f(i, key, $f) {
            this.cacheRule[key].$f = $f;
            this.subForm();
            this.$nextTick(() => {
                if (this.syncDisabled) {
                    $f.disabled(this.disabled);
                }
                // 新增的子表单初始化完成后触发
                this.$emit("itemMounted", $f, Object.keys(this.cacheRule).indexOf(key));
            });
        },
        subForm() {
            this.formCreateInject.subForm(Object.keys(this.cacheRule).map((k) => this.cacheRule[k].$f));
        },
        removeRule(key, emit) {
            const index = Object.keys(this.cacheRule).indexOf(key);
            this.$delete(this.cacheRule, key);
            this.$delete(this.cacheValue, key);
            if (emit) {
                this.$nextTick(() => this.$emit("remove", index));
            }
        },
        addIcon(key) {
            return (
                <Icon
                    key={`a${key}`}
                    type={AddIcon}
                    size={this.iconSize}
                    style={`cursor:${this.disabled ? "not-allowed;color:#c9cdd4" : "pointer"};margin-right:6px;`}
                    on-click={this.add}
                />
            );
        },
        delIcon(index, key) {
            return (
                <Icon
                    key={`d${key}`}
                    type={RemoveIcon}
                    size={this.iconSize}
                    style={`cursor:${this.disabled ? "not-allowed;color:#c9cdd4" : "pointer"};`}
                    on-click={() => this.del(index, key)}
                />
            );
        },
        makeIcon(total, index, key) {
            // if (this.$scopedSlots.button) {
            //     return;
            // }
            if (index === 0) {
                return [
                    this.max !== 0 && total >= this.max ? null : this.addIcon(key),
                    this.min === 0 || total > this.min ? this.delIcon(index, key) : null,
                ];
            }
            // 大于最小个数，才显示删除按钮
            if (index >= this.min) {
                return this.delIcon(index, key);
            }
        },
        // 默认展开几项
        expandRule(n) {
            for (let i = 0; i < n; i++) {
                this.value.push(this.field ? null : {});
            }
        },
    },
    created() {
        this.type = this.formCreateInject.form.$form();
        const d = (this.expand || 0) - this.value.length;
        if (d > 0) {
            this.expandRule(d);
        }
        for (let i = 0; i < this.value.length; i++) {
            this.addRule(i);
        }
    },
    render() {
        const keys = Object.keys(this.cacheRule);
        const button = this.button;
        const Type = this.type;
        if (keys.length === 0) {
            return (
                <Icon
                    key={"a_def"}
                    type={AddIcon}
                    size={this.iconSize}
                    style={`vertical-align:middle;cursor:${this.disabled ? "not-allowed;color:#c9cdd4" : "pointer"};`}
                    on-click={this.add}
                />
            );
        } else {
            return (
                <div key={"con"}>
                    {keys.map((key, index) => {
                        const { rule, option } = this.cacheRule[key];
                        return (
                            <Row type="flex" align="middle" key={key} style="border-bottom:1px dashed #dcdee2;margin-bottom:10px;">
                                <Col span={button ? 20 : 24}>
                                    <Type
                                        key={key}
                                        on={{
                                            input: (formData) => this.formData(key, formData),
                                            "emit-event": (name, ...args) => this.emitEvent(name, args, index, key),
                                            "update:api": ($f) => this.add$f(index, key, $f),
                                        }}
                                        rule={rule}
                                        option={option}
                                        extendOption={true}
                                    ></Type>
                                </Col>
                                {button ? (
                                    <Col span={2} pull={1} push={1}>
                                        {this.makeIcon(keys.length, index, key)}
                                    </Col>
                                ) : null}
                            </Row>
                        );
                    })}
                </div>
            );
        }
    },
};
