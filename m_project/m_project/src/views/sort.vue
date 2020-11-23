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
    <div class="cateInfo">
      <!-- 左侧一级分类导航栏 -->
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          v-for="item in firstCateList"
          :key="item.id"
          :title="item.catename"
        />
      </van-sidebar>
      <!-- 右侧 二级分类 -->
      <van-grid :border="false" :column-num="3">
        <van-grid-item v-for="item in secondCateList" :key="item.id" :to="'/goodsList?id='+item.id">
          <van-image :src="$imgUrl+item.img"  class="img"/>
          <p class="catename">{{item.catename}}</p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getCateTree } from "../util/axios";
import {Toast} from 'vant' //引入轻提示
export default {
  data() {
    return {
      activeKey: 0,
      firstCateList: [], //一级分类列表
      secondCateList: [], // 二级分类列表
    };
  },
  mounted() {
    this.getCateTreeInfo();
  },
  methods: {
    onChange(e) {
      // e  是点击的左侧一级分类的索引
    //   console.log(e);
      this.secondCateList = this.firstCateList[e].children
    },
    getCateTreeInfo() {
      getCateTree().then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.firstCateList = res.list;
          this.secondCateList = res.list[this.activeKey].children;
        //   console.log( this.secondCateList);
        }else{
            Toast.fail(res.msg)
        }
      });
    },
  },
};
</script>

<style  lang="" scoped>
.cateInfo{
    display: flex;
}
.van-sidebar {
    width: 1.6rem;
}
.van-grid{
    flex: 1;
}
.catename{
    font-size: 0.18rem;
    color: #666;
    margin-top: 0.15rem;
}
</style>
