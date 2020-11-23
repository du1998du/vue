<template>
  <!--     el-table 属性
    default-expand-all	是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效
    tree-props	渲染嵌套数据的配置选项
    row-key	行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。 -->
  <div>
    <el-table
      :data="menuList" stripe
      border
      height="75vh"
      style="width: 100%"
      default-expand-all
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号" width="80px">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>
      <el-table-column prop="pid" label="上级菜单" width="80px">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column prop="status" label="状态"> 
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if="item.row.status == 1">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click="update(item.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="del(item.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 
<script>
import { mapActions, mapGetters } from "vuex";
// 导入封装好的接口
import { getMenuDelete } from "../../util/axios";
export default {
  data() {
    return {
    };
  },
  mounted() {
    // console.log(this.$store);
    this.getMenuList();
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    // 编辑事件
    update(id){
      this.$emit('edit',id)
    },
    // 删除事件
    del(id) {
      // console.log(id);
      this.$confirm("确实删除此数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        getMenuDelete({id})
        .then(res => {
          if(res.data.code == 200){
            this.$message.success(res.data.msg);
            // 重新渲染列表
            this.getMenuList()
          }
        })
        .catch(err =>{
          console.log('删除出错：',err);
        })
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
    },
  },
};
</script>
 
<style scoped>
</style>