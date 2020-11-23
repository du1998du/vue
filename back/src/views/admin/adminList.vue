<template>
  <div>
    <el-table :data="userList" stripe style="width: 100%" border>
      <el-table-column prop="uid" label="用户编号"> </el-table-column>
      <el-table-column prop="username" label="用户名称"> </el-table-column>
      <el-table-column prop="rolename" label="所属角色 "> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" @click="update(item.row.uid)"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(item.row.uid)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="userCount"
      :page-size="getSize"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>
 
<script>
import { mapActions, mapGetters } from "vuex";
// 导入 删除接口
import { UserDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    // console.log(this.$store);
    this.getUserList();

    this.getUserCount();
  },
  computed: {
    ...mapGetters({
      userList: "user/getUserList",
      userCount: "user/getUserCount",
      getSize: "user/getSize",
    }),
  },
  methods: {
    update(id) {
      // console.log(id);
      this.$emit("update", id);
    },
    ...mapActions({
      // 管理员列表
      getUserList: "user/getUserListActions",
      getUserCount: "user/getUserCountActions",
      changePage: "user/changePageActions",
    }),
    currentChange(e) {
      // 当前点击的页数
      // console.log(e);
      this.changePage(e);
    },
    // 删除事件
    del(uid) {
      // console.log(uid);

      this.$confirm("确定要删除这一条数据吗？？？！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          UserDelete({ uid }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getUserList();
            }
          });
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
.el-pagination{
  float: right;
  margin-top: 20px;
}
</style>