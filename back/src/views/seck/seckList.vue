<template>
  <div>
    <el-table :data="seckList" border style="width: 100%">
      <el-table-column prop="title" label="活动名称" width="180px">
      </el-table-column>
      <el-table-column label="状态">
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
            <el-button type="danger" size="small" @click="del(item.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 
<script>
import { mapActions, mapGetters } from "vuex";
import {getSeckDelete} from '../../util/axios'
export default {
  data() {
    return {
    };
  },
  mounted() {
    // console.log(this.$store);
    this.getSeckAction()
  },
  computed:{
    ...mapGetters({
      seckList:'seck/getSeckList'
    })
  },
  methods: {
    ...mapActions({
      getSeckAction: "seck/getSeckListActions",
    }),
    update(id){
      // console.log(id);
      this.$emit('edit', id)
    },
    del(id){
      // console.log(id);
      this.$confirm("确实删除此数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
      .then(() => {
        getSeckDelete({id})
        .then(res => {
          if(res.data.code == 200){
            this.$message.success(res.data.msg);
            // 重新渲染列表
            this.getSeckAction()
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
    }
  },
};
</script>
 
<style scoped>
</style>