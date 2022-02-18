import { extend, unique, toCase } from "@/utils";
import { enumerable } from "../frame/utils";
function bind(ctx) {
    // 为rule或者maker实例添加__fc__属性，为ctx实例
    Object.defineProperties(ctx.origin, {
        __fc__: enumerable(ctx, true),
    });
}

export default function RuleContext(handle, rule) {
    const id = unique();
    extend(this, {
        id,
        key: "",
        ref: id,
        wrapRef: id + "fi",
        field: rule.field || undefined,
        rule,
        origin: rule.__origin__ || rule,
        name: rule.name,
        input: !!rule.field, //是否存在rule.field字段
        originType: "",
        type: "",
        watch: [], //存储取消监听的方法
        parser: undefined,
        parent: undefined, //父级rule配置
        root: undefined, //同一层级的rules配置
        cacheValue: undefined,
    });
    this.updateType();
    this.updateKey();
    bind(this);
    this.update(handle);
}

extend(RuleContext.prototype, {
    update(handle) {
        extend(this, {
            $handle: handle,
            $render: handle.$render,
            vm: handle.vm,
            trueType: handle.getType(this.originType), //rule.type对应的组件名称
        });
        this.watchTo();
    },
    updateType() {
        this.originType = this.rule.type;
        this.type = toCase(this.rule.type);
    },
    updateKey() {
        this.key = unique();
    },
    watchTo() {
        this.$handle.watchCtx(this);
    },
    setParser(parser) {
        this.parser = parser;
        parser.init();
    },
});
