import Vue from "vue";
import { extend, toLine, is } from "@/utils";

function parseProp(prop) {
    if (is.String(prop)) return { domProps: { innerHTML: prop } };
    return prop;
}

export default function createNodeFactory() {
    const aliasMap = {};

    function CreateNode(vm) {
        vm && this.setVm(vm);
    }

    extend(CreateNode.prototype, {
        setVm(vm) {
            this.vm = vm;
            this.$h = vm.$createElement;
        },
        make(tag, data, children) {
            // 如果是保留标签，则删除data.nativeOn
            if (Vue.config.isReservedTag(tag) && data.nativeOn) delete data.nativeOn;
            let Node = this.$h(tag, parseProp(data), children || []);
            // Node.context = this.vm; // 会修改自定义函数式组件渲染出来的根VNode的context，可能造成插槽渲染不正确
            return Node;
        },
        aliasMap,
    });

    extend(CreateNode, {
        aliasMap,
        // 创建rule.type和真实组件名称的映射
        alias(key, name) {
            aliasMap[key] = name;
        },
        // 在CreateNode原型上生成创建表单控件VNode的原型方法
        use(nodes) {
            Object.keys(nodes).forEach((k) => {
                const line = toLine(k);
                const lower = k.toLocaleLowerCase();
                const v = nodes[k];

                CreateNode.alias(k, v);
                [k, line, lower].forEach((n) => {
                    CreateNode.prototype[n] = function (data, children) {
                        return this.make(v, data, children);
                    };
                });
            });
        },
    });

    return CreateNode;
}
