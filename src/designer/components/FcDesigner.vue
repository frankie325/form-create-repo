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
                    <FormCreate :rule="dragForm.rule" :option="form.value"></FormCreate>
                </div>
            </Content>
            <Sider :width="260" class="fc-side-r" hide-trigger>Sider</Sider>
        </Layout>
        <Footer class="fc-side-footer">Footer</Footer>
    </Layout>
</template>

<script>
import draggable from "vuedraggable";
import createMenu from "../config/menu";
import ruleList from "../config/rule";

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
            dragForm: {
                rule: this.makeDragRule(children),
            },
            form: {
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
                    start: (evt) => this.dragStart(children, evt),
                    unchoose: (evt) => this.dragUnChoose(children, evt),
                    add: (evt) => this.dragAdd(children, evt),
                    end: (evt) => this.dragEnd(children, evt),
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
        makeRule(config, _rule) {
            // debugger
            const rule = _rule || config.rule();

            let drag;
            // 布局组件col内可继续拖拽
            if (config.drag) {
                const children = [];
                rule.children.push(
                    (drag = this.makeDrag(config.drag, rule.type, children, {
                        start: (evt) => this.dragStart(children, evt),
                        unchoose: (evt) => this.dragUnChoose(children, evt),
                        add: (evt) => this.dragAdd(children, evt),
                        end: (evt) => this.dragEnd(children, evt),
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
                        on: {
                            delete() {},
                            add() {},
                            addChild() {},
                            copy() {},
                            active() {},
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
                    on: {
                        delete(e) {
                            console.log(e);
                        },
                        add() {},
                        addChild() {},
                        copy() {},
                        active() {},
                    },
                    children: [rule],
                };
            }
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
    background: #fff;
    border: 1px solid #dedede;
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
