<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      :title="$route.meta.name"
      left-arrow
      @click-left="$router.go(-1)"
      right-text="注册"
      @click-right="$router.push('/register')"
    >
    </van-nav-bar>

    <van-form @submit="login">
      <van-field
        v-model="userInfo.phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        v-model="userInfo.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getLogin } from "../util/axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      userInfo: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
        // console.log(this.userInfo);
        getLogin(this.userInfo).then(res => {
            // console.log(res);
            if(res.code == 200){
                Toast.success(res.msg)
                //把数据存储到本地存储中
                  sessionStorage.setItem('userInfo',JSON.stringify(res.list))
                  //成功之后跳转到个人中心
                  this.$router.push('/mine')
            }else{
                Toast.fail(res.msg)
            }
        })
    },
  },
};
</script>

<style  lang="" scoped>
</style>
