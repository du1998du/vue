<template>
  <div>
    <!-- 面包屑组件 -->
    <v-bread></v-bread>
    <!-- 添加按钮 -->
    <el-button type="primary"  size="small" @click="show">添加</el-button>
    <!-- 列表 -->
    <cate-list @update="edit"></cate-list>
    <!-- 添加弹出框 -->
    <cate-add :addInfo="addInfo" @cancel="cancel" ref="dialog"></cate-add>
  </div>
</template>
 
<script>
// 导入面包屑组件
import vBread from "../../components/breadcrumb";
// 导入列表组件
import cateList from "./cateList";
// 导入添加弹出框
import cateAdd from "./cateAdd";
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
    cateList,
    cateAdd,
  },
  methods: {
    show() {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = true;
    },
    //   关闭弹窗
    cancel(e) {
      this.addInfo.isShow = e;
    },
    edit(e){
        this.addInfo.isShow = true,
        this.addInfo.isAdd = false
        // console.log(this.$refs.dialog);
        this.$refs.dialog.getCateInfo(e)
    }
  },
};
</script>
 
<style scoped lang="stylus">
.el-button {
  margin: 20px 0;
}
</style>