<template>
  <div>
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <!-- 
        底部导航 
      active-color 被选中的颜色  
      inactive-color 默认颜色
      route	是否开启路由模式
      replace	是否在跳转时替换当前页面历史	
      不加replace默认是push
        -->
    <van-tabbar v-model="active" active-color="#f60" router>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/sort">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/mine">个人中心</van-tabbar-item>
    </van-tabbar>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="" scoped>

</style>
