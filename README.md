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

### display
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

## 布局组件

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