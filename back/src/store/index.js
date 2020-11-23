// 引入 vue核心库
import Vue from 'vue'
// 引入vuex核心库
import Vuex from 'vuex'
// 调用vuex插件
Vue.use(Vuex)
// 导入封装好的菜单模块
import menu from './modules/menu'
// 导入封装好的 角色模块
import role from './modules/role'
// 导入 管理员模块
import user from './modules/user'
// 导入商品分类 模块
import cate from './modules/cate'
// 导入商品规格模块
import specs from './modules/specs'
// 导入商品管理模块
import goods from './modules/goods'
// 导入轮播图模块
import banner from './modules/banner'
// 导入秒杀模块
import seck from './modules/seck'
// 导入会员模块
import member from './modules/member'

// 导出实例化仓库
export default new Vuex.Store({
    state: {
        userInfo: sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : null
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo
        }
    },
    mutations: {
        CHANGE_USERINFO(state, payload) {
            state.userInfo = payload;
            //如果这个payload有值 我们就存到本地存储否则就删除本地存储
            if (payload) {
                sessionStorage.setItem('userInfo', JSON.stringify(payload))
            }else{
                sessionStorage.removeItem('userInfo')
            }
        }
    },
    actions: {
        getUserInfoActions({ commit }, payload) {
            commit('CHANGE_USERINFO', payload)
        }
    },
    modules: {
        menu,
        role,
        user,
        cate,
        specs,
        goods,
        banner,
        seck,
        member
    }
})