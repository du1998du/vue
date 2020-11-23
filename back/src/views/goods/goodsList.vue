<template>
  <div>
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="80px"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column label="图片"> 
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl+item.row.img" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否新品" width="80px">
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if="item.row.isnew == 1">是</el-tag>
            <el-tag type="danger" v-else>否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" width="80px">
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if="item.row.ishot == 1">是</el-tag>
            <el-tag type="danger" v-else>否</el-tag>
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
            <el-button type="primary" size="small" @click="update(item.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="del(item.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="goodsCount"
      :page-size="getSize"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>
 
<script>
import { mapActions, mapGetters } from "vuex";
import {getGoodsDelete} from '../../util/axios'
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    // console.log(this.$store);
    this.getGoodsList();
    this.getGoodsCount();
  },
  computed: {
    ...mapGetters({
      goodsList: "goods/getGoodsList",
      goodsCount: "goods/getGoodsCount",
      getSize: "goods/getSize",
    }),
  },
  methods: {
    ...mapActions({
      getGoodsList: "goods/getGoodsListActions",
      changePage: "goods/changePageActions",
      getGoodsCount: "goods/getGoodsCountActions",
    }),

    currentChange(e) {
      this.changePage(e);
    },
    update(id) {
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
        getGoodsDelete({id})
        .then(res => {
          if(res.data.code == 200){
            this.$message.success(res.data.msg);
            // 重新渲染列表
            this.getGoodsList()
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
.img{
  width: 150px;
}
.el-pagination{
  float: right;
  margin-top: 20px;
}
</style>