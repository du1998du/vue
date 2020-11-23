
import {getBannerList} from '../../util/axios'

const state = {
    bannerList : [],
};  

const getters = {
    getBannerList(state){
        return state.bannerList
    },
};

const mutations = {
    REQ_BANNERLIST(state,payload){
        state.bannerList = payload
    },
};

const actions = {
    // 调取接口获取列表数据
    getBannerListActions({commit}){
        getBannerList()
        .then(res => {
            if(res.data.code == 200){
                // console.log(res);
                commit('REQ_BANNERLIST', res.data.list)
            }
        })
        .catch(err =>{
            console.log(err);
        })
    },
}

export default{
    state,
    getters,
    mutations,
    actions,
    // 命名空间
    namespaced: true
}