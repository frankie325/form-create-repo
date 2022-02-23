import { getRule, enumerable } from "../frame/utils";
import RuleContext from "../factory/context";
import { baseRule } from "../factory/creator";

import { extend } from "@/utils";
import is, { hasProperty } from "@/utils/type";
import { err } from "@/utils/console";
export default function useLoader(Handle) {
    extend(Handle.prototype, {
        // 处理rule中的一些属性
        parseRule(_rule) {
            const rule = getRule(_rule);
            /*
                对于maker创建的rule，creator._data.__origin__指向creator实例
                对于普通的rule，rule.__origin__则指向自己
            */
            Object.defineProperties(rule, {
                __origin__: enumerable(_rule, true),
            });

            fullRule(rule);
            this.appendValue(rule);

            rule.options = Array.isArray(rule.options) ? rule.options : [];

            return rule;
        },
        loadRule() {
            this.loading = false;
            this._loadRule(this.rules);
            this.loading = true;
            this.vm._renderRule();
            this.$render.initOrgChildren();
            this.syncForm();
        },
        _loadRule(rules, parent) {
            const loadChildren = (children, parent) => {
                if (is.trueArray(children)) {
                    this._loadRule(children, parent);
                }
            };
            // console.log(rules);
            rules.map((_rule, index) => {
                if (!is.Object(_rule)) return err("rule 必须为对象或由maker创建", _rule);

                if (!getRule(_rule).type) return err("未定义 rule.type 字段", _rule);

                let rule = getRule(_rule);

                let ctx;

                if (!ctx) {
                    ctx = new RuleContext(this, this.parseRule(_rule));
                    this.bindParser(ctx);
                } else {
                    // 当rule.type改变时，进行更新
                    if (ctx.originType !== ctx.rule.type) {
                        ctx.updateType();
                        this.bindParser();
                    }
                    this.appendValue(ctx.rule);
                }

                ctx.parent = parent;
                ctx.root = rules;
                this.setCtx(ctx);
                //处理rule.children
                ctx.parser.loadChildren === false || loadChildren(ctx.rule.children, ctx);

                if (!parent) {
                    this.sort.push(ctx.id);
                }
                const r = ctx.rule;
                if (ctx.input) Object.defineProperty(r, "value", this.valueHandle(ctx));
            });
        },
    });
}

// 填充一些默认的属性
function fullRule(rule) {
    const def = baseRule();

    Object.keys(def).forEach((key) => {
        if (!hasProperty(rule, key)) rule[key] = def[key];
    });

    return rule;
}
