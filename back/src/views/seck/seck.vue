<template>
  <div>
    <!-- 面包屑组件 -->
    <v-bread></v-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" @click="show">添加</el-button>
    <!-- 显示列表 -->
    <seck-list @edit="edit" />
    <!-- 点击 添加，弹出添加框 -->
    <seck-add :addInfo="addInfo" @cancel="cancel" ref="dialog"/>
  </div>
</template>
 
<script>
// 引入面包屑组件
import vBread from "../../components/breadcrumb";
// 引入列表组件
import seckList from "./seckList";
// 引入添加 弹出框
import seckAdd from "./seckAdd";
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
    seckList,
    seckAdd,
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
      this.$refs.dialog.getSeckInfo(e)
    },
  },
};
</script>
 
<style scoped>
.el-button {
  margin: 20px 0;
}
</style>