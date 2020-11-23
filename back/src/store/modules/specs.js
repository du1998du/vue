// 导入管理员列表接口 列表总数的接口
import { getSpecsList, getSpecsCount } from '../../util/axios'
const state = {
    specsList:[],
    allList:[],
    page: 1,
    size: 2,
    total:0,

}

const getters = {
    getSpecsList(){
        return state.specsList
    },
    getSpecsCount(){
        return state.total
    },
    getSize(){
        return state.size
    },
    getAllList(){
        return state.allList
    }
}
const mutations = {
    // 管理员列表
    REQ_SPECSLIST(state, payload){
        state.specsList = payload
    },
    // // 管理员总数
    REQ_SPECSCOUNT(state, payload){
        state.total = payload
    },
    REQ_PAGE(state, payload){
        state.page = payload
    },
    REQ_ALLSPECSLIST(state, payload){
        state.allList = payload
    }
}
const actions = {
    // 管理员列表
    getSpecsListActions(context) {
        // console.log(context);
        getSpecsList({
            page:context.state.page,
            size:context.state.size
        })
        .then(res => {
            if(res.data.code == 200){
                // console.log(res.data.list);
                let data = res.data.list ? res.data.list : []
                context.commit('REQ_SPECSLIST', data);
                if(context.state.page !=1 && data.length == 0){
                    context.dispatch('changePageActions', context.state.page - 1)
                    context.dispatch('getSpecsCountActions')
                    context.dispatch('getSpecsListActions')
                }
            }
        })
        .catch(err => {
            console.log('请求出错',err);
        })
    },
    // 管理员总数接口
    getSpecsCountActions({commit}){
        getSpecsCount()
        .then(res => {
            // console.log(res);
            if(res.data.code == 200){
                commit('REQ_SPECSCOUNT',res.data.list[0].total)
            }
        })
        .catch(err => {
            console.log('查询出错', err);
        })
    },
    // // 点击页数，改变显示的页数
    changePageActions(context, payload){
        context.commit('REQ_PAGE', payload);
        // 点击页数，更新列表
        context.dispatch('getSpecsListActions')
    },

    // 所有的规格
    getAllSpecsListActions(context) {
        // console.log(context);
        getSpecsList()
        .then(res => {
            if(res.data.code == 200){
                // console.log(res.data.list);
                context.commit('REQ_ALLSPECSLIST', res.data.list);
            }
        })
        .catch(err => {
            console.log('请求出错',err);
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}