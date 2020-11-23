<template>
  <div>
    <el-table :data="roleList" stripe style="width: 100%" border>
      <el-table-column prop="id" label="角色编号" width="80">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" >
      </el-table-column>
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
            <el-button type="primary" @click="update(item.row.id)" plain size="small" >编辑</el-button>
            <el-button
              type="danger"
              plain
              size="small"
              @click="del(item.row.id)"
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
// 导入角色删除的接口
import { getRoleDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    //   console.log(this.$store);
    this.getRoleListActions();
  },
  computed: {
    ...mapGetters({
      roleList: "role/geteRoleList",
    }),
  },
  methods: {
    ...mapActions({
      getRoleListActions: "role/getRoleListActions",
    }),

    //   删除事件
    del(id) {
      this.$confirm("是否删除此数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        getRoleDelete({ id })
          .then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              // 删除成功后，重新渲染列表
              this.getRoleListActions();
            } else {
              this.$message.error(res.data.msg);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
    },
    // 编辑事件
    update(id){
        // console.log(id);
        this.$emit('edit', id)
    }
  },
};
</script>
 
<style scoped>
</style>