// 导入角色列表的接口
import {getGoodsList, getGoodsCount} from '../../util/axios'

const state = {
    goodsList : [],
    page: 1,
    size: 2,
    total:0
};  

const getters = {
    getGoodsList(state){
        return state.goodsList
    },
    getGoodsCount(state){
        return state.total
    },
    getSize(state){
        return state.size
    }
};

const mutations = {
    REQ_GOODSLIST(state,payload){
        state.goodsList = payload
    },
    REQ_GOODSCOUNT(state, payload){
        state.total = payload
    },
    REQ_PAGE(state, payload){
        state.page = payload
    }
};

const actions = {
    // 调取接口获取列表数据
    getGoodsListActions(context){
        getGoodsList({
            page:context.state.page,
            size:context.state.size
        })
        .then(res => {
            if(res.data.code == 200){
                // console.log(res);
                let data = res.data.list ? res.data.list : [];
                context.commit('REQ_GOODSLIST', data)
                if(context.state.page != 1 && data.length == 0){
                    context.dispatch('changePageActions', context.state.page-1);
                    context.dispatch('getGoodsCountActions')
                    context.dispatch('getGoodsListActions');
                    return;
                }
            }
        })
        .catch(err =>{
            console.log(err);
        })
    },
    getGoodsCountActions({commit}){
        getGoodsCount()
        .then(res => {
            // console.log(res);
            if(res.data.code == 200){
                commit('REQ_GOODSCOUNT',res.data.list[0].total)
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
        context.dispatch('getGoodsListActions')
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