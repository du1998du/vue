<template>
  <div>
    <el-table :data="specsList" stripe style="width: 100%" border>
      <el-table-column prop="id" label="规格编号"> </el-table-column>
      <el-table-column prop="specsname" label="规格名称"> </el-table-column>
      <el-table-column label="规格属性 ">
        <template slot-scope="item">
          <div>
            <el-tag
              v-for="attrName in item.row.attrs"
              :key="attrName"
              type="info"
              >{{ attrName }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
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
            <el-button type="primary" @click="update(item.row.id)"
              >编辑</el-button
            >
            <el-button type="danger" @click="del(item.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="specsCount"
      :page-size="getSize"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>
 
<script>
import { mapActions, mapGetters } from "vuex";
// 导入 删除接口
import { getSpecsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    // console.log(this.$store);
    this.getSpecsList();

    this.getSpecsCount();
  },
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
      specsCount: "specs/getSpecsCount",
      getSize: "specs/getSize",
    }),
  },
  methods: {
    update(id) {
      // console.log(id);
      this.$emit("update", id);
    },
    ...mapActions({
      // 管理员列表
      getSpecsList: "specs/getSpecsListActions",
      getSpecsCount: "specs/getSpecsCountActions",
      changePage: "specs/changePageActions",
    }),
    currentChange(e) {
      // 当前点击的页数
      // console.log(e);
      this.changePage(e);
    },
    // 删除事件
    del(id) {
      // console.log(id);
      this.$confirm("确定要删除这一条数据吗？？？！！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getSpecsDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getSpecsCount()
              // 重新渲染列表
              this.getSpecsList();
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