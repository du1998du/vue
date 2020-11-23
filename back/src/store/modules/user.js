// 导入管理员列表接口 列表总数的接口
import { getUserList, getUserCount } from '../../util/axios'
const state = {
    userList:[],
    page: 1,
    size: 2,
    total:0
}

const getters = {
    getUserList(){
        return state.userList
    },
    getUserCount(){
        return state.total
    },
    getSize(){
        return state.size
    }
}
const mutations = {
    // 管理员列表
    REQ_USERLIST(state, payload){
        state.userList = payload
    },
    // 管理员总数
    REQ_USERCOUNT(state, payload){
        state.total = payload
    },
    REQ_PAGE(state, payload){
        state.page = payload
    }
}
const actions = {
    // 管理员列表
    getUserListActions(context) {
        // console.log(context);
        getUserList({
            page:context.state.page,
            size:context.state.size
        })
        .then(res => {
            if(res.data.code == 200){
                let data = res.data.list ? res.data.list : []
                context.commit('REQ_USERLIST', data);
                // 判断是不是第一页，且这个列表的当前页等于0
                if(context.state.page != 1 && data.length == 0){
                    // 重新调取 修改页码的行动
                    context.dispatch('changePageActions', context.state.page-1);
                    // 重新调取  总数行动
                    context.dispatch('getUserCountActions')
                    // 重新调取列表
                    context.dispatch('getUserListActions');
                    return
                }
            }
        })
        .catch(err => {
            console.log('请求出错',err);
        })
    },
    // 管理员总数接口
    getUserCountActions({commit}){
        getUserCount()
        .then(res => {
            // console.log(res);
            if(res.data.code == 200){
                commit('REQ_USERCOUNT',res.data.list[0].total)
            }
        })
        .catch(err => {
            console.log('查询出错', err);
        })
    },
    // 点击页数，改变显示的页数
    changePageActions(context, payload){
        context.commit('REQ_PAGE', payload);
        // 点击页数，更新列表
        context.dispatch('getUserListActions')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}