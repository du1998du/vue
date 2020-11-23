<template>
  <div>
    <!-- 导入面包屑组件 -->
    <v-bread></v-bread>
    <!-- 添加按钮 -->
    <el-button type="primary"  size="small" @click="show">添加</el-button>
    <!-- 导入列表 -->
    <role-list @edit="edit"></role-list>
    <!-- 角色添加模快 -->
    <role-add :addInfo="addInfo" @cancel="cancel" ref="role"></role-add>
  </div>
</template>
 
<script>
// 导入面包屑组件
import vBread from "../../components/breadcrumb";
// 导入角色列表组件
import roleList from "./roleList";
// 导入添加模块
import roleAdd from "./roleAdd";
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
    roleList,
    roleAdd,
  },
  methods: {
    //   显示弹窗
    show() {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = true;
    },
    //   关闭弹窗
    cancel(e) {
      this.addInfo.isShow = e;
    },
    // 编辑事件
    edit(e){
        // console.log(e);
        // 显示弹窗
        this.addInfo.isShow= true
        // 显示编辑的页面
        this.addInfo.isAdd = false
        // 调用子组件的函数（获取一条角色信息）
        this.$refs.role.getRoleInfo(e)
    }
  },
};
</script>
 
<style scoped lang="stylus">
.el-button {
  margin: 20px 0;
}
</style>