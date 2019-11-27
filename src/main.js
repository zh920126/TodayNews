import Vue from 'vue'
import App from './App.vue'
// 引入路由文件
import router from '@/router/index.js'
import { Toast, Uploader, Dialog, Field, Picker, Cell, CellGroup, Icon, Tab, Tabs, List, PullRefresh, Button, Tabbar, TabbarItem } from 'vant'

// 经过下面的挂载，后期可以直接通过this.$来使用组件
import 'vant/lib/index.css'

Vue.use(Tabbar).use(TabbarItem)

Vue.use(Button)

Vue.use(PullRefresh)

Vue.use(List)

Vue.use(Tab).use(Tabs)

Vue.use(Icon)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Toast)
Vue.use(Field)
Vue.use(Picker)
Vue.use(Cell).use(CellGroup)
Vue.config.productionTip = false
new Vue({
  // 注册路由
  router,
  render: h => h(App)
}).$mount('#app')
