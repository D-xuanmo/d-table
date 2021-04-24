import DTable from './table'
import './style.scss'

export default {
  install(Vue, option) {
    Vue.component(DTable.name, DTable)
    Vue.prototype.$DTable = option
  }
}
