// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入重置样式表
import './assets/css/reset.css'

// 引入element-ui
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI)

// 引入vuex状态管理
import store from './store/index'

Vue.config.productionTip = false
Vue.prototype.$imgUrl = 'http://localhost:3000'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
