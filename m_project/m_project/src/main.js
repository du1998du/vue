// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// 引入rem.js
import './assets/js/remScale'

// 引入重置样式表
import './assets/css/reset.css'

// 引入vant 
import VantUI from 'vant'
// 使用vant
Vue.use(VantUI);
// 引入vant 的样式
import 'vant/lib/index.css'

// 定义全局过滤器
import filters from './filter'
for(let i in filters){
  // console.log(i);
  Vue.filter(i, filters[i])
}

// 在原型上挂载 服务器地址
Vue.prototype.$imgUrl="http://localhost:3000"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
