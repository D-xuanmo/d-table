import { Table, TableColumn, Pagination } from 'element-ui'
import { moneyFormat, isEmpty } from './utils'

export default {
  name: 'DTable',

  components: {
    Table,
    TableColumn,
    Pagination
  },

  props: {
    autoRequest: {
      type: Boolean,
      default: true
    },
    // 生成表格数据
    requestMethod: {
      type: Function,
      required: true,
      default: () => {}
    },
    props: {
      type: Object,
      default: () => ({})
    },
    beforeCreateHeader: {
      type: Function,
      default: () => {}
    },
    creatingHeader: {
      type: Function,
      default: (header) => header
    },

    selection: {
      type: Boolean,
      default: false
    },

    // 用于继承 element-ui pagination 属性
    paginationConfig: {
      type: Object,
      default: () => ({})
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    paginationLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 40, 60, 100]
    }
  },

  data() {
    return {
      tableHeader: [],
      tableData: [],
      total: 0,
      page: 1,
      innerPageSize: this.pageSize
    }
  },

  computed: {
    innerProps() {
      return {
        header: this.props.header || this.$DTable?.props.header || 'header',
        data: this.props.data || this.$DTable?.props.data || 'data',
        page: this.props.page || this.$DTable?.props.page || 'page',
        pageSize: this.props.pageSize || this.$DTable?.props.pageSize || 'pageSize',
        total: this.props.total || this.$DTable?.props.total || 'total'
      }
    },

    // 表格配置
    innerTableConfig() {
      return {
        ...(this.$DTable?.tableConfig || {}),
        ...this.$attrs
      }
    },

    // 分页配置
    innerPaginationConfig() {
      return {
        ...(this.$DTable?.paginationConfig || {}),
        ...this.paginationConfig
      }
    }
  },

  created() {
    this.autoRequest && this.init()
  },

  methods: {
    reload() {
      this.page = 1
      this.init()
    },

    async init() {
      const result = await this.requestMethod({
        [this.innerProps.page]: this.page,
        [this.innerProps.pageSize]: this.innerPageSize
      })
      this.tableHeader = this.createHeader(result[this.innerProps.header])
      this.tableData = result[this.innerProps.data]
      this.total = result[this.innerProps.total] || 0
      this.page = result[this.innerProps.page] || 1
      this.innerPageSize = result[this.innerProps.pageSize] || this.pageSizes[0]
    },

    // 创建表头
    createHeader(header) {
      typeof this.beforeCreateHeader === 'function' &&
        this.beforeCreateHeader(header)

      if (Array.isArray(header)) {
        // 显示复选框
        if (this.selection) {
          header.unshift({
            type: 'selection',
            column: 'selection',
            align: 'center'
          })
        }

        header.map((item, index) => {
          if (typeof this.creatingHeader === 'function') {
            item = this.creatingHeader(item, index)
          }

          /* eslint-disable */
          switch (item.formatType) {
            case 'money':
              item.formatter = (row, column, cellValue) => `${moneyFormat(cellValue)}`
              break
            case 'percent':
              item.formatter = (row, column, cellValue) => isEmpty(cellValue) ? '' : `${cellValue}%`
              break
          }
          /* eslint-disable */
          return item
        })
      }
      return header
    },

    currentPageChange(page) {
      this.page = page
      this.init()
      this.$emit('current-page-change', page)
    },

    pageSizeChange(size) {
      this.page = 1
      this.innerPageSize = size
      this.init()
      this.$emit('page-size-change', size)
    }
  },

  render() {
    const headerRender = (headers) => {
      return headers.map((item, index) => {
        const slotName = item.slotName || item.column
        return (
          <TableColumn
            attrs={item}
            key={index}
            prop={item.column}
            label={item.name}
          >
            {
              Array.isArray(item.children) && item.children.length
                ? headerRender(item.children)
                : this.$scopedSlots[slotName]
            }
          </TableColumn>
        )
      })
    }

    return (
      <div class="d-table__wrapper">
        <Table
          data={this.tableData}
          attrs={this.innerTableConfig}
          on={this.$listeners}
        >
          { headerRender(this.tableHeader) }
        </Table>

        {this.showPagination && (
          <Pagination
            class="d-table__pagination"
            layout={this.paginationLayout}
            current-page_sync={this.page}
            total={this.total}
            page-sizes={this.pageSizes}
            attrs={this.innerPaginationConfig}
            vOn:current-change={this.currentPageChange}
            vOn:size-change={this.pageSizeChange}
          />
        )}
      </div>
    )
  }
}
