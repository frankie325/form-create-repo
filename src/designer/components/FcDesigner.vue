<template>
    <Layout class="fc-center">
        <Sider :width="270" class="fc-side-l" hide-trigger>
            <template v-for="(item, index) in menuList">
                <div class="fc-group" :key="index">
                    <h4 class="fc-group-title">{{ item.title }}</h4>
                    <draggable :list="item.list" :group="{ name: 'default', pull: 'clone', put: false }" :sort="false">
                        <div class="fc-group-item" v-for="(data, index) in item.list" :key="index">
                            <div class="fc-group-item-icon">
                                <Icon v-if="!data.customIcon" :type="data.icon" size="20" />
                                <Icon v-else :custom="`iconfont ${data.icon}`" size="20" />
                            </div>
                            <div class="fc-group-item-name">{{ data.label }}</div>
                        </div>
                    </draggable>
                </div>
            </template>
        </Sider>
        <Content class="fc-m">
            <div class="fc-m-tool">
                <Button type="primary" icon="md-eye" shape="circle" size="small" style="width: 80px; margin-right: 8px" @click="previewFc"
                    >预览</Button
                >
                <Button type="error" icon="md-trash" shape="circle" size="small" style="width: 80px" @click="clearDragRule">清空</Button>
            </div>
            <div class="fc-m-drag-wrap">
                <div class="fc-m-drag">
                    <FormCreate :rule="dragForm.rule" :api.sync="dragForm.api" :option="form.value"></FormCreate>
                </div>
            </div>
        </Content>
        <Sider :width="320" class="fc-side-r" hide-trigger>
            <Tabs v-model="activeTab">
                <TabPane label="表单配置" name="form">
                    <FormCreate :rule="form.rule" :option="form.option" v-model="form.value.form"></FormCreate>
                </TabPane>
                <TabPane label="组件配置" name="props">
                    <Divider v-if="showBaseRule" size="small">基础配置</Divider>
                    <FormCreate
                        v-show="showBaseRule"
                        :rule="baseForm.rule"
                        :api.sync="baseForm.api"
                        :option="baseForm.option"
                        v-model="baseForm.value"
                        @change="baseChange"
                    ></FormCreate>
                    <Divider v-if="activeProps" size="small">属性配置</Divider>
                    <FormCreate
                        v-show="activeProps"
                        :rule="propsForm.rule"
                        :api.sync="propsForm.api"
                        :option="propsForm.option"
                        v-model="propsForm.value"
                        @change="propsChange"
                        @removeField="propsRemoveFiled"
                    ></FormCreate>
                    <Divider v-if="showBaseRule" size="small">校验规则</Divider>
                    <FormCreate
                        v-show="showBaseRule"
                        :rule="validateForm.rule"
                        :api.sync="validateForm.api"
                        :option="validateForm.option"
                        v-model="validateForm.value"
                        @change="validateChange"
                    ></FormCreate>
                </TabPane>
            </Tabs>
        </Sider>
        <Modal v-model="preview.state" :width="1000" title="预览" :footer-hide="true">
            <FormCreate v-if="preview.state" :rule="preview.rule" :option="preview.option"></FormCreate>
        </Modal>
    </Layout>
</template>

<script>
import draggable from "vuedraggable";
import createMenu from "../config/menu";
import ruleList from "../config/rule";
import form from "../config/base/form";
import field from "../config/base/field";
import validate from "../config/base/validate";

import { is, deepCopy, parseJson } from "@form-create/utils";
import { setMessage } from "./Validate";

