// 导入商品分类列表的接口
import {getCateList} from '../../util/axios'

const state = {
    cateList : []
};  

const getters = {
    geteCateList(state){
        return state.cateList
    }
};

const mutations = {
    REQ_CATELIST(state,payload){
        state.cateList = payload
    }
};

const actions = {
    // 调取接口获取列表数据
    getCateListActions({commit}){
        getCateList({
            istree:true
        })
        .then(res=>{
            // console.log(res,'响应')
            if(res.data.code==200){
                commit("REQ_CATELIST",res.data.list)
            }
        })
        .catch(err=>{
            console.log(err,'错误响应')
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