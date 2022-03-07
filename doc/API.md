 [toc]

# API

## 字段操作
### fields
获取所有表单字段
```js
/**
* @description: 获取所有表单字段
* @return {string[]}
*/        
fApi.fields(field)
```

### getValue
获取指定表单字段的值
```js
/**
* @description: 获取指定表单字段的值
* @param {String} field
* @return {any}
*/     
fApi.getValue(field)
```

### coverValue
设置表单值，覆盖方式
```js
/**
 * @description: 设置表单值，全部覆盖，没有定义的字段全部设为undefined
 * @param {Object} formData
 */    
fApi.coverValue(formData)
```

### setValue
设置表单值，合并方式
```js
/**
* @description: 设置表单值，采用合并，未定义的字段不做修改
* @param {Object} formData
* 或者
* @param {String} 表单字段
* @param {Any} 值
*/
fApi.setValue(formData)
// 或者
fApi.setValue(field, value)
```

### resetFields
重置表单数据为初始时候的值
```js
/**
* @description: 重置表单数据为初始时候的值
* @param {String | string[]} fields 指定的表单字段，不填则为全部
*/
fApi.resetFields(fields)
```

## hidden
隐藏指定的表单组件
```js
/**
 * @description: 隐藏指定的表单组件，Dom节点不渲染，表单验证不会生效
 * @param {Boolean} state 是否开启隐藏
 * @param {String | string[]} fields 指定的表单字段
 */
fApi.hidden(state, fields)
```

## display
隐藏指定的表单组件
```js
/**
* @description: 通过 display:none 隐藏指定的表单组件，Dom渲染，表单验证生效
* @param {Boolean} state 是否开启隐藏
* @param {String | string[]} fields 指定的表单字段
*/
fApi.display(state, fields)
```

## disabled
禁用表单组件
```js
/**
 * @description: 禁用表单组件
 * @param {Boolean} disabled 是否禁用
 * @param { 不填 | String | string[]} fields 指定的表单字段，不填则禁用所有
 */
fApi.disabled(disabled, fields)
```

## removeField
移除指定表单字段的表单组件
```js
/**
* @description: 移除指定表单字段的表单组件
* @param {String} field 指定的表单字段
*/  
fApi.removeField(field)
```

## 规则操作

### removeRule
删除rule对应的表单组件
```js
/**
 * @description:删除rule对应的表单组件
 * @param {*} rule 指定rule对象
 */
fApi.removeRule(rule)
```
### append
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
### prepend
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
