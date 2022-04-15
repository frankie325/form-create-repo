- [进阶使用](#进阶使用)
  - [使用插槽](#使用插槽)
  - [对象组件（子表单）](#对象组件子表单)
  - [数组组件](#数组组件)
  - [自定义组件](#自定义组件)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

# 进阶使用

## 使用插槽

## 对象组件（子表单）
- 示例
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
| 属性 | 说明 | 类型 |   默认值   |
|:---:| :---: |   :---: |  :---:  |
| rule   | 子表单规则    | Array   |   - |
| option | 子表单配置    | Object   |  - |            |
| disabled | 是否禁用子表单    | Boolean   |  false |            |
| syncDisabled | 当禁用状态改变时，子表单是否保持同步    | Boolean   |  true |            |

## 数组组件
数组组件由多个子表单组成，可以通过按钮操作控制生成子表单
- 示例
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
| 属性 | 说明 | 类型 |   默认值   |
|:---:| :---: |   :---: |  :---:  |
| rule   | 数组组件内子表单规则    | Array/Object   |   - |
| option | 数组组件内子表单配置    | Object   |  - |          
| field | 将子表单内的字段值，作为为数组组件双向绑定的值 | String | - |           
| min | 最少添加几项 | Number/String | - |           
| max | 最多添加几项 | Number/String | - |           
| expand | 默认显示几项 | Number/String | - |           
| button | 是否显示操作按钮 | Boolean | true |           
| iconSize | 操作按钮尺寸 | String/Number | 24 |           
| disabled | 是否禁用数组组件    | Boolean   |  false |          
| syncDisabled | 当禁用状态改变时，数组组件是否保持同步 | Boolean | true|           
| onBeforeAdd | 新增时的前置回调，返回false取消操作 | Function | -|           
| onBeforeRemove | 删除时的前置回调，返回false取消操作 | Boolean | -|           
## 自定义组件