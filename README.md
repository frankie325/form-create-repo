- [指南](#指南)
  - [引入](#引入)
  - [组件模式](#组件模式)
- [教程](#教程)
  - [基础配置](#基础配置)
  - [扩展配置](#扩展配置)
  - [通用配置](#通用配置)
  - [全局配置](#全局配置)
  - [布局组件](#布局组件)
  - [组件联动](#组件联动)
  - [事件注入](#事件注入)
  - [事件监听](#事件监听)
  - [数据请求](#数据请求)
  - [自定义属性](#自定义属性)
  - [组件事件](#组件事件)
- [进阶使用](#进阶使用)
- [Api](#api)


 <center>✨✨✨**动态表单生成器**✨✨✨</center>
 
***

本仓库的实现参考了 form-create 动态表单，进行了部分修改，仅限公司内部使用。如果想要使用完整的功能，请使用 👉[form-create](https://github.com/xaboy/form-create)

# 指南

## 引入

```js
Vue.use(FormCreate, options);
```

## 组件模式

```vue
<template>
    <div>
        <FormCreate v-model="fApi" :value.sync="value" :rule="rule" :option="option"></FormCreate>
    </div>
</template>
```

```js
export default {
    data() {
        return {
            fApi: {}, // api
            value: {}, // 表单数据
            // 表单生成规则
            rule: [
                {
                    type: "input",
                    field: "name",
                    value: "姓名",
                },
            ],
            // 表单配置
            option: {
                form: {}, //Form组件属性配置
                // 表单提交方法
                onSubmit: function (formData) {},
                // 提交按钮属性
                submitBtn: {},
                // 重置按钮属性
                resetBtn: {},
            },
        };
    },
};
```

# 教程

## 基础配置

`rules`规则对象中的配置

```js
export default {
    data(){
        return {
            rule:[
                {
                    title: "姓名",
                    type: "input",
                    field: "name",
                    value: "xxx",
                    hidden: false,
                    show: true,
                    col: {
                        span: 12
                    },
                    wrap:{
                        labelWidth: 100
                    }
                }
            ],
}
```

> title

-   类型：`String`
-   说明：表单标签值，`wrap.label`优先级更高

> type

-   类型：`String`
-   说明：设置生成的表单组件的名称，可以使用连字符、驼峰、小写

> field

-   类型：`String`
-   说明：表单组件的字段名称

> value

-   类型：`Any`
-   说明：表单组件字段的初始值

> hidden

-   类型：`Boolean`
-   说明：设置组件是否生成

> show

-   类型：`Boolean`
-   说明：设置组件是否显示，通过 `display:none` 进行隐藏

> native

-   类型：`Boolean`
-   说明：设置是否使用 `FormItem` 包裹表单组件，默认会包裹
    > className
-   类型：`String`
-   说明：往 `FormItem` 设置 class 名称

## 扩展配置

> col

-   类型：`Object`
-   说明：设置 `COl` 组件的属性  
    [布局组件说明](#布局组件)

> wrap

-   类型：`Object`
-   说明：设置 `FormItem` 组件的属性

> options

-   类型：`Array`
-   说明：设置`radio`, `select`, `checkbox` 等组件 option 选择项

> request

-   类型：`Object | Array<Object>`
-   说明：请求接口数据，并设置到规则中的属性
    [数据请求说明](#数据请求)

> control

-   类型：`Object | Array`
-   说明：设置组件联动  
    [组件联动说明](#组件联动)

> children

-   类型：`Array<rule | string>`
-   说明：设置父组件的插槽，默认为 default，可配合 slot 使用

> inject

-   类型：`Boolean | Any`
-   说明：是否开启向事件中注入参数  
    [事件注入](#事件注入)

> emit

-   类型：`Array`
-   说明：使用 `emit` 方式触发事件  
    [emit 说明](#emit监听事件)

> nativeEmit

-   类型：`Array`
-   说明：使用 `nativeEmit` 方式触发原生事件

> emitPrefix

-   类型：`String`
-   说明：会为 emit 事件添加前缀  
    [emit 说明](#emit监听事件)

## 通用配置

以下配置保持`VNodeData`一致，请参考[渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)

```js
export default {
    data() {
        return {
            rule: [
                {
                    title: "姓名",
                    type: "input",
                    field: "name",
                    value: "xxx",
                    ref: "inputRef",
                    props: {
                        //表单组件上传递的props
                        size: "large",
                    },
                    style: {
                        color: "red",
                    },
                    on: {
                        "on-change": () => {},
                    },
                },
            ],
        };
    },
};
```

> ref

> attrs

> props

> class

> style

> on

> nativeOn

> directives

> scopedSlots

> slot

## 全局配置

FormCreate 组件上的 option 属性

```vue
<template>
    <div>
        <FormCreate :rule="rule" :option="option"></FormCreate>
    </div>
</template>
```

```js
export default {
    data(){
        return {
            // 全局配置
            option: {
                form:{},
                global:{},
                formData:{},
                injectEvent:true,
                submitBtn:{},
                resetBtn:{},
                onSubmit:()=>{},
                onReload:()=>{},
            }
}
```

> form

设置 Form 组件的属性: `Object`

```js
let form = {
    //是否开启行内表单模式
    inline: false,
    //表单域标签的位置
    labelPosition: "right",
    //表单域标签的宽度，labelPosition为"top"时,需要手动设置 labelWidth 为 null
    labelWidth: 125,
    //是否显示校验错误信息
    showMessage: true,
    //原生的 autocomplete 属性，可选值为 off 或 on
    autocomplete: "off",
    //是否隐藏所有表单项的必选标记
    hideRequiredMark: false,
    //是否自动在 label 名称后添加冒号
    labelColon: false,
    //是否禁用该表单内的所有组件，适用于具有 disabled 属性的表单类组件）
    disabled: false,
    //所有带有 size 属性的组件的尺寸，默认为不设置，详见各组件默认的 size 值。可选值为 default、small 或 large。
    size: undefined,
};
```

> global

设置表单组件的全局配置: `Object`

```js
export default {
    data(){
        return {
            // 全局配置
            option: {
                global:{
                    // 所有表单组件的属性
                    "*": {
                        style: {},
                        props: {},
                    },
                    // 只设置Input组件的属性
                    "input": {
                        style: {},
                        props: {},
                    }
                },
                /*...*/
            }
}
```

> formData

设置表单组件初始值: `Object`，优先级大于`rule.value`

> injectEvent

所有表单组件事件都会开启事件注入: `Boolean | Any`  
[事件注入](#事件注入)

> submitBtn

设置提交按钮：`Boolean | Object`

`props` 请参照 `iButton` 的属性[props](https://iviewui.com/components/button#API)

```js
export default {
    data(){
        return {
            // 全局配置
            option: {
                submitBtn:{
                    // submitBtn: false, //隐藏按钮
                    submitBtn:{
                        ...props, //iButton的属性
                        width: '15px', //按钮宽度
                        click:(api) => {} //点击触发的回调方法
                        innerText:"" //按钮文字
                    }
                }
            }
        }
    }
}
```

> resetBtn

设置重置按钮：`Boolean | Object`，默认为隐藏

```js
export default {
    data(){
        return {
            // 全局配置
            option: {
                resetBtn:{
                    // resetBtn: false, //隐藏按钮
                    resetBtn:{
                        ...props, //iButton的属性
                        width: '15px', //按钮宽度
                        click:(api) => {} //点击触发的回调方法
                        innerText:"" //按钮文字
                    }
                }
            }
        }
    }
}
```

> onSubmit

设置表单提交的回调函数

> onReload

## 布局组件

> Row、Col 布局

```js
export default {
    data(){
        return {
            rule:[
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
            ],
}

```

或者

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

<font color="red">注意：如果父级不是 Row 组件，则 col 属性不会生效</font>

## 组件联动

-   value： 当组件的值和 rule.value 全等时显示 rule 中的组件，handle 的简写形式
-   handle `Function`: 当 handle 方法返回 true 时显示 rule 中的组件
-   rule `Array<string> | Array<object>`

当 rule 为字符数组时，控制表单字段对应组件的显示，handle 返回为真，则显示

```js
{
    control: [
        {
            // value: 1,
            handle: function (val, api) {
                // val为rule.value
                return val === 1;
            },
            rule: ["field1", "field2"],
        },
    ];
}
```

当为字符数组时，控制生成 rule 对应的组件，handle 返回为真，则添加组件

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

## 事件注入

全局开启事件参数注入`option.injectEvent: true`，或者局部开启事件参数注入`rule.inject: true`，为表单组件的所有回调事件都会注入一个参数。

```js
export default {
    data() {
        return {
            rule: [
                {
                    type: "input",
                    field: "input-field",
                    inject: true,
                    props: {
                        // props中的属性如果是函数，也会开启事件注入
                    },
                    on: {
                        "on-change": (inject, event) => {
                            //    注入的参数在第一个位置
                        },
                    },
                },
            ],
        };
    },
};
```

注入的参数为

```js
{
    $f: Object , //api
    rule: Array, //所有生成规则
    self：Object, //表单组件的生成规则
    option: Object, //全局配置
    inject: Any, //自定义的注入参数
    args:Array, //原始的回调参数
}
```

## 事件监听

> emit 监听事件

设置 `emit` 可监听组件内抛出的事件：`Array<String> | Array<Object>`

事件名称为`${field}-${eventName}`，如果采用驼峰写法会转为连字符，
如果设置了`rule.emitPrefix`，则事件名称为`${emitPrefix} - ${eventName}`

```vue
<template>
    <div>
        <FormCreate @input-field-on-change="emitChange"></FormCreate>
    </div>
</template>
```

```js
export default {
    data() {
        return {
            rule: [
                {
                    type: "input",
                    field: "input-field",
                    emit: ["on-change"], //当触发组件的on-change时，同时会触发在form-create组件上绑定的自定义事件
                },
            ],
        };
    },
    methods: {
        emitChange() {},
    },
};
```

`emit` 也可配置为数组对象，为事件开启参数注入

```js
export default {
    data() {
        return {
            rule: [
                {
                    type: "input",
                    field: "input-field",
                    //inject: "注入参数"
                    emit: [
                        {
                            name: "on-change",
                            inject: "自定义注入参数",
                        },
                    ],
                },
            ],
        };
    },
    methods: {
        emitChange() {},
    },
};
```

> nativeEmit 监听原生事件

设置 `emit` 可监听组件内抛出的原生事件：`Array<String> | Array<Object>`，用法与 `emit` 一致，事件名称为`native-${field}-${eventName}`

## 数据请求

当组件中的属性数据需要调用接口时，可以使用 `rule.request` 进行配置

比如选择器的 options 选项

```js
let rule = {
    request: {
        // 接口返回数据后，将会重新设置rule.options的值
        to: "options",
        axios: {
            url: "/example",
            method: "get",
            params: {},
            data: {},
        },
        parse: (res) => {
            return res.data;
        },
        // 替换返回数据中指定的的字段
        altKeys: {
            label: "name", //使用label替换掉数据中的name字段
            value: "age",
        },
    },
};

// 或者设置为数组，设置多个属性
let rule = {
    request: [
        {
            /*...*/
        },
        {
            /*...*/
        },
    ],
};
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

## 组件事件

```vue
<template>
    <div>
        <FormCreate
            @created="created"
            @update="update"
            @mounted="mounted"
            @change="change"
            @control="control"
            @submit="submit"
            @removeField="removeField"
            @removeRule="removeRule"
            @emit-event="emitEvent"
        ></FormCreate>
    </div>
</template>
```

```js
export default {
    methods: {
        created(fApi) {},
        update(fApi) {},
        mounted(fApi) {},
        change(field, value, rule, fApi, setFlag) {},
        control(rule, fApi) {},
        submit(formData, fApi) {},
        removeField(field, rule, fApi) {},
        removeRule(rule, fApi) {},
        emitEvent(emitName, ...args) {},
    },
};
```

> created

-   说明：对 `rules` 的处理完成后触发
-   参数：
    -   fApi：api 接口

> update

-   说明：`rules` 发生变化时触发
-   参数：
    -   fApi：api 接口

> mounted

-   说明：表单首次完成渲染时触发
-   参数：
    -   fApi：api 接口

> change

-   说明：表单组件值变化时触发
-   参数：
    -   field：表单字段
    -   value：组件值
    -   rule：组件的 rule 规则
    -   fApi: api 接口
    -   setFlag：为 true 说明是用户通过代码修改 value 值，false 为操作组件修改

> control

-   说明：组件联动的 `control` 配置生效或失效时触发
-   参数：
    -   rule：组件的 rule 规则
    -   fApi: api 接口

> submit

-   说明：点击表单提交按钮或者通过调用`api.submit()`没有传递回调时触发
-   参数：
    -   formData：表单数据
    -   fApi: api 接口

> removeField

-   说明：移除表单组件时触发，只有定义了 `rule.field` 属性才会触发
-   参数：
    -   field：表单数据
    -   rule: 组件的 rule 规则
    -   fApi: api 接口

> removeRule

-   说明：移除表单组件或移除规则时触发
-   参数：
    -   rule: 组件的 rule 规则
    -   fApi: api 接口

> emit-event

-   说明：在组件的`emit`事件触发时触发
-   参数：
    -   emitName: `emit`触发的事件名称
    -   args: `emit`触发的事件的参数

# 进阶使用

[进阶使用](./doc/ADVANCE.md)

# Api

[api](./doc/API.md)
