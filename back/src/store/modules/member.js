
import {getMemberList} from '../../util/axios'

const state = {
    memberList : [],
};  

const getters = {
    getMemberList(state){
        return state.memberList
    },
};

const mutations = {
    REQ_MEMBERLIST(state,payload){
        state.memberList = payload
    },
};

const actions = {
    // 调取接口获取列表数据
    getMemberListActions({commit}){
        getMemberList()
        .then(res => {
            if(res.data.code == 200){
                // console.log(res);
                commit('REQ_MEMBERLIST', res.data.list)
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