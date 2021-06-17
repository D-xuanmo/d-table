# 基于 Element-UI Table 二次封装表格

> 具体示例参考 `example` 目录

## 安装

```base
$ yarn add @xuanmo/d-table
```

## 使用
### 在 `vue` 项目 `main.js` 引入组件
```js
import Vue from 'vue'
import DTable from '@xuanmo/d-table'
Vue.use(DTable)
```

### 配置 `vue.config.js`
```js
module.exports = {
  transpileDependencies: [
    '@xuanmo/d-table'
  ]
}
```

### 全局配置
在引入 `DTable` 时，可以传入一个全局配置对象。 该对象共支持 `tableConfig` 、 `paginationConfig`  `props` 三个字段。
1. `tableConfig` 用于设置表格，参考 `el-table` 的属性；
1. `paginationConfig` 用于设置分页，参考 `el-pagination` 的属性；
1. `props` 具体说明见后续 props 章节。

### 在页面中使用
#### 基础用法
```html
<d-table
  :request-method="getTableData"
  :show-pagination="false"
/>
```
```js
export default {
  methods: {
    getTableData(params) {
      return {
        header: [
          //  其他属性继承 el-table-column
          // 多级表头直接新增 children 字段即可，每次数据渲染为最后一级
          { name: '头1', column: 'column1', align: 'center' },
          { name: '头2', column: 'column2' },
          { name: '头3', column: 'column3' }
        ],
        data: [
          { column1: 'column1', column2: 'column2', column3: 'column3' },
          { column1: 'column1', column2: 'column2', column3: 'column3' }
        ]
      }
    }
  }
}
```

#### 带插槽用法
```html
<d-table
  :request-method="getTableData"
  :show-pagination="false"
>
  <!-- 继承 Element-UI Table 插槽属性 -->
  <template v-slot:column1="{ row }">{{ row }}</template>
  <template v-slot:slot2="{ row }">{{ row }}</template>
</d-table>
```
```js
export default {
  methods: {
    getTableData(params) {
      return {
        header: [
          { name: '头1', column: 'column1', align: 'center' },
          { name: '头2', column: 'column2', slotName: 'slot2' },
          { name: '头3', column: 'column3' }
        ],
        data: [
          { column1: 'column1', column2: 'column2', column3: 'column3' },
          { column1: 'column1', column2: 'column2', column3: 'column3' }
        ]
      }
    }
  }
}
```

## Attributes
> 备注：`$attrs` 默认用于继承 `el-table` 所有属性，`$listeners` 用于继承 `el-table` 所有事件

|参数|说明|类型|默认值|是否必填|
|---|---|---|---|---|
|auto-request|是否立即执行 `request` 方法|Boolean|true|N|
|request-method|数据源，具体返回参数说明参考 `props`|Function|() => ({ header: [], data: [] })|Y|
|props|配置选项，具体参考下表说明|Object|参考下表|N|
|before-create-header|表头生成之前|Function(header)|-|N|
|creating-header|表头执行创建中|Function(item, index)|-|N|
|selection|是否展示复选框|Boolean|false|N|
|pagination-config|继承 `el-pagination` 属性|Object|{}|N|
|show-pagination|是否展示分页功能|Boolean|true|N|
|pagination-layout|分页布局|String|total, sizes, prev, pager, next, jumper|N|
|page-size|每页请求条数|Number|10|N|
|page-sizes|每页显示个数选择器的选项设置|Array|[10, 20, 40, 60, 80]|N|

### props
|参数|说明|默认值|是否必填|
|---|---|---|---|
|header|表头字段名|header|Y|
|data|表格数据字段名|data|Y|
|page|分页页码字段名|page|N|
|pageSize|每页分页量字段名|pageSize|N|
|total|数据返回总条数字段名|total|N|

## Slots
> 插槽的设置方式为两种，一种需要在 `header` 的每项中设置 `slotName` 字段，用于注册插槽，另一种插槽名字为 `column` 字段，可直接使用
```html
<d-table
  :request-method="getTableData"
>
  <!-- 继承 Element-UI Table 插槽属性 -->
  <template v-slot:column1="{ row }">{{ row }}</template>
  <template v-slot:slot2="{ row }">{{ row }}</template>
</d-table>
```

## Methods
|方法名|说明|参数|
|---|---|---|
|reload|重新渲染表格|-|

## 特殊参数说明
> `header` 每项支持 `formatType` 属性，用于格式化当前列的值，目前支持的具体值如下：

|值|说明|
|---|---|
|money|千分位|
|percent|百分号|
