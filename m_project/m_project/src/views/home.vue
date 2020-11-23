<template>
  <div class="wrap">
    <!-- 导航栏 -->
    <van-nav-bar :title="$route.meta.name" />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="red">
      <van-swipe-item v-for="item in bannerList" :key="item.id">
        <img :src="$imgUrl + item.img" alt="" class="bannerImg" />
      </van-swipe-item>
    </van-swipe>
    <!-- 宫格展示 -->
    <van-grid :border="false" :column-num="4">
      <van-grid-item>
        <img src="../assets/images/icon_1.jpg" />
        <p>限时抢购</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/images/icon_2.jpg" />
        <p>积分商城</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../assets/images/icon_3.jpg" />
        <p>联系我们</p>
      </van-grid-item>
      <van-grid-item to="/sort">
        <img src="../assets/images/icon_4.jpg" />
        <p>商品分类</p>
      </van-grid-item>
    </van-grid>
    <!-- 商品展示 -->
    <van-tabs  type="card">
      <van-tab title="发现新品">
        <van-card
        v-for="item in newList" :key="item.id"
          :price="item.price | toPrice"
          desc="描述信息"
          :title="item.goodsname"
          :thumb="$imgUrl+item.img"
        />
      </van-tab>
      <van-tab title="热门推荐">
        <van-card
          v-for="item in hotList" :key="item.id"
          :price="item.price | toPrice"
          desc="描述信息"
          :title="item.goodsname"
          :thumb="$imgUrl+item.img"
        />
      </van-tab>
      <van-tab title="所有商品">
        <van-card
          v-for="item in allList" :key="item.id"
          :price="item.price | toPrice"
          desc="描述信息"
          :title="item.goodsname"
          :thumb="$imgUrl+item.img"
        />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getBanner, getIndexGoods } from "../util/axios";
import axios from 'axios'
// 导入轻提示
import {Toast} from 'vant'
export default {
  data() {
    return {
      bannerList: [],
      newList:[],
      hotList:[],
      allList:[]
    };
  },
  mounted() {
    // getBanner().then((res) => {
    //   // console.log(res);
    //   if (res.code == 200) {
    //     this.bannerList = res.list;
    //   }
    // });  
    // console.log(this);
    // getIndexGoods().then(res => {
    //   console.log(res);
    // })
    // 并发处理
    axios.all([getBanner(), getIndexGoods()]).then(
      axios.spread((bannerList,indexGoods) => {
        if(bannerList.code == 200){
          this.bannerList = bannerList.list
        }else{
          Toast.fail(bannerList.msg)
        }
        if(indexGoods.code == 200){
          this.newList = indexGoods.list[0].content
          this.hotList = indexGoods.list[1].content
          this.allList = indexGoods.list[2].content
        }
      })
    )
  },
};
</script>

<style lang="" scoped>
.wrap{
  padding-bottom: 1.5rem;
}
.van-swipe {
  margin-bottom: 0.2rem;
}
.bannerImg {
  width: 100%;
}
.van-grid-item p {
  font-size: 0.3rem;
  color: #666;
  margin-top: 0.15rem;
}
.van-tabs {
  margin-top: 0.2rem;
}
</style>
