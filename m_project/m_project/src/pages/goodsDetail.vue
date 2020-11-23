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
    <!-- 商品详情 -->
    <div v-if="goodsInfo">
      <img :src="$imgUrl + goodsInfo.img" alt="" class="img" />
      <div class="goodsName">
        <span class="tit">商品名称：</span
        ><span class="cont">{{ goodsInfo.goodsname }}</span>
      </div>
      <div class="goodsName">
        <span class="tit">商品价格：</span
        ><span class="cont">&yen;{{ goodsInfo.price | toPrice }}</span>
      </div>
      <div class="goodsName">
        <span class="tit">购买数量：</span>
        <van-stepper v-model="value" />
      </div>
      <div class="goodsName">
        <span class="tit">商品属性：</span>
        <van-tag plain type="primary" v-for="item in specsArr" :key="item">{{
          item
        }}</van-tag>
      </div>
      <div class="goodsName">
        <span class="tit">商品详情：</span>
        <span class="cont" v-html="goodsInfo.description"></span>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服"/>
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-button type="warning" text="加入购物车" @click="goCart"/>
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import { getGoodsDetail, getCartAdd } from "../util/axios";
import { Toast } from "vant"; //引入轻提示
export default {
  data() {
    return {
      goodsInfo: "",
      value: 1,
      specsArr: [],
    };
  },
  mounted() {
    getGoodsDetail({
      id: this.$route.query.id,
    }).then((res) => {
      // console.log(res);
      if (res.code == 200) {
        this.goodsInfo = res.list[0];
        this.specsArr = this.goodsInfo.specsattr
          ? this.goodsInfo.specsattr.split(",")
          : [];
        // console.log(this.specsArr);
      }
    });
  },
  methods:{
    goCart(){
      // 判断是否登录， 登录后才可以添加到购物车，否则不可以，提示未登录
      if(sessionStorage.getItem('userInfo')){
        //取出用户的uid
        // let uid = JSON.parse(sessionStorage.getItem('userInfo')).uid;
        // // 获取商品id
        // let goodsId = this.goodsInfo.id;
        getCartAdd({
          uid: JSON.parse(sessionStorage.getItem('userInfo')).uid,
          goodsid: this.goodsInfo.id,
          num: this.value
        }).then(res => {
          // console.log(res);
          if(res.code == 200){
            Toast.success(res.msg);
            this.$router.push({
              path:'/cart',
              query:{
                id: JSON.parse(sessionStorage.getItem('userInfo')).uid
              }
            })
          }
        })
      }else{
        Toast.fail('当前未登录，请先登录');
        this.$router.push('/login')
      }
    }
  }
};
</script>

<style scoped>
.img {
  width: 100%;
}
.goodsName {
  line-height: 0.3rem;
  font-size: 0.2rem;
  padding: 0.2rem 0.15rem;
  display: flex;
}
.tit {
  color: #666;
  margin-right: 0.2rem;
}
.cont {
  font-size: 0.24rem;
  color: #333;
}
.van-tag {
  padding: 5px 10px;
  margin-right: 0.1rem;
}
</style>
