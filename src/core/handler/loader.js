import { getRule, enumerable, invoke } from "../frame/utils";
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

                this.checkCol(_rule, parent);

                let rule = getRule(_rule);

                // 当发生新增，删除rules操作时，肯定会存在之前的rule项
                let ctx;
                let isExited = !!_rule.__fc__; //是否已经创建过ctx实例
                if (isExited) {
                    ctx = _rule.__fc__;
                }
                if (!ctx) {
                    ctx = new RuleContext(this, this.parseRule(_rule));
                    this.bindParser(ctx);
                } else {
                    // 当rule.type改变时，进行更新
                    if (ctx.originType !== ctx.rule.type) {
                        ctx.updateType();
                        this.bindParser(ctx);
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
                this.refreshControl(ctx);
                return ctx;
            });
        },
        // 当发生新增，删除rules操作时，重新处理rules
        reloadRule(rules) {
            return this._reloadRule(rules);
        },
        _reloadRule(rules) {
            if (!rules) rules = this.rules;
            const ctxs = { ...this.ctxs };
            this.$render.clearOrgChildren();
            this.initData(rules);
            this.fc.rules = rules;

            // this.bus.$once("load-end", () => {

            // });
            this.reloading = true;
            this.loadRule();
            this.reloading = false;
            this.refresh();
            console.log(this);
            this.vm.$emit("update", this.api);
        },
        // 操作unique，实现form-create重新执行render过程
        refresh() {
            this.vm._refresh();
        },
        refreshControl(ctx) {
            return ctx.input && ctx.rule.control && this.useCtrl(ctx);
        },
        useCtrl(ctx) {
            // console.log(ctx);
            const controls = getCtrl(ctx),
                validate = [],
                api = this.api;
            if (!controls.length) return false;

            for (let i = 0; i < controls.length; i++) {
                const control = controls[i],
                    handleFn = control.handle || ((val) => val === control.value);
                if (!is.trueArray(control.rule)) continue;
                const data = {
                    ...control,
                    valid: invoke(() => handleFn(ctx.rule.value, api)),
                    // ctrl:
                };
                if (!data.valid) continue;
                validate.push(data);
            }
            if (!validate.length) return false;
            let flag = false;
            

        },
        checkCol(_rule, parent) {
            let rule = getRule(_rule);
            if (rule.col) {
                if (!parent || (parent.rule && parent.rule.type !== "row")) {
                    delete rule.col;
                    err("如果存在 rule.col 字段，则该rule必须包裹在Row组件中", _rule);
                }
            }
        },
    });
}

function getCtrl(ctx) {
    const control = ctx.rule.control || [];
    if (is.Object(control)) return [control];
    else return control;
}

// 填充一些默认的属性
function fullRule(rule) {
    const def = baseRule();

    Object.keys(def).forEach((key) => {
        if (!hasProperty(rule, key)) rule[key] = def[key];
    });

    return rule;
}
