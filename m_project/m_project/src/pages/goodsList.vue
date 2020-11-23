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
    <!-- 商品列表 -->
    <van-list>
      <van-card
        @click="goDetail(item.id)"
        v-for="item in goodsList"
        :key="item.id"
        :price="item.price | toPrice"
        :title="item.goodsname"
        :thumb="$imgUrl + item.img"
        desc="这个商品是爆款"
      />
    </van-list>
  </div>
</template>
 
<script>
import { getCateGoods } from "../util/axios";
import { Toast } from "vant"; //引入轻提示
export default {
  data() {
    return {
      goodsList: [],
    };
  },
  mounted() {
    this.getCateGoodsList();
  },
  methods: {
    getCateGoodsList() {
      getCateGoods({
        fid: this.$route.query.id,
      }).then((res) => {
        if (res.code == 200) {
          this.goodsList = res.list;
        } else {
          Toast.fail("res.msg");
        }
      });
    },
    //   点击商品  跳转到商品详情
    goDetail(id) {
      console.log(id);
      this.$router.push({
        path: "/goodsDetail",
        query: {
          id,
        },
      });
    },
  },
};
</script>
 
<style scoped>
</style>