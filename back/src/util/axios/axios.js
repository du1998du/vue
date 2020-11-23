// 导入axios
import axios from 'axios'
import router from '../../router';
// 重新创建一个axios实例
const http = axios.create({
    baseURL: '/api'
});

// 拦截器
// 请求拦截，一般用在请求头加信息
http.interceptors.request.use(req => {
    // 将登陆成功后得到的token，从离线存储中取出来，赋值给
    let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {};
    //需要在请求头加内容
    //后端要求的令牌名字叫 authorization
    req.headers.authorization = userInfo.token;
    // req.headers.authorization = 111;
    return req;
})

// 响应拦截
http.interceptors.response.use(res => {
    // console.log(res);
    // 全局拦截错误
    if (res.data.code == 403) {
        alert(res.data.msg);
        router.push('/login');
        return res
    } else if (res.data.code == 500) {
        alert(res.data.msg);
        //全局拦截错误之后，跳转到登录
        router.push('/login')
        return res
    } else {
        return res
    }

})

// 导出 定义的http
export default http