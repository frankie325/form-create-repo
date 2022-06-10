-   [进阶使用](#进阶使用)
    -   [设置组件插槽](#设置组件插槽)
        + [默认插槽](#默认插槽)
        + [具名插槽](#具名插槽)
        + [扩展插槽](#扩展插槽)
    -   [对象组件（子表单）](#对象组件子表单)
    -   [数组组件](#数组组件)
    -   [树形控件](#树形控件)
    -   [自定义组件](#自定义组件)
    -   [新增属性](#新增属性)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

# 进阶使用

## 设置组件插槽

### 默认插槽

设置默认插槽

```js
export default {
    data() {
        return {
            rule: [
                {
                    type: "button",
                    children: ["方式1"],
                },
            ],
        };
    },
};
```

### 具名插槽

给输入框组件设置前缀

```js
export default {
    data() {
        return {
            rule: [
                {
                    title: "输入框",
                    type: "input",
                    field: "input-field",
                    children: [
                        {
                            type: "icon",
                            props: {
                                type: "ios-checkmark",
                            },
                            slot: "prefix",
                        },
                    ],
                },
            ],
        };
    },
};
```

### 扩展插槽

仅 Select、Radio、Checkbox 组件支持，为 Option 选项自定义模板

```js
export default {
    data() {
        return {
            rule: [
                {
                    title: "选择器",
                    type: "select",
                    field: "select-field",
                    value: [],
                    options: [
                        {
                            label: "苹果",
                            value: "apple",
                            /**
                             * @description: 自定义Option的模板
                             * @param h 渲染函数
                             * @param option 当前option的数据
                             */
                            slot(h, option) {
                                return [
                                    h("span", "苹果"),
                                    h("Icon", {
                                        props: {
                                            type: "logo-apple",
                                        },
                                    }),
                                ];
                            },
                        },
                        {
                            label: "香蕉",
                            value: "banana",
                        },
                        {
                            label: "梨子",
                            value: "pear",
                        },
                    ],
                },
            ],
        };
    },
};
```

## 对象组件（子表单）

-   示例

```vue
<template>
    <div>
        <FormCreate :rule="rule"></FormCreate>
    </div>
</template>
```

```js
export default {
    data(){
        return {
            rule:[
                {
                    type: "subForm",
                    field: "sub-form",
                    // 子表单初始值
                    value: {
                        "sub-input":"我是子表单输入框"
                    },
                    props:{
                        //子表单的
                        rule:[
                            {
                                title: "子表单输入框",
                                type: "input"
                                field: "sub-input"
                            }
                        ],
                        // 子表单的option配置
                        option:{
                            form:{},
                            submitBtn: false
                        }
                    }
                }
            ],
            option
        }
    }
}
```

|     属性     |                 说明                 |  类型   | 默认值 |
| :----------: | :----------------------------------: | :-----: | :----: | --- |
|     rule     |              子表单规则              |  Array  |   -    |
|    option    |              子表单配置              | Object  |   -    |     |
|   disabled   |            是否禁用子表单            | Boolean | false  |     |
| syncDisabled | 当禁用状态改变时，子表单是否保持同步 | Boolean |  true  |     |

## 数组组件

数组组件由多个子表单组成，可以通过按钮操作控制生成子表单

-   示例

```vue
<template>
    <div>
        <FormCreate :rule="rule"></FormCreate>
    </div>
</template>
```

```js
export default {
    data(){
        return {
            rule:[
                {
                    title: "数组组件",
                    type: "group",
                    field: "arr-comp",
                    // 数组组件初始值
                    value: [
                        {
                            "arr-input":"我是数组组件输入框"
                        }
                    ],
                    props:{
                        //应用到数组组件内子表单的规则
                        rule:[
                            {
                                title: "数组组件输入框",
                                type: "input"
                                field: "arr-input"
                            }
                        ],
                        // 用到数组组件内子表单的option配置
                        option:{
                            form:{},
                            submitBtn: false
                        }
                    }
                }
            ],
            option
        }
    }
}
```

|      属性      |                      说明                      |     类型      | 默认值 |
| :------------: | :--------------------------------------------: | :-----------: | :----: |
|      rule      |              数组组件内子表单规则              | Array/Object  |   -    |
|     option     |              数组组件内子表单配置              |    Object     |   -    |
|     field      | 将子表单内的字段值，作为为数组组件双向绑定的值 |    String     |   -    |
|      min       |                  最少添加几项                  | Number/String |   -    |
|      max       |                  最多添加几项                  | Number/String |   -    |
|     expand     |                  默认显示几项                  | Number/String |   -    |
|     button     |                是否显示操作按钮                |    Boolean    |  true  |
|    iconSize    |                  操作按钮尺寸                  | String/Number |   24   |
|    disabled    |                是否禁用数组组件                |    Boolean    | false  |
|  syncDisabled  |     当禁用状态改变时，数组组件是否保持同步     |    Boolean    |  true  |
|  onBeforeAdd   |     新增时的前置回调，返回 false 取消操作      |   Function    |   -    |
| onBeforeRemove |     删除时的前置回调，返回 false 取消操作      |    Boolean    |   -    |

## 树形控件

因为 iview 的树形控件没有做数据双向绑定，这里做了封装，属性的使用没变，双向绑定的数据格式为 id 数组

## 自定义组件

全局组件注册

使用 Vue 注册

```js
Vue.component(TestComponent);
```

或者

```js
import FormCreate from "@form-create/iview";

FormCreate.component(TestComponent);
```

## 自定义属性

使用自定义属性可以在处理`rule`的各个阶段中，对规则实现扩展

-   注册自定义属性

```js
FormCreate.register({
    name: "str", //自定义属性名称
    components: ["input", "select"], //属性绑定的组件，不设置或者'*'默认为全部组件
    input: true, //拥有rule.field字段才会触发自定义属性的事件
    // rule初始化时
    init(data, rule, api) {},
    // rule正在处理时
    load(data, rule, api) {},
    // rule处理完成时
    loaded(data, rule, api) {
        // api.removeField("input-field");
    },
    // 组件值发生变化时
    value(data, rule, api) {},
    // 组件的control配置处理完成时
    control(data, rule, api) {},
    //rule 移除时
    deleted(data, rule, api) {},
    //mounted 对应的组件生成时
    mounted(data, rule, api) {},
    //自定义属性值发生变化
    watch(data, rule, api) {},
});
```

-   在规则中使用自定义属性

```js
export default {
    data() {
        return {
            rule: [
                {
                    type: "input",
                    field: "input-field",
                    effect: {
                        str: "我是自定义属性", // 键为自定义属性名称，值为自定义属性值，在处理rule的各个阶段中，触发自定义属性的方法
                    },
                },
            ],
        };
    },
};
```

-   自定义属性方法中的参数

```js
FormCreate.register({
    // rule正在处理时
    load({ value, getValue, getProp, clearProp, mergeProp }, rule, api) {
        // 自定义属性的值
        value;
        // 合并新的rule规则
        mergeProp({
            props: {
                /*...*/
            },
        });
        // 获取由 mergeProp 合并的规则
        getProp();
        // 清除由 mergeProp 合并的规则
        clearProp();
    },
});
```

## 新增属性

有些组件，新增了一些新的 prop，方便表单设计器的使用，配置时也可以使用

> **switch**

-   open：打开时的文字
-   close：关闭是的文字

> **panel**

-   headContent：面板头部内容

> **divider**

-   title：分割线标题，会覆盖 rule.children

> **button**

-   content：按钮的内容，会覆盖 rule.children

> **alert**

-   content：提示内容，会覆盖 rule.children