export default {
    name: "FcDesigner",
    components: {
        draggable,
    },
    provide() {
        return {
            fcx: {
                active: null,
            },
            designer: this,
        };
    },
    watch: {
        "preview.state": function (n) {
            if (!n) {
                this.preview.rule = [];
                this.preview.option = {};
            }
        },
    },
    data() {
        const children = [];
        return {
            menuList: createMenu(),
            activeTab: "form",
            activeProps: false,
            preview: {
                state: false,
                rule: [],
                options: {},
            },
            dragForm: {
                rule: this.makeDragRule(children),
                api: {},
            },
            form: {
                rule: form(),
                option: {
                    form: {
                        labelPosition: "top",
                        size: "small",
                        labelWidth: null,
                    },
                    submitBtn: false,
                },
                value: {
                    form: {
                        name: "",
                        // inline: false,
                        size: "default",
                        labelWidth: 120,
                        labelPosition: "right",
                        labelColon: false,
                        showMessage: true,
                        hideRequiredMark: false,
                        disabled: false,
                    },
                    submitBtn: false,
                },
            },
            baseForm: {
                rule: field(),
                api: {},
                option: {
                    form: {
                        labelPosition: "top",
                        size: "small",
                        labelWidth: null,
                    },
                    submitBtn: false,
                },
                value: {},
            },
            propsForm: {
                rule: [],
                api: {},
                option: {
                    form: {
                        labelPosition: "top",
                        size: "small",
                        labelWidth: null,
                    },
                    submitBtn: false,
                },
                value: {},
            },
            validateForm: {
                rule: validate(),
                api: {},
                option: {
                    form: {
                        labelPosition: "top",
                        size: "small",
                        labelWidth: null,
                    },
                    submitBtn: false,
                },
                value: {},
            },
            showBaseRule: false,
            moveRule: null,
            addRule: null,
            added: null,
            activeRule: {},
        };
    },
    methods: {
        // 添加左侧菜单
        addMenu(config) {
            if (!config.name || !config.list) {
                return;
            }
            let flag = true;
            this.menuList.forEach((menu, i) => {
                if (menu.name === config.name) {
                    this.$set(this.menuList, i, config);
                    flag = false;
                }
            });
            if (flag) {
                this.menuList.push(config);
            }
        },
        // 移除左侧菜单
        removeMenu(name) {
            this.menuList.forEach((menu, i) => {
                if (menu.name === name) {
                    this.menuList.splice(i, 1);
                }
            });
        },
        // 设置左侧菜单的list
        setMenuItem(name, list) {
            this.menuList.forEach((menu, i) => {
                if (menu.name === name) {
                    menu.list = list;
                }
            });
        },
        // 添加一个组件菜单到左侧菜单的list
        appendMenuItem(name, item) {
            this.menuList.forEach((menu) => {
                if (name === menu.name) {
                    menu.list.push(item);
                }
            });
        },
        // 移除左侧菜单list中的一个组件菜单
        removeMenuItem(item) {
            this.menuList.forEach((menu) => {
                if (is.String(item)) {
                    menu.list.forEach((l, i) => {
                        if (l.name === item) {
                            menu.list.splice(i, 1);
                        }
                    });
                } else {
                    let idx;
                    if ((idx = menu.list.indexOf(item) > -1)) {
                        menu.list.splice(idx, 1);
                    }
                }
            });
        },
        // 添加自定义组件
        addComponent(data) {
            if (Array.isArray(data)) {
                data.forEach((v) => {
                    ruleList[v.name] = v;
                });
            } else {
                ruleList[data.name] = data;
            }
        },
        getOption() {
            const option = deepCopy(this.form.value);
            delete option.submitBtn;
            return option;
        },
        setOption(option) {
            const _o = option;
            _o.submitBtn = false;
            // delete _o.resetBtn;
            this.form.value = _o;
        },
        getRule() {
            return this.parseRule(deepCopy(this.dragForm.api.rule[0].children));
        },
        // 去除DragTool、DragBox的规则
        parseRule(children) {
            return [...children].reduce((initial, rule) => {
                if (is.String(rule)) {
                    initial.push(initial);
                    return;
                } else if (rule.type === "DragBox") {
                    initial.push(...this.parseRule(rule.children));
                    return initial;
                } else if (rule.type === "DragTool") {
                    rule = rule.children[0];
                    if (rule.type === "DragBox") {
                        initial.push(...this.parseRule(rule.children));
                        return initial;
                    }
                }

                if (!rule) return initial;
                rule = { ...rule };
                if (rule.children.length) {
                    rule.children = this.parseRule(rule.children);
                }

                if (rule.config) {
                    // 折叠面板内部组件需要设置slot为“content”
                    if (rule.type === "panel") {
                        rule.children.forEach((c) => {
                            c.slot = rule.config.config.slot;
                        });
                    }

                    delete rule.config.config;
                }

                if (rule.effect) {
                    delete rule.effect._fc;
                    delete rule.effect._name;
                }

                if (rule._control) {
                    rule.control = rule._control;
                    delete rule._control;
                }

                // 删除空对象和空数组
                Object.keys(rule)
                    .filter((k) => (Array.isArray(rule[k]) && rule[k].length === 0) || (is.Object(rule[k]) && Object.keys(rule[k]).length === 0))
                    .forEach((k) => delete rule[k]);

                initial.push(rule);
                return initial;
            }, []);
        },
        setRule(rules) {
            const children = this.loadRule(is.String(rules) ? parseJson(rules) : rules);
            this.clearActive();
            // debugger;
            // let rule = this.makeDragRule(children);
            this.dragForm.rule = this.makeDragRule(children);
        },
        loadRule(rules) {
            const loadRule = [];
            rules.forEach((rule) => {
                if (is.String(rule)) {
                    return loadRule.push(rule);
                }

                const config = ruleList[rule.type];
                const _children = rule.children;
                rule.children = [];

                if (rule.control) {
                    rule._control = rule.control;
                    delete rule.control;
                }

                if (config) {
                    // 导入JSON时，删除掉panel的slot属性
                    if (rule.type === "panel") {
                        _children.forEach((c) => {
                            c.slot && delete c.slot;
                        });
                    }
                    // DragTool或DragBox进行包裹
                    rule = this.makeRule(config, rule);

                    if (_children) {
                        let children = rule.children[0].children; //拿到DragTool内的rule.children

                        // col内的rule会有DragTool和DragBox
                        if (config.drag) {
                            children = children[0].children;
                        }
                        children.push(...this.loadRule(_children));
                    }
                } else if (_children) {
                    rule.children = this.loadRule(_children);
                }
                loadRule.push(rule);
            });
            return loadRule;
        },
        previewFc() {
            this.preview.state = true;
            this.preview.rule = this.getRule();
            this.preview.option = this.getOption();
        },
        clearDragRule() {
            this.setRule([]);
        },
        makeDragRule(children) {
            return [
                this.makeDrag(true, "draggable", children, {
                    start: (inject, evt) => this.dragStart(children, evt),
                    unchoose: (inject, evt) => this.dragUnChoose(children, evt),
                    add: (inject, evt) => this.dragAdd(children, evt),
                    end: (inject, evt) => this.dragEnd(children, evt),
                }),
            ];
        },
        // 创建DragBox的规则
        makeDrag(group, tag, children, on) {
            return {
                type: "DragBox",
                wrap: {
                    show: false,
                },
                inject: true,
                props: {
                    rule: {
                        attrs: {
                            tag: "div",
                            group: group === true ? "default" : group,
                            ghostClass: "ghost",
                            animation: 150,
                            handle: ".fc-drag-btn",
                            direction: "vertical",
                        },
                        class: "draggable-box",
                    },
                    tag,
                },
                children,
                on,
            };
        },
        /*
        拖动DragBox内元素时
        触发顺序如下     触发事件的元素
        dragStart         from
        dragUnChoose      from
        dragAdd            to
        dragEnd           from
        */
        dragStart(children, evt) {
            // console.log("-------dragStart-----", children, evt);
            this.moveRule = children;
            this.added = false;
        },
        dragUnChoose(children, evt) {
            // console.log("-------dragUnChoose-----", children, evt);
            this.addRule = {
                children,
                oldIndex: evt.oldIndex,
            };
        },
        dragAdd(children, evt) {
            // console.log("-------dragAdd-----", children, evt);
            const newIndex = evt.newIndex;
            const menu = evt.item._underlying_vm_;
            if (!menu) {
                // DragBox内元素相互拖拽时
                if (this.addRule) {
                    const rule = this.addRule.children.splice(this.addRule.oldIndex, 1);
                    children.splice(newIndex, 0, rule[0]);
                }
            } else {
                // 从左侧拖拽组件新增时
                const rule = this.makeRule(ruleList[menu.name]);
                children.splice(newIndex, 0, rule);
            }
            this.added = true;
        },
        dragEnd(children, evt) {
            // console.log("-------dragEnd-----", children, evt);
            const newIndex = evt.newIndex;
            const oldIndex = evt.oldIndex;
            // debugger
            // console.log(this.moveRule === children);
            //DragBox内元素的移动需要进行更新
            if (!this.added && newIndex !== oldIndex) {
                const rule = this.moveRule.splice(oldIndex, 1);
                children.splice(newIndex, 0, rule[0]);
            }
            this.moveRule = null;
            this.addRule = null;
            this.added = null;
        },
        // 生成组件规则
        makeRule(config, _rule) {
            const rule = _rule || config.rule();
            rule.config = { config };

            if (!rule.effect) rule.effect = {};
            rule.effect._fc = true;

            let drag;
            // 布局组件col内可继续拖拽
            if (config.drag) {
                const children = [];
                rule.children.push(
                    (drag = this.makeDrag(config.drag, rule.type, children, {
                        start: (inject, evt) => this.dragStart(inject.self.children, evt),
                        unchoose: (inject, evt) => this.dragUnChoose(inject.self.children, evt),
                        add: (inject, evt) => this.dragAdd(inject.self.children, evt),
                        end: (inject, evt) => this.dragEnd(inject.self.children, evt),
                    }))
                );
            }

            if (config.children && !_rule) {
                // !_rule表示导入JSON时，row不需要进入该条件
                const child = this.makeRule(ruleList[config.children]);
                (drag || rule).children.push(child);
            }

            if (config.inside) {
                rule.children = [
                    {
                        type: "DragTool",
                        props: {
                            dragBtn: config.dragBtn !== false,
                            children: config.children,
                        },
                        slot: config.slot,
                        inject: true,
                        on: {
                            delete: ({ self }) => {
                                // console.log(inject);
                                this.getParent(self).parent.__fc__.rm();
                                this.clearActive();
                            },
                            add: ({ self }) => {
                                const top = this.getParent(self);
                                top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, this.makeRule(top.parent.config.config));
                            },
                            // addChild: ({ self }) => {
                            //     console.log(self);
                            //     const top = this.getParent(self);
                            //     const config = top.parent.config.config;
                            //     const item = ruleList[config.children];
                            //     if (!item) return;
                            // },
                            copy: ({ self }) => {
                                const top = this.getParent(self);

                                top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, deepCopy(top.parent));
                            },
                            active: ({ self }) => {
                                this.toolActive(this.getParent(self).parent);
                            },
                        },
                        children: rule.children,
                    },
                ];
                return rule;
            } else {
                return {
                    type: "DragTool",
                    props: {
                        dragBtn: config.dragBtn !== false,
                        children: config.children,
                    },
                    inject: true,
                    on: {
                        delete: ({ self }) => {
                            self.__fc__.rm();
                            this.clearActive();
                        },
                        add: ({ self }) => {
                            const top = this.getParent(self);
                            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, this.makeRule(self.children[0].config.config));
                        },
                        addChild: ({ self }) => {
                            // console.log(self);
                            const config = self.children[0].config.config;
                            const item = ruleList[config.children];
                            if (!item) return;
                            (!config.drag ? self : self.children[0]).children[0].children.push(this.makeRule(item));
                        },
                        copy: ({ self }) => {
                            const top = this.getParent(self);
                            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, deepCopy(top.parent));
                        },
                        active: ({ self }) => {
                            this.toolActive(self.children[0]);
                        },
                    },
                    children: [rule],
                };
            }
        },
        // 找到父级rule
        getParent(rule) {
            let parent = rule.__fc__.parent.rule;
            const config = parent.config;
            // 如果是col内的DragTool，再往外一层
            if (config && config.config.inside) {
                rule = parent; //col的rule
                parent = parent.__fc__.parent.rule; //row的rule
            }
            return { root: parent, parent: rule };
        },
        toolActive(rule) {
            this.activeTab = "props";
            this.activeProps = true;
            // this.prevActiveRule = this.activeRule || {};
            this.activeRule = rule;
            this.showBaseRule = !!rule.field;
            // this.propsForm.api.activeRule = rule;

            let propsFormData = { ...rule.props };
            ["style", "options", "request"].forEach((key) => {
                if (rule[key] && Object.keys(rule[key]).length) {
                    propsFormData[key] = rule[key];
                }
            });
            this.propsForm.rule = rule.config.config.props();
            this.propsForm.value = propsFormData;

            if (this.showBaseRule) {
                this.baseForm.value = {
                    field: rule.field,
                    title: rule.title,
                    _control: rule._control,
                };
                this.validateForm.value = { validate: rule.validate ? [...rule.validate] : [] };
            }
        },
        clearActive() {
            this.showBaseRule = false;
            this.activeProps = false;
            this.activeRule = null;
            this.activeTab = "form";
        },
        baseChange(field, value, origin, api, flag) {
            if (!flag && this.activeRule) {
                if (field === "title") {
                    // title变化更新验证的message
                    this.validateForm.value.validate.length &&
                        this.validateForm.api.setValue("validate", setMessage(value, this.validateForm.value.validate));
                }
                this.$set(this.activeRule, field, value);
            }
        },
        propsChange(field, value, origin, api, flag) {
            if (!flag && this.activeRule) {
                if (["style", "options", "request"].indexOf(field) > -1) {
                    this.$set(this.activeRule, field, value);
                } else {
                    this.$set(this.activeRule.props, field, value);
                }
            }
        },
        propsRemoveFiled(field, rule, api) {
            // debugger
            // console.log(field, rule, api);
            // if (["options", "request"].indexOf(field) > -1) {
            //     this.$delete(this.activeRule, field);
            // } else if (this.activeRule) {
            //     this.$delete(this.activeRule.props, field);
            // }
        },
        validateChange(field, value, origin, api, flag) {
            if (!flag && this.activeRule) {
                this.dragForm.api.updateValidate(this.activeRule.field, value);
            }
        },
    },
};
</script>

