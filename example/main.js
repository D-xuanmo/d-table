import Vue from 'vue'
import App from './App.vue'

import DTable from '../src'
Vue.use(DTable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
