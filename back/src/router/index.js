import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

Vue.use(Router)

// 封装一个函数，用来检测是否存在该地址
//some 有一个真就返回真
function hasUrl(url){
  return Store.state.userInfo.menus_url.some(item => item == url)
}

// 分离出二级路由
export let indexRoutes = [
  {
    path: '/menu',
    component: () => import('../views/menu/menu'),
    name: '菜单管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/menu') ? next() : next('/home')
    }
  },
  {
    path: '/role',
    component: () => import('../views/role/role'),
    name: '角色管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/role') ? next() : next('/home')
    }
  },
  {
    path: '/admin',
    component: () => import('../views/admin/admin'),
    name: '管理员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/admin') ? next() : next('/home')
    }
  },
  {
    path: '/cate',
    component: () => import('../views/cate/cate'),
    name: '商品分类',
    beforeEnter: (to, from, next) => {
      hasUrl('/cate') ? next() : next('/home')
    }
  },
  {
    path: '/specs',
    component: () => import('../views/specs/specs'),
    name: '商品规格',
    beforeEnter: (to, from, next) => {
      hasUrl('/specs') ? next() : next('/home')
    }
  },
  {
    path: '/goods',
    component: () => import('../views/goods/goods'),
    name: '商品管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/goods') ? next() : next('/home')
    }
  },
  {
    path: '/member',
    component: () => import('../views/member/member'),
    name: '会员管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/member') ? next() : next('/home')
    }
  },
  {
    path: '/banner',
    component: () => import('../views/banner/banner'),
    name: '轮播图管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/banner') ? next() : next('/home')
    }
  },
  {
    path: '/seck',
    component: () => import('../views/seck/seck'),
    name: '秒杀管理',
    beforeEnter: (to, from, next) => {
      hasUrl('/seck') ? next() : next('/home')
    }
  }
]

let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('../pages/login')
    },
    {
      path: '/index',
      component: () => import('../pages/index'),
      children: [

        {
          path: '/home',
          component: () => import('../views/home')
        },
        ...indexRoutes,
        // 二级路由重定向
        {
          path: '',
          redirect: '/menu'
        }
      ]
    },
    {
      path: '*',
      redirect: '/login'
    },
  ]
});

// 全局导航守卫  登录拦截
// 如果去login页面， 不拦截next()
// 如果不是登录页 ，判断是否登陆过， 登陆过next
// 反之跳转到登录页

router.beforeEach((to,from,next) => {
  // 判断是否去登录页
  if(to.path == '/login'){
    next();
    return;
  }
  // 判断是否登录过
  if(sessionStorage.getItem('userInfo')){
    next();
    return;
  }
  // 以上都不是 ，跳转到登录页
  next('/login')
})


export default router
