- [API](#api)
  * [字段操作](#字段操作)
  * [规则操作](#规则操作)
  * [验证操作](#验证操作)
  * [表单操作](#表单操作)

<small><i><a href='http://ecotrust-canada.github.io/markdown-toc/'>Table of contents generated with markdown-toc</a></i></small>

# API

## 字段操作

> **parent**

获取父级 `form-create` 实例

```js
fApi.parent();
```

> **children**

获取子表单 api

```js
fApi.children();
```

> **fields**

获取所有表单字段

```js
/**
 * @description: 获取所有表单字段
 * @return {string[]}
 */

fApi.fields();
```

> **getValue**

获取指定表单字段的值

```js
/**
 * @description: 获取指定表单字段的值
 * @param {String} field
 * @return {any}
 */
fApi.getValue(field);
```

> **coverValue**

设置表单值，覆盖方式

```js
/**
 * @description: 设置表单值，全部覆盖，没有定义的字段全部设为undefined
 * @param {Object} formData
 */
fApi.coverValue({
    [fieldName]: value,
    // ...
});
```

> **setValue**

设置表单值，合并方式

```js
/**
 * @description: 设置表单值，采用合并，未定义的字段不做修改
 * @param {Object} formData
 * 或者
 * @param {String} 表单字段
 * @param {Any} 值
 */
fApi.setValue(formData);
// 或者
fApi.setValue(field, value);
```

> **resetFields**

重置表单数据为初始时候的值

```js
/**
 * @description: 重置表单数据为初始时候的值
 * @param {String | string[]} fields 指定的表单字段，不填则为全部
 */
fApi.resetFields(fields);
```

> **hidden**

隐藏指定的表单组件

```js
/**
 * @description: 隐藏指定的表单组件，Dom节点不渲染，表单验证不会生效
 * @param {Boolean} state 是否开启隐藏
 * @param {String | string[]} fields 指定的表单字段
 */
fApi.hidden(state, fields);
```

> **display**

隐藏指定的表单组件

```js
/**
 * @description: 通过 display:none 隐藏指定的表单组件，Dom渲染，表单验证生效
 * @param {Boolean} state 是否开启隐藏
 * @param {String | string[]} fields 指定的表单字段
 */
fApi.display(state, fields);
```

> **disabled**

禁用表单组件

```js
/**
 * @description: 禁用表单组件
 * @param {Boolean} disabled 是否禁用
 * @param { 不填 | String | string[]} fields 指定的表单字段，不填则禁用所有
 */
fApi.disabled(disabled, fields);
```

> **removeField**

移除指定表单字段的表单组件

```js
/**
 * @description: 移除指定表单字段的表单组件
 * @param {String} field 指定的表单字段
 */
fApi.removeField(field);
```

## 规则操作

> **removeRule**

删除 rule 对应的表单组件

```js
/**
 * @description:删除rule对应的表单组件
 * @param {*} rule 指定rule对象
 */
fApi.removeRule(rule);
```

> **append**

新增追加规则到指定位置

```js
/**
 * @description: 新增追加规则到指定位置
 * @param {Object} rule 新增的规则项
 * @param {String} after 插入到指定表单字段的组件之后
 * @param {Boolean} child 是否插入到子节点中
 */
fApi.append(rule, after, child);
```

> **prepend**

新增前置规则到指定位置

```js
/**
 * @description: 新增前置规则到指定位置
 * @param {Object} rule 新的规则
 * @param {String} before 插入到指定表单字段的组件之前
 * @param {Boolean} child 是否插入到子节点中
 */
fApi.prepend(rule, before, child);
```

> **model**

获取所有表单组件规则

```js
/**
 * @description:获取所有表单组件规则
 * @param {Boolean} origin 是否返回原始规则（creator实例）
 * @return {Object}
 */
fApi.model(origin);
```

> **mergeRule**

更新指定规则，合并方式

```js
/**
 * @description: 更新指定规则，合并方式
 * @param {String} field 表单字段
 * @param {Object} rule 表单规则
 */
fApi.mergeRule(field, rule);
```

> **mergeRules**

一次更新多个指定规则，合并方式

```js
/**
 * @description: 一次更新多个指定规则，合并方式
 * @param {Object} rules 规则对象
 */
fApi.mergeRules({
    [fieldName1]: {
        style: {},
    },
    [fieldName2]: {
        props: {},
    },
});
```

> **updateRule**

更新指定规则，覆盖方式

```js
/**
 * @description: 更新指定规则，覆盖方式
 * @param {String} field 表单字段
 * @param {Object} rule 表单规则
 */
fApi.updateRule(field, rule);
```

> **updateRules**

一次更新多个指定规则，覆盖方式

```js
/**
 * @description: 一次更新多个指定规则，覆盖方式
 * @param {Object} rules 规则对象
 */
fApi.updateRules({
    [fieldName1]: {
        style: {},
    },
    [fieldName2]: {
        props: {},
    },
});
```

## 验证操作

> **validate**

表单校验，与 iview 一致，参考[iview 表单校验](https://iviewui.com/components/form#API)

```js
fApi.validate();
```

> **updateValidate**

更新表单组件的校验规则

```js
/**
 * @description: 更新表单组件的校验规则
 * @param {String} field 表单字段
 * @param {Object | Array} validate 校验配置
 * @param {Boolean} merge 是否采用合并方式，否则直接覆盖
 */
fApi.updateValidate(field, validate, merge);
```

> **updateValidates**

批量更新表单组件的校验规则

```js
/**
 * @description: 批量更新表单组件的校验规则
 * @param {Object} validates 校验规则
 * @param {*} merge 是否采用合并方式，否则直接覆盖
 */
fApi.updateValidates(
    {
        [fieldName]: [{ required: true, message: "xxx不能为空", trigger: "change" }],
    },
    merge
);
```

> **refreshValidate**

刷新校验规则

```js
/**
 * @description: 刷新校验规则
 */
fApi.refreshValidate();
```

> **clearValidateState**

清除指定表单组件的校验状态

```js
/**
 * @description: 清除指定表单组件的校验
 * @param {String | string[]} fields 指定的表单字段，不填则为全部
 * @param {Boolean} clearSub 是否清除子表单校验状态
 */
fApi.clearValidateState(fields, clearSub);
```

> **clearSubValidateState**

清除指定子表单的校验状态

```js
/**
 * @description: 清除指定子表单的校验状态
 * @param {String | string[]} fields 指定的子表单表单字段
 */
fApi.clearSubValidateState(fields);
```

> **validateField**

对指定字段进行表单校验，与 iview 一致

```js
/**
 * @description: 对指定字段进行表单校验，支持Promise
 * @param {String} field 校验字段
 * @param {Function} callback 回调 验证失败则返回错误信息
 */
fApi.validateField(field, (err) => {});
```

## 表单操作

> **formData**

获取表单数据，返回的值不是双向绑定

```js
/**
 * @description: 获取表单数据，返回的值不是双向绑定
 * @param {String | string[]} fields 指定的表单字段，不填则为全部
 */
fApi.formData(fields);
```

> **bind**

获取表单数据，为双向绑定

```js
/**
 * @description: 获取表单数据，返回的值为双向绑定
 */
fApi.bind();
```

> **changeStatus**

表示表单中的值是否发生了变化

```js
/**
 * @description: 表示表单中的值是否发生了变化
 */
fApi.changeStatus();
```

> **clearChangeStatus**

清除变化状态

```js
/**
 * @description: 清除变化状态
 */
fApi.clearChangeStatus();
```

> **submitBtnProps**

修改提交按钮

```js
/**
 * @description: 修改提交按钮
 * @param {Object} props 提交按钮的属性
 */
fApi.submitBtnProps(props);

// 快捷操作
fApi.btn.loading(true); //设置提交按钮loading状态
fApi.btn.disabled(true); //设置提交按钮禁用状态
fApi.btn.show(true); //设置提交按钮显示状态
```

> **resetBtnProps**

修改重置按钮

```js
/**
 * @description: 修改重置按钮
 * @param {Object} props 重置按钮的属性
 */
fApi.resetBtnProps(props);

// 快捷操作
fApi.resetBtn.loading(true); //设置重置按钮loading状态
fApi.resetBtn.disabled(true); //设置重置按钮禁用状态
fApi.resetBtn.show(true); //设置重置按钮显示状态
```

> **refresh**

刷新表单渲染

```js
/**
 * @description: 刷新表单渲染
 */
fApi.refresh();
```

> **updateOptions**

更新表单配置

```js
/**
 * @description: 更新表单配置
 * @param {Object} options 表单配置规则
 */
fApi.updateOptions(options);
```

> **refreshOptions**

刷新表单配置

```js
/**
 * @description: 刷新表单配置
 */
fApi.refreshOptions();
```

> **onSubmit**

更新表单提交事件方法

```js
/**
 * @description: 更新表单提交事件方法
 * @param {Function} fn 提交方法
 */
fApi.onSubmit(fn);
```

> **hideForm**

隐藏表单

```js
/**
 * @description: 隐藏表单
 */
fApi.hideForm();
```

> **reload**

重载表单

```js
/**
 * @description: 重载表单，重新加载新的rules规则
 * @param {Array} rules rules规则数组
 */
fApi.reload(rules);
```

> **destroy**

销毁表单

```js
/**
 * @description: 销毁表单
 */
fApi.destroy();
```

> **nextTick**

表单重新渲染后的回调

```js
/**
 * @description: 表单重新渲染后的回调
 * @param {Function} fn
 */
fApi.nextTick(fn);
```

> **nextRefresh**

执行传入的方法后，如果表单没重新渲染，会自动重新渲染

```js
/**
 * @description: 执行传入的方法后，如果表单没重新渲染，会自动重新渲染
 * @param {Function} fn
 */
fApi.nextRefresh(fn);
```

> **submit**

表单提交

-   如果没有传入成功时的回调，则会触发全局配置的`onSubmit`方法，以及在 `form-create` 组件上绑定的 `submit` 方法

```js
/**
 * @description: 表单提交
 * @param {Function} successFn 成功时的回调
 * @param {Function} failFn 失败时的回调
 */
fApi.submit(
    (formData, api) => {},
    (formData, api) => {}
);
```
