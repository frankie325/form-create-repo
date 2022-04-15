import { getRule, enumerable, byCtx, invoke } from "../frame/utils";
import RuleContext from "../factory/context";
import { baseRule } from "../factory/creator";

import { extend, deepCopy } from "@/utils";
import is, { hasProperty } from "@/utils/type";
import { $set } from "@/utils/modify";
import { err } from "@/utils/console";
// import Vue from "vue";

export default function useLoader(Handle) {
    extend(Handle.prototype, {
        nextRefresh(fn) {
            const id = this.loadedId;
            this.vm.$nextTick(() => {
                // 如果还是相等，说明在这之前form-create还没重新渲染
                if (id === this.loadedId) {
                    fn ? fn() : this.refresh();
                }
            });
        },
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

            this.loadFn(rule);

            return rule;
        },
        loadFn(rule) {
            ["on", "props", "nativeOn"].forEach((k) => {
                rule[k] && this.parseInjectEvent(rule, rule[k]);
            });
        },
        /*
            新增rule需要，通过control配置控制新增rule，都需要重新loadRule
            删除rule则不需要
        */
        loadRule() {
            this.cycleLoad = false;
            this.loading = true;
            this.bus.$emit("load-start");

            this.deferSyncValue(() => {
                this._loadRule(this.rules);
                this.loading = false;
                if (this.cycleLoad) {
                    //成功加载control规则时，cycleLoad为true，重新执行loadRule
                    //control规则触发load-start，将control内的规则添加到rules中
                    return this.loadRule();
                }

                this.bus.$emit("load-end");
                this.vm._renderRule();
                this.$render.initOrgChildren();
                this.syncForm();
            });
        },
        _loadRule(rules, parent) {
            const preIndex = (i) => {
                let pre = rules[i - 1];
                if (!pre || !pre.__fc__) {
                    // rule可能不是对象的情况
                    return i > 0 ? preIndex(i - 1) : -1;
                }

                let index = this.sort.indexOf(pre.__fc__.id);
                return index;
                // return index > -1 ? index : preIndex(i - 1);
            };

            const loadChildren = (children, parent) => {
                if (is.trueArray(children)) {
                    this._loadRule(children, parent);
                }
            };
            // console.log(rules);
            rules.map((_rule, index) => {
                if (parent && (is.String(_rule) || is.Undef(_rule))) return;
                // if (!is.Object(_rule)) return err("rule 必须为对象或由maker创建", _rule);

                if (!is.Object(_rule) || !getRule(_rule).type) return err("未定义 rule.type 字段", _rule);

                this.checkCol(_rule, parent);

                // 一般通过api进行新增，重新loadRule，大部分rule都是有__fc__缓存的，可以重复利用，减少开销
                if (_rule.__fc__ && _rule.__fc__.root === rules && this.ctxs[_rule.__fc__.id]) {
                    loadChildren(_rule.__fc__.rule.children, _rule.__fc__);
                    return _rule.__fc__;
                }

                let rule = getRule(_rule);

                const isRepeat = () => {
                    return !!(rule.field && this.fieldCtx[rule.field] && this.fieldCtx[rule.field][0] !== _rule.__fc__);
                };

                this.ruleEffect(rule, "init", { repeat: isRepeat() });

                let ctx;
                let isCopy = false;
                let isExited = !!_rule.__fc__; //是否已经创建过ctx实例
                if (isExited) {
                    ctx = _rule.__fc__;
                    // debugger
                    const check = ctx.check(this);
                    // 当rule.value值符合control配置时，拿到之前的ctx
                    if (ctx.deleted) {
                        if (!check) {
                            if (isCtrl(ctx)) {
                                return;
                            }
                            ctx.update(this);
                        }
                    } else {
                        // 从别的form-create实例复制过来的，进行clone
                        if (!check) {
                            if (isCtrl(ctx)) {
                                return;
                            }
                            rules[index] = _rule = _rule._clone ? _rule._clone() : deepCopy(_rule);
                            ctx = null;
                            isCopy = true;
                        }
                    }
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
                // 处理rule.emit | rule.nativeEmit
                [true, false].forEach((b) => this.parseEmit(ctx, b));

                // 处理rule.request
                this.parseRequest(ctx);

                ctx.parent = parent;
                ctx.root = rules;
                this.setCtx(ctx);

                !isCopy && !isExited && this.effect(ctx, "load");

                //处理rule.children
                ctx.parser.loadChildren === false || loadChildren(ctx.rule.children, ctx);

                // 因为control配置的存在，存储在sort中的id，不能简单的push进去
                // 而需要找到前一个rule在sort中的位置，根据前一个的位置进行插入
                if (!parent) {
                    const _preIndex = preIndex(index);
                    if (_preIndex > -1) {
                        this.sort.splice(_preIndex + 1, 0, ctx.id);
                    } else {
                        this.sort.push(ctx.id);
                    }
                }
                const r = ctx.rule;

                if (!ctx.updated) {
                    ctx.updated = true;

                    this.effect(ctx, "loaded");
                }
                // debugger
                if (ctx.input) Object.defineProperty(r, "value", this.valueHandle(ctx));
                if (this.refreshControl(ctx)) this.cycleLoad = true;
                return ctx;
            });
        },
        // 当发生新增，删除rules操作时，重新处理rules
        reloadRule(rules) {
            return this._reloadRule(rules);
        },
        /*
          调用api.reloadRule或者顶层rules变化才需要执行_reloadRule
          rule.children内变化则执行loadChildren
        */
        _reloadRule(rules) {
            // debugger
            if (!rules) rules = this.rules;
            // if (!rules.__ob__) Vue.observable(rules);
            // 旧的ctxs
            const ctxs = { ...this.ctxs };
            this.$render.clearOrgChildren();
            this.initData(rules);
            this.initAppendData();
            this.fc.rules = rules;

            this.bus.$once("load-end", () => {
                // loadRule结束后，旧的ctx实例在新的中找不到了，说明该rule已经被删除了，执行rmCtx
                Object.keys(ctxs)
                    .filter((id) => this.ctxs[id] === undefined)
                    .forEach((id) => this.rmCtx(ctxs[id]));
                this.$render.clearCacheAll();
            });

            this.reloading = true;
            this.loadRule();
            this.reloading = false;
            this.refresh();

            // form-create的updated钩子执行后，触发reload方法
            this.bus.$off("next-tick", this.nextReload);
            this.bus.$once("next-tick", this.nextReload);
            this.vm.$emit("update", this.api);
        },
        //往rule.children新增rule时调用loadChildren，删除不会
        loadChildren(children, parent) {
            // debugger;
            this.cycleLoad = false;
            this.loading = true;
            // this.bus.$emit('load-start');
            this._loadRule(children, parent);
            this.loading = false;
            if (this.cycleLoad) {
                // 当children中存在，control配置时
                return this.loadRule();
            } else {
                this.bus.$emit("load-end");
                this.syncForm();
            }

            // 删除rule.children时需要清除缓存
            this.$render.clearCache(parent);
        },
        // 操作unique，实现form-create重新执行render过程
        refresh() {
            this.vm._refresh();
        },
        refreshControl(ctx) {
            return ctx.input && ctx.rule.control && this.useCtrl(ctx);
        },
        /*
        当使用了control配置时
        loadRule执行完，cycleLoad为true
        再次执行loadRule，触发load-start
        通过api对rules进行操作
        */
        useCtrl(ctx) {
            // debugger
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
                    ctrl: findCtrl(ctx, control.rule),
                    isHidden: is.String(control.rule[0]),
                };
                // reloadRule时，防止重复添加control
                // 或者valid校验不通过时，会删除该rule，触发监听rule的Watcher更新，
                // 再次调用loadRule，此时ctrl已经移除了，所以直接跳过
                if ((data.valid && data.ctrl) || (!data.valid && !data.ctrl)) continue;
                validate.push(data);
            }
            if (!validate.length) return false;

            let flag = false;
            this.deferSyncValue(() => {
                validate.forEach(({ valid, isHidden, rule, prepend, append, child, ctrl }) => {
                    if (isHidden) {
                        if (valid) {
                            ctx.ctrlRule.push({
                                __ctrl: true,
                                children: rule,
                                valid,
                            });
                        } else {
                            ctx.ctrlRule.splice(ctx.ctrlRule.indexOf(ctrl), 1);
                        }

                        this.vm.$nextTick(() => {
                            // 第一次加载时，指定的字段如果在后面，那么对应的rule还没进行处理
                            // 所以应该使用异步，等待rules都处理完了，再进行隐藏
                            this.api.hidden(!valid, rule);
                        });
                        return;
                    }
                    if (valid) {
                        flag = true;
                        const ruleCon = {
                            type: "fcFragment",
                            native: true,
                            __ctrl: true,
                            children: rule,
                        };
                        ctx.ctrlRule.push(ruleCon);
                        // 调用load-start操作api进行rule的增加
                        this.bus.$once("load-start", () => {
                            if (prepend) {
                                api.prepend(ruleCon, prepend || ctx.id, child);
                            } else if (append || child) {
                                api.append(ruleCon, append || ctx.id, child);
                            } else {
                                ctx.root.splice(ctx.root.indexOf(ctx.origin) + 1, 0, ruleCon);
                            }
                        });
                    } else {
                        ctx.ctrlRule.splice(ctx.ctrlRule.indexOf(ctrl), 1);
                        // debugger
                        const ctrlCtx = byCtx(ctrl);
                        ctrlCtx && ctrlCtx.rm();
                    }
                });
            });
            this.vm.$emit("control", ctx.origin, this.api);
            this.effect(ctx, "control");
            return flag;
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

function findCtrl(ctx, rule) {
    for (let i = 0; i < ctx.ctrlRule.length; i++) {
        const ctrl = ctx.ctrlRule[i];
        if (ctrl.children === rule) return ctrl;
    }
}
// 填充一些属性默认值，并做响应式处理
function fullRule(rule) {
    const def = baseRule();

    Object.keys(def).forEach((key) => {
        if (!hasProperty(rule, key)) $set(rule, key, def[key]);
    });

    return rule;
}

// 是否是control生成的fragment的rule
function isCtrl(ctx) {
    return !!ctx.rule.__ctrl;
}
