<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      :title="$route.meta.name"
      left-arrow
      @click-left="$router.go(-1)"
    >
      <template #right>
        <van-icon name="ellipsis" size="24" />
      </template>
    </van-nav-bar>
    <!-- 头像 -->
    <div class="wrap" v-if="!userInfo">
      <div class="head">
        <van-image
          width="2rem"
          height="2rem"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <p class="username">fsdfdsf</p>
      </div>
      <van-button @click="$router.push('/login')" type="warning" round
        >未登录，请登录</van-button
      >
    </div>

    <div class="wrap" v-else>
      <div class="head">
        <van-image
          width="2rem"
          height="2rem"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <p class="username">{{userInfo.nickname}}</p>
      </div>
      <div>
          <van-cell title="地址管理" icon="location-o" />
          <van-cell title="我的钱包" icon="balance-list-o" />
          <van-cell title="我的优惠券" icon="coupon-o" />
          <van-cell title="我的二维码" icon="aim" />
      </div>
      
      <van-button @click="exit" type="warning" round
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: "",
    };
  },
  mounted() {
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : "";
  },
  methods:{
    exit(){
      this.$router.push('/login')
      sessionStorage.removeItem('userInfo')
    }
  }
};
</script>

<style  lang="" scoped>
.wrap {
  text-align: center;
}
.head {
  display: flex;
  margin: 0.2rem;
}
.head p {
  font-size: 0.35rem;
  color: #333;
  line-height: 2rem;
  margin-left: 0.3rem;
}
.van-button {
  margin-top: 0.3rem;
  width: 50%;
}
.van-cell{
    text-align: left;
}
</style>
