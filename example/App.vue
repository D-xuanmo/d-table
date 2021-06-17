<template>
  <div id="app">
    <d-table
      :request-method="getTableData"
      border
      selection
    >
      <!-- <template #column3-1="{ row }">
        {{ row }}
      </template> -->
    </d-table>
  </div>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      header: [
        {
          name: '头1',
          column: 'column1',
          align: 'center',
          formatType: 'percent'
        },
        {
          name: '头2',
          column: 'column2',
          formatType: 'money'
        },
        {
          name: '头3',
          column: 'column3',
          children: [
            {
              name: '头3-1',
              column: 'column3-1'
            }
          ]
        }
      ],

      tableData: [
        {
          column1: 'column1',
          column2: '1234567',
          'column3-1': 1
        },
        {
          column1: 'column1',
          column2: 'column2',
          'column3-1': 2
        }
      ]
    }
  },

  methods: {
    getTableData(params) {
      return {
        header: this.header,
        data: this.tableData,
        total: 2
      }
    }
  }
}
</script>
