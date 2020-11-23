<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          label="所属角色"
          :label-width="formLabelWidth"
          prop="roleid"
        >
          <el-select v-model="form.roleid" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="用户名称"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :label-width="formLabelWidth"
        >
          <el-input autocomplete="off" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="pass" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel"> 取 消</el-button>
        <el-button type="primary" v-if="addInfo.isAdd" @click="add"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import { mapActions, mapGetters } from "vuex";
// 导入管理员添加接口
import { getUserAdd, getUserInfo, UserEdit } from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      isShow: true,
      form: {
        username: "",
        password: "",
        roleid: "",
        status: 1,
      },
      formLabelWidth: "80px",
      // 验证
      rules: {
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请输入管理员名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // console.log(this.$store);
    // 获取到角色列表
    // 减少对服务器的交互
    if (this.roleList.length == 0) {
      this.getRoleList();
    }
  },
  computed: {
    ...mapGetters({
      roleList: "role/geteRoleList",
      userList: "user/getUserList",
    }),
  },
  methods: {
    // 重置表单
    reset() {
      this.form = {
        username: "",
        password: "",
        roleid: "",
        status: 1,
      };
      this.$refs["formDialog"].resetFields();
    },
    //   关闭弹窗 ，触发父组件中的关闭弹窗事件
    cancel() {
      this.$emit("cancel", false);
      // 关闭弹窗，清空表单
      this.reset();
    },
    ...mapActions({
      // 获取角色列表
      getRoleList: "role/getRoleListActions",
      // 获取管理员列表
      getUserList: "user/getUserListActions",
      // 获取总数
      getUserCount: "user/getUserCountActions",
    }),

    // 添加管理员事件
    add() {
      // console.log(this.form);
      getUserAdd(this.form)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            // 重新渲染列表
            this.getUserList();
            // 重新获取总数
            this.getUserCount();

            this.cancel();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log("添加失败", err);
        });
    },
    //获取一条管理员信息
    getUserInfo(uid) {
      getUserInfo({ uid })
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.form = res.data.list;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改管理员信息
    update() {
      UserEdit(this.form)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            // 重新渲染列表
            this.getUserList();
            // 重新获取总数
            this.getUserCount();

            this.cancel();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log("添加失败", err);
        });
    },
  },
};
</script>
 
<style scoped>
</style>