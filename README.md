# 动态表单生成器
本仓库的实现参考了form-create动态表单，根据公司需求在功能上做了一些修改，并对部分源码进行了注释，帮助有需要理解form-create源码的同学，需要对vue源码有一定理解，如果想要使用完整的功能，请使用[form-create](https://github.com/xaboy/form-create)



# 指南

## 引入
```js
Vue.use(FormCreate, options)
```

## 组件模式

```html
<template>
    <div>
        <FormCreate :rule="rule" :option="option" ></FormCreate>
    </div>
</template>
```

# 教程

## 基础配置

### title
- 类型：`String`
- 说明：字段名称

### field
- 类型：`String`
- 说明：表单组件的字段名称


### value
- 类型：`Any`
- 说明：表单组件字段的初始值

### hidden
- 类型：`Boolean`
- 说明：设置组件是否生成

### show
- 类型：`Boolean`
- 说明：设置组件是否显示，通过`display:none`进行隐藏

## 扩展配置

### col
- 类型：`Object`
- 说明：设置组件的布局组件

### wrap
- 类型：`Object`
- 说明：设置组件的`FormItem`属性
## 通用配置

### attrs
### props
### class
### style
### on 
### nativeOn
### directives
### scopedSlots
### slot
以上配置保持`VNodeData`一致，请参考[渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)

## 全局配置
FormCreate组件上的option属性
```html
 <FormCreate :rule="rule" :option="option" ></FormCreate>
```
```js
option = {
    form:{},
    global:{},
    formData:{},
    submitBtn:{},
    resetBtn:{},
    onSubmit:()=>{},
    onReload:()=>{},
}
```
## form
- 设置Form组件的属性: `Object`
## formData  
- 设置表单组件初始值: `Object`，优先级大于`rule.value`
## submitBtn  
- 设置提交按钮：`Boolean | Object`

`props` 请参照 `iButton` 的属性[props](https://iviewui.com/components/button#API)
```js
option = {
    // submitBtn: false, //隐藏按钮
    submitBtn:{
        ...props, //iButton的属性
        width: '15px', //按钮宽度
        click:(api) => {} //点击触发的回调方法
        innerText:"" //按钮文字
    }
}
```
## resetBtn
- 设置重置按钮：`Boolean | Object`

```js
option = {
    // resetBtn: false, //隐藏按钮
    resetBtn:{
        ...props, //iButton的属性
        width: '15px', //按钮宽度
        click:(api) => {} //点击触发的回调方法
        innerText:"" //按钮文字
    }
}
```
## 布局组件

## 组件联动

- value： 当组件的值和rule.value全等时显示rule中的组件，handle的简写形式
- handle `Function`: 当handle方法返回true时显示rule中的组件
- rule `Array<string> | Array<object>`


当rule为字符数组时，handle条件成立，控制表单字段对应组件的显示，不成立则隐藏

```js
{
    control: [
        {
            // value: 1,
            handle: function(val, api){
                // val为rule.value
                return val === 1
            },
            rule: ["field1", "field2"],
        }
    ]
}
```
当为字符数组时，handle条件成立，添加rule对应的组件，不成立则移除该组件
```js
{
    control: [
        {
            handle: function(val, api){
                return val === 1
            },
            // append: "field1", //设置rule后置插入的位置，不填则默认插入control所在rule的后面
            // prepend: "field2", //设置rule前置插入的位置，不填则默认插入control所在rule的前面
            // child: false, //是否插入到指定位置的children中
            rule: [
                {
                    title: "输入框"
                    type: "input"
                    value: "info"
                }
            ],
        }
    ]
}
```

### Row、Col布局
```js
{
    type: "row",
    children: [
        {
            type: "col",
            props: { span: 24 },
            children: [
                {
                    title: "输入框",
                    type: "input",
                    field: "inputField",
                },
            ],
        },
    ],
}
```
或者，注意：如果父级不是Row组件，则col属性不会生效
```js
{
    type: "row",
    children: [
        {
            title: "输入框",
            type: "input",
            field: "inputField",
            col: {
                span: 12,
            },
        },
    ],
}
```

# Api
[api](./doc/API.md)