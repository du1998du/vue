
import {getSeckList} from '../../util/axios'

const state = {
    seckList : [],
};  

const getters = {
    getSeckList(state){
        return state.seckList
    },
};

const mutations = {
    REQ_SECKLIST(state,payload){
        state.seckList = payload
    },
};

const actions = {
    // 调取接口获取列表数据
    getSeckListActions({commit}){
        getSeckList()
        .then(res => {
            if(res.data.code == 200){
                // console.log(res);
                commit('REQ_SECKLIST', res.data.list)
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