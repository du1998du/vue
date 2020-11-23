<template>
  <div>
    <el-table :data="memberList" border style="width: 100%">
      <el-table-column prop="id" label="用户编号" width="100px">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
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
            <el-button type="primary" size="small" @click="edit(item.row.uid)"
              >编辑</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
 
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {
    // console.log(this.$store);
    this.getMemberAction();
  },
  computed: {
    ...mapGetters({
      memberList: "member/getMemberList",
    }),
  },
  methods: {
    ...mapActions({
      getMemberAction: "member/getMemberListActions",
    }),
    edit(uid) {
      // console.log(uid);
      this.$emit('edit', uid)
    },
  },
};
</script>
 
<style scoped>
</style>