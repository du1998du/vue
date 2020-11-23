<template>
  <div>
      <!-- 面包屑组件 -->
    <v-bread></v-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" size="small" @click="show">添加</el-button>
    <!-- 显示列表 -->
    <menu-list  @edit="edit"></menu-list>
    <!-- 点击 添加，弹出添加框 -->
    <menu-add :addInfo="addInfo" @cancelTc="cancelTc" ref="dialog"/>
  </div>
</template>
 
<script>
// 引入面包屑组件
import vBread from "../../components/breadcrumb";
// 引入列表组件
import menuList from './menuList'
// 引入添加 弹出框
import menuAdd from './menuAdd'
export default {
  data() {
    return {
      addInfo:{
        isShow: false,
        isAdd: true
      }
    };
  },
  components: {
    vBread,
    menuList,
    menuAdd
  },
  methods:{
    //   父子通信   将isShow=true通过自定义属性:isShow 传递给子组件
      show(){
          this.addInfo.isShow = true;
          this.addInfo.isAdd = true
      },
      //关闭弹框 ，将传递过来的false  赋值给 isShow
      cancelTc(e){
          this.addInfo.isShow = e
      },
      // 编辑事件
      edit(e){
        // 打开弹窗
        this.addInfo.isShow = true;
        // 修改弹窗的信息 ，改为编辑
        this.addInfo.isAdd = false;
        // 通过 $refs 获取到子组件中获取一条数据的函数
        this.$refs.dialog.getMenuInfo(e);
      }
  }
};
</script>
 
<style lang="stylus" scoped>
.el-button
    margin: 20px 0
</style>