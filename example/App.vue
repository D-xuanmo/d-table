<template>
  <div id="app">
    <d-table
      :request-method="getTableData"
      border
    ></d-table>
  </div>
</template>

<script>
export default {
  name: 'App',

  methods: {
    getTableData(params) {
      return {
        header: [
          {
            name: '头1',
            column: 'column1',
            align: 'center'
          },
          {
            name: '头2',
            column: 'column2'
          },
          {
            name: '头3',
            column: 'column3'
          }
        ],
        data: [
          {
            column1: 'column1',
            column2: 'column2',
            column3: 'column3'
          },
          {
            column1: 'column1',
            column2: 'column2',
            column3: 'column3'
          }
        ],
        total: 2
      }
    }
  }
}
</script>
