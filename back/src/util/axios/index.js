// 导入封装好的axios
import http from './axios'

// 导出封装好的接口
// 菜单管理的接口
// 封装添加菜单的接口
export function getMenuAdd(data){
    return http.post('/api/menuadd', data)
}
// 封装获取菜单列表的接口
export function getMenuList(params){
    return http.get('/api/menulist', {
        params
    })
}
// 封装获取菜单（一条）的接口
export function getMenuInfo(params){
    return http.get('/api/menuinfo', {
        params
    })
}
// 封装修改菜单的接口
export function getMenuEdit(data){
    return http.post('/api/menuedit', data)
}
// 封装删除菜单的接口
export function getMenuDelete(data){
    return http.post('/api/menudelete', data)
}

// 封装角色模块的接口
// 封装角色添加接口
export function getRoleAdd(data){
    return http.post('/api/roleadd',data)
}
// 封装角色列表获取接口
export function getRoleList(params){
    return http.get('/api/rolelist',{
        params
    })
}
// 封装角色获取一条接口
export function getRoleInfo(params){
    return http.get('/api/roleinfo',{
        params
    })
}
// 封装角色修改接口
export function getRoleEdit(data){
    return http.post('/api/roleedit', data)
}
// 封装角色删除接口
export function getRoleDelete(data){
    return http.post('/api/roledelete', data)
}

// 封装管理员模块接口
// 封装管理员添加接口
export function getUserAdd(data){
    return http.post('/api/useradd',data)
}
// 封装管理员总数接口
export function getUserCount(){
    return http.get('/api/usercount')
}
// 封装管理员列表（分页）接口
export function getUserList(params){
    return http.get('/api/userlist',{
        params
    })
}
// 封装管理员获取(一条)接口
export function getUserInfo(params){
    return http.get('/api/userinfo', {
        params
    })
}
// 封装管理员修改接口
export function UserEdit(data){
    return http.post('/api/useredit', data)
}
// 封装管理员删除接口
export function UserDelete(data){
    return http.post('/api/userdelete', data)
}
// 封装 管理员登录接口
export function UserLogin(data){
    return http.post('/api/userlogin', data)
}

// 封装商品分类的接口
// 商品分类添加接口
export function getCateAdd(data){
    return http.post('/api/cateadd',data)
}
// 商品分类列表接口
export function getCateList(params){
    return http.get('/api/catelist',{
        params
    })
}
// 商品分类获取一条接口
export function getCateInfo(params){
    return http.get('/api/cateinfo', {
        params
    })
}
// 商品分类修改接口
export function getCateEdit(data){
    return http.post('/api/cateedit', data)
}
// 商品分类删除接口
export function getCateDelete(data){
    return http.post('/api/catedelete', data)
}

// 商品规格接口
// 商品规格添加接口
export function getSpecsAdd(data){
    return http.post('/api/specsadd',data)
}
// 商品规格列表接口
export function getSpecsList(params){
    return http.get('/api/specslist',{
        params
    })
}
// 获取商品规格总数
export function getSpecsCount(){
    return http.get('/api/specscount')
}
// 商品规格获取一条接口
export function getSpecsInfo(params){
    return http.get('/api/specsinfo', {
        params
    })
}
// 商品规格修改接口
export function getSpecsEdit(data){
    return http.post('/api/specsedit', data)
}
// 商品规格删除接口
export function getSpecsDelete(data){
    return http.post('/api/specsdelete', data)
}

// 商品信息接口
// 商品信息添加
export function getGoodsAdd(data){
    return http.post('/api/goodsadd',data)
}
// 封装商品信息总数接口
export function getGoodsCount(){
    return http.get('/api/goodscount')
}
// 封装商品信息列表（分页）接口
export function getGoodsList(params){
    return http.get('/api/goodslist',{
        params
    })
}
// 封装商品信息获取(一条)接口
export function getGoodsInfo(params){
    return http.get('/api/goodsinfo', {
        params
    })
}
// 封装商品信息修改接口
export function getGoodsEdit(data){
    return http.post('/api/goodsedit', data)
}
// 封装商品信息删除接口
export function getGoodsDelete(data){
    return http.post('/api/goodsdelete', data)
}

// 会员信息 接口
// 会员列表接口
export function getMemberList(){
    return http.get('/api/memberlist')
}
// 会员 获取一条接口
export function getMemberInfo(params){
    return http.get('/api/memberinfo', {
        params
    })
}
// 会员 修改接口
export function getMemberEdit(data){
    return http.post('/api/memberedit', data)
}

// 轮播图接口
// 轮播图添加接口
export function getBannerAdd(data){
    return http.post('/api/banneradd',data)
}
// 轮播图列表接口
export function getBannerList(){
    return http.get('/api/bannerlist')
}
// 轮播图获取一条接口
export function getBannerInfo(params){
    return http.get('/api/bannerinfo', {
        params
    })
}
// 轮播图修改接口
export function getBannerEdit(data){
    return http.post('/api/banneredit', data)
}
// 轮播图删除接口
export function getBannerDelete(data){
    return http.post('/api/bannerdelete', data)
}

// 秒杀管理接口
// 秒杀管理添加接口
export function getSeckAdd(data){
    return http.post('/api/seckadd',data)
}
// 秒杀管理列表接口
export function getSeckList(){
    return http.get('/api/secklist')
}
// 秒杀管理获取一条接口
export function getSeckInfo(params){
    return http.get('/api/seckinfo', {
        params
    })
}
// 秒杀管理修改接口
export function getSeckEdit(data){
    return http.post('/api/seckedit', data)
}
// 秒杀管理删除接口
export function getSeckDelete(data){
    return http.post('/api/seckdelete', data)
}