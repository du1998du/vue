<template>
  <div>
    <el-table :data="bannerList" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="100px"> </el-table-column>
      <el-table-column prop="title" label="轮播图标题"> </el-table-column>
      <el-table-column prop="img" label="图片">
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl+item.row.img" alt="" />
          </div>
        </template>
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
            <el-button type="primary" size="small" @click="edit(item.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="del(item.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 
<script>
import { mapActions, mapGetters } from "vuex";
import {getBannerDelete} from '../../util/axios'
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
      // console.log(this.$store);
      this.getBannerActions();
  },
  computed:{
    ...mapGetters({
      bannerList: 'banner/getBannerList'
    })
  },
  methods:{
    ...mapActions({
      getBannerActions:'banner/getBannerListActions'
    }),
    edit(id){
      // console.log(id);
      this.$emit('edit', id)
    },
    del(id){
      getBannerDelete({id})
      .then(res => {
        if(res.data.code == 200){
          this.$message.success(res.data.msg);
          this.getBannerActions()
        }
      })
    }
  }
};
</script>
 
<style scoped>
.img{
  width: 200px;
}
</style>