<style>
.fc-center {
    height: calc(100% - 133px);
}
.fc-side-l {
    background: #fff;
    border: 1px solid #dedede;
    overflow: auto;
}

.fc-side-r {
    /* padding: 8px; */
    background: #fff;
    border: 1px solid #dedede;
}
.fc-side-r .ivu-tabs-tabpane {
    padding: 0 16px;
}
.fc-side-r .ivu-tabs {
    height: 100%;
}
.fc-side-r .ivu-tabs .ivu-tabs-content {
    height: calc(100% - 52px);
}
.fc-side-r .ivu-tabs .ivu-tabs-content .ivu-tabs-tabpane {
    height: 100%;
    overflow: auto;
}
.fc-group {
    padding: 0 10px;
}

.fc-group-title {
    margin: 12px 0 4px;
}

.fc-group-item {
    width: 33.33%;
    display: inline-block;
    padding: 8px;
    transition: all 0.2s ease;
    cursor: pointer;
}
.fc-group-item:hover {
    background-color: #2e73ff;
}

.fc-group-item-icon {
    text-align: center;
}
.fc-group-item-name {
    margin-top: 8px;
    font-size: 12px;
    text-align: center;
}
.fc-group-item:hover > .fc-group-item-name,
.fc-group-item:hover > .fc-group-item-icon > i {
    color: #fff;
}

.fc-group-item.ghost {
    background: #2e73ff;
    width: 100%;
    height: 10px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.fc-group-item.ghost > div {
    display: none;
}

.fc-m {
}

.fc-m-tool {
    padding: 8px 12px;
    text-align: right;
    background: #fff;
    border-top: 1px solid #dedede;
    border-bottom: 1px solid #dedede;
}

.fc-m-drag-wrap {
    padding: 12px;
    height: calc(100% - 43px);
}

.fc-m-drag {
    padding: 3px;
    height: 100%;
    overflow: auto;
    background: #fff;
    z-index: 0;
}
.draggable-box {
    min-height: 60px;
    /* background: #fff; */
    height: 100%;
}

.fc-m-drag > form {
    height: 100%;
}
</style>
