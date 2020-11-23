<template>
  <div>
    <!-- 面包屑组件 -->
    <v-bread></v-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" @click="show">添加</el-button>
    <!-- 显示列表 -->
    <goods-list @edit="edit"></goods-list>
    <!-- 点击 添加，弹出添加框 -->
    <goods-add :addInfo="addInfo" @cancel="cancel" ref="dialog"/>
  </div>
</template>
 
<script>
// 引入面包屑组件
import vBread from "../../components/breadcrumb";
// 引入列表组件
import goodsList from "./goodsList";
// 引入添加 弹出框
import goodsAdd from "./goodsAdd";
export default {
  data() {
    return {
      addInfo: {
        isShow: false,
        isAdd: true,
      },
    };
  },
  components: {
    vBread,
    goodsList,
    goodsAdd,
  },
  methods: {
    show() {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = true;
    },
    cancel(e) {
      this.addInfo.isShow = e;
    },
    edit(e) {
      this.addInfo.isShow = true; 
      this.addInfo.isAdd = false;
      this.$refs.dialog.getGoodsInfo(e)
    },
  },
};
</script>
 
<style scoped>
.el-button {
  margin: 20px 0;
}
</style>