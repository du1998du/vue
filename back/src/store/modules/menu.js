import { getMenuList, getUserList} from '../../util/axios'
const state={
    menuList: [],
    userMenu:[]
};

const getters={
    getMenuList(state){
        return state.menuList
    },

    getUserMenu(state){
        return state.userMenu
    }
};

const mutations={
    REQ_MENULIST(state, payload){
        state.menuList = payload
    },

    REQ_USERMENU(state, payload){
        state.userMenu = payload
    }
};

const actions={
    getMenuListAction({commit}){
        getMenuList({
            istree: true
        })
        .then(res => {
            if(res.data.code == 200){
                commit('REQ_MENULIST', res.data.list)
            }
        })
        .catch(err => {
            console.log(err);
        });
    },

    getUserListAction({commit}){
        let menu = JSON.parse(sessionStorage.getItem('userInfo')).menus;
        // console.log(menu);
        commit('REQ_USERMENU', menu)
    }
}

export default{
    state,
    getters,
    mutations,
    actions,
    namespaced: true  //m命名空间
}
