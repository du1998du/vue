import http from './axios'

// 获取轮播图接口
export function getBanner(){
    return http.get('/getbanner')
}
// 获取商品（首页）接口
export function getIndexGoods(){
    return http.get('/getindexgoods')
}

// 封装获取树型结构的商品分类
export function getCateTree(){
    return http.get('/getcatetree')
}

// 获取分类商品
export function getCateGoods(params){
    return http.get('/getgoods', {
        params
    })
}
// 获取商品详情
export function getGoodsDetail(params){
    return http.get('/getgoodsinfo', {
        params
    })
}
// 登录
export function getLogin(data){
    return http.post('/login', data)
}
// 注册
export function getRegister(data){
    return http.post('/register', data)
}

// 购物车添加
export function getCartAdd(data){
    return http.post('/cartadd', data)
}
// h获取购物车列表
export function getCartList(params){
    return http.get('/cartlist', {
        params
    })
}
// 购物车删除
export function getCartDelete(data){
    return http.post('/cartdelete', data)
}