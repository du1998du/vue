// 导入角色列表的接口
import {getRoleList} from '../../util/axios'

const state = {
    roleList : []
};  

const getters = {
    geteRoleList(state){
        return state.roleList
    }
};

const mutations = {
    REQ_ROLELIST(state,payload){
        state.roleList = payload
    }
};

const actions = {
    // 调取接口获取列表数据
    getRoleListActions({commit}){
        getRoleList()
        .then(res => {
            if(res.data.code == 200){
                // console.log(res);
                commit('REQ_ROLELIST', res.data.list)
            }
        })
        .catch(err =>{
            console.log(err);
        })
    }
}

export default{
    state,
    getters,
    mutations,
    actions,
    // 命名空间
    namespaced: true
}