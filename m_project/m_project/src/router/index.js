import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/index',
      component: () => import('../pages/index'),
      children: [
        {
          path: '/home',
          component: () => import('../views/home'),
          meta: { //自定配置标签
            name: '首页'
          }
        },
        {
          path: '/cart',
          component: () => import('../views/cart'),
          meta: { //自定配置标签
            name: '购物车'
          }
        },
        {
          path: '/mine',
          component: () => import('../views/mine'),
          meta: { //自定配置标签
            name: '个人中心'
          }
        },
        {
          path: '/sort',
          component: () => import('../views/sort'),
          meta: { //自定配置标签
            name: '商品分类'
          }
        },
        {
          path: '',
          redirect: '/home'
        },
      ]
    },
    {
      path: '/login',
      component: () => import('../pages/login'),
      meta: {
        name: '登录'
      }
    },
    {
      path: '/register',
      component: () => import('../pages/register'),
      meta: {
        name: '注册'
      }
    },
    {
      path: '/goodsList',
      component: () => import('../pages/goodsList'),
      meta: {
        name: '商品列表'
      }
    },
    {
      path: '/goodsDetail',
      component: () => import('../pages/goodsDetail'),
      meta: {
        name: '商品详情'
      }
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})

// 全局导航守卫， 登录拦截

export default router
