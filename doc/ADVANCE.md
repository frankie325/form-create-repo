- [进阶使用](#进阶使用)
  - [设置组件插槽](#设置组件插槽)
  - [对象组件（子表单）](#对象组件子表单)
  - [数组组件](#数组组件)
  - [树形控件](#树形控件)
  - [自定义组件](#自定义组件)
  - [新增属性](#新增属性)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

# 进阶使用

## 设置组件插槽

示例：

给输入框组件设置插槽

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

## 新增属性

有些组件，新增了一些属性，方便表单设计器的使用，配置时也可以使用

**switch**

-   open：打开时的文字
-   close：关闭是的文字

**panel**

-   headContent：面板头部内容

**divider**

-   title：分割线标题，会覆盖 rule.children

**button**

-   content：按钮的内容，会覆盖 rule.children

**alert**

-   content：提示内容，会覆盖 rule.children
