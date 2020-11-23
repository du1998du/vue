<template>
  <div>
    <el-table
      :data="cateList"
      style="width: 100%"
      row-key="id"
      height="75vh"
      default-expand-all
      :tree-props="{ children: 'children' }"
      >
      <el-table-column prop="id" label="分类编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180">
      </el-table-column>
      
      <el-table-column  label="图片"> 
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl+item.row.img" alt="">
          </div>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="item">
          <div>
            <el-tag v-if='item.row.status==1' type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
         </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="small" @click='update(item.row.id)'>编辑</el-button>
            <el-button type="danger" @click="del(item.row.id)" size="small"
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
// 导入 删除接口
import { getCateDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    // console.log(this.$store);
    this.getCateList();
  },
  computed: {
    ...mapGetters({
      cateList: "cate/geteCateList",
    }),
  },
  methods: {
    update(id) {
      // console.log(id);
      this.$emit("update", id);
    },
    ...mapActions({
      getCateList: "cate/getCateListActions",
    }),
    // 删除事件
    del(id) {
      // console.log(id);
      this.$confirm("确定要删除这条数据吗?！！", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getCateDelete({ id }).then((res) => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              // 重新渲染列表
              this.getCateList();
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
.img {
  width: 150px;
}
</style>