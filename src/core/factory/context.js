import { extend, unique, toCase, deepCopy } from "@/utils";
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
        wrapRef: id + "fi", //FormItem的ref
        field: rule.field || undefined,
        rule,
        prop: undefined,
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
        cacheConfig: undefined, //缓存option.global中的配置
        ctrlRule: [],
        deleted: false,
        defaultValue: deepCopy(rule.value),
    });
    this.updateType();
    this.updateKey();
    bind(this);
    this.update(handle);
}

extend(RuleContext.prototype, {
    // 初始化和rule删除后又被重新添加时调用
    update(handle, init) {
        extend(this, {
            deleted: false,
            $handle: handle,
            $render: handle.$render,
            $api: handle.api,
            vm: handle.vm,
            trueType: handle.getType(this.originType), //rule.type对应的组件名称
            vNode: handle.$render.vNode,
            updated: false,
        });
        !init && this.unwatch();
        this.watchTo(); //监听
    },
    updateType() {
        this.originType = this.rule.type;
        this.type = toCase(this.rule.type);
    },
    updateKey() {
        this.key = unique();
    },
    check(handle) {
        return this.vm === handle.vm;
    },
    watchTo() {
        this.$handle.watchCtx(this);
    },
    unwatch() {
        this.watch.forEach((un) => un());
        this.watch = [];
    },
    setParser(parser) {
        this.parser = parser;
        parser.init();
    },
    //重新合并rule，比如重新注入参数后的事件
    initProp() {
        const rule = { ...this.rule };
        delete rule.children;
        this.prop = rule;
    },
    delete() {
        const undef = void 0;
        this.unwatch();
        extend(this, {
            deleted: true,
            prop: { ...this.rule },
            el: undef,
            $handle: undef,
            $render: undef,
            $render: undef,
            $api: undef,
            vm: undef,
            vNode: undef,
            parent: null,
            cacheConfig: null,
        });
    },
    // 删除该rule.control中的rule项
    rmCtrl() {
        this.ctrlRule.forEach((ctrl) => {
            ctrl.__fc__ && ctrl.__fc__.rm();
        });
        this.ctrlRule = [];
    },
    rm() {
        // 该方法用来移除rule所在的位置
        const _rm = () => {
            let index = this.root.indexOf(this.origin);
            if (index > -1) {
                this.root.splice(index, 1);
                this.$handle && this.$handle.refresh();
            }
        };

        // 使用api刪除rule.children，使用noWatch方法，不用触发监听children的同步watcher
        // 调用refresh重新渲染即可
        this.$handle.noWatch(() => {
            this.$handle.deferSyncValue(() => {
                this.rmCtrl();
                _rm();
                this.$handle.rmCtx(this);
                extend(this, {
                    root: [],
                });
            }, this.input);
        });
    },
});
