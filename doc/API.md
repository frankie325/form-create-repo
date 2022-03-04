# API

## removeField
移除指定表单字段的表单组件
```js
/**
* @description: 移除指定表单字段的表单组件
* @param {String} field 指定的表单字段
*/  
fApi.removeField(field)
```

## removeRule
删除rule对应的表单组件
```js
/**
 * @description:删除rule对应的表单组件
 * @param {*} rule 指定rule对象
 */
fApi.removeRule(rule)
```
## append
新增追加规则到指定位置
```js
/**
* @description: 新增追加规则到指定位置
* @param {Object} rule 新增的规则项
* @param {String} after 插入到指定表单字段的组件之后
* @param {Boolean} child 是否插入到子节点中
*/
fApi.append(rule, after, child)
```
## prepend
新增前置规则到指定位置
```js
/**
* @description: 新增前置规则到指定位置
* @param {Object} rule 新的规则
* @param {String} before 插入到指定表单字段的组件之前
* @param {Boolean} child 是否插入到子节点中
*/   
fApi.prepend(rule, before, child)
```
## hidden
隐藏指定的表单控件，Dom节点不渲染，表单验证不会生效
```js
/**
 * @description: 隐藏指定的表单控件，Dom节点不渲染，表单验证不会生效
 * @param {Boolean} state 是否开启隐藏
 * @param {String | string[]} fields 指定的表单字段
 */
fApi.hidden(state, fields)
```