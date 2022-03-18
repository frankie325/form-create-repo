<template>
    <Layout class="fc-designer">
        <Header class="fc-header">Header</Header>
        <Layout>
            <Sider :width="260" class="fc-side-l" hide-trigger>
                <template v-for="(item, index) in menuList">
                    <div class="fc-group" :key="index">
                        <h4 class="fc-group-title">{{ item.title }}</h4>
                        <draggable :list="item.list" :group="{ name: 'default', pull: 'clone', put: false }" :sort="false">
                            <div class="fc-group-item" v-for="(data, index) in item.list" :key="index">
                                <div class="fc-group-item-icon">
                                    <Icon :type="data.icon" size="20" />
                                </div>
                                <div class="fc-group-item-name">{{ data.label }}</div>
                            </div>
                        </draggable>
                    </div>
                </template>
            </Sider>
            <Content class="fc-m">
                <div class="fc-m-drag">
                    <FormCreate :rule="dragForm.rule" v-model="dragForm.api" :option="form.value"></FormCreate>
                </div>
            </Content>
            <Sider :width="320" class="fc-side-r" hide-trigger>
                <Tabs v-model="activeTab">
                    <TabPane label="表单配置" name="form">
                        <FormCreate :rule="form.rule" :option="form.option" :value.sync="form.value.form"></FormCreate>
                    </TabPane>
                    <TabPane label="组件配置" name="props">
                        <!-- <FormCreate :rule="baseForm.rule" v-model="baseForm.api" :option="baseForm.options"></FormCreate> -->
                    </TabPane>
                </Tabs>
            </Sider>
        </Layout>
        <Footer class="fc-side-footer">Footer</Footer>
    </Layout>
</template>

<script>
import draggable from "vuedraggable";
import { deepCopy } from "@/utils";
import createMenu from "../config/menu";
import ruleList from "../config/rule";
import form from "../config/base/form";
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
        };
    },
    data() {
        const children = [];
        return {
            menuList: createMenu(),
            activeTab: "form",
            dragForm: {
                rule: this.makeDragRule(children),
                api: {},
            },
            form: {
                rule: form(),
                option: {
                    form: {
                        // inline: true,
                        // labelPosition: "top",
                        
                        labelWidth: null,
                    },
                    submitBtn: false,
                },
                value: {
                    form: {
                        inline: false,
                        labelWidth: 120,
                    },
                    submitBtn: false,
                },
            },
            moveRule: null,
            addRule: null,
            added: null,
        };
    },
    methods: {
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
                            // ghostClass: "ghost",
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
            console.log("-------dragStart-----", children, evt);
            this.moveRule = children;
            this.added = false;
        },
        dragUnChoose(children, evt) {
            console.log("-------dragUnChoose-----", children, evt);
            this.addRule = {
                children,
                oldIndex: evt.oldIndex,
            };
        },
        dragAdd(children, evt) {
            console.log("-------dragAdd-----", children, evt);
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
            console.log("-------dragEnd-----", children, evt);
            const newIndex = evt.newIndex;
            const oldIndex = evt.oldIndex;
            // debugger
            console.log(this.moveRule === children);
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
            // debugger;
            if (config.children && !_rule) {
                const child = this.makeRule(ruleList[config.children]);
                rule.children.push(child);
            }

            if (config.inside) {
                rule.children = [
                    {
                        type: "DragTool",
                        props: {
                            dragBtn: config.dragBtn !== false,
                            children: config.children,
                        },
                        inject: true,
                        on: {
                            delete: ({ self }) => {
                                // console.log(inject);
                                this.getParent(self).parent.__fc__.rm();
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
                            active: () => {},
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
                        },
                        add: ({ self }) => {
                            const top = this.getParent(self);
                            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, this.makeRule(self.children[0].config.config));
                        },
                        addChild: ({ self }) => {
                            console.log(self);
                            const config = self.children[0].config.config;
                            const item = ruleList[config.children];
                            if (!item) return;
                            (!config.drag ? self : self.children[0]).children[0].children.push(this.makeRule(item));
                        },
                        copy: ({ self }) => {
                            const top = this.getParent(self);
                            top.root.children.splice(top.root.children.indexOf(top.parent) + 1, 0, deepCopy(top.parent));
                        },
                        active: () => {},
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
    },
};
</script>

<style>
.fc-designer {
    height: 100%;
    min-height: 500px;
}
.fc-header {
    background: #fff;
}
.fc-side-l {
    background: #fff;
    border: 1px solid #dedede;
}

.fc-side-r {
    /* padding: 8px; */
    background: #fff;
    border: 1px solid #dedede;
}
.fc-side-r .ivu-tabs-tabpane {
    padding: 0 16px;
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
    text-align: center;
}
.fc-group-item:hover > .fc-group-item-name,
.fc-group-item:hover > .fc-group-item-icon > i {
    color: #fff;
}

.fc-m .form-create .fc-group-item {
    background: #2e73ff;
    width: 100%;
    height: 10px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.fc-m {
}

.fc-m-drag {
    padding: 8px;
    height: 100%;
}
.draggable-box {
    min-height: 60px;
    background: #fff;
    height: 100%;
}

.fc-m-drag > form {
    height: 100%;
}
</style>
