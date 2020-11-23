<template>
  <div>
    <el-dialog
      :title="'编辑会员信息'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="昵称"
          :label-width="formLabelWidth"
          prop="nickname"
        >
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
        <el-button type="primary" @click="update">编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import { mapActions, mapGetters } from "vuex";
// 导入商品规格添加， 获取一条商品规格， 商品规格修改接口
import { getMemberInfo, getMemberEdit} from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        nickname:'',//昵称
        phone:'',//手机号
        password:'',//密码
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "80px",
      // 验证
      rules: {
        nickname: [
          { required: true, message: "请输入会员昵称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "手机号长度应在11位", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // console.log(this.$store);
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    // 重置表单
    reset() {
      this.form = {
        nickname:'',//昵称
        phone:'',//手机号
        password:'',//密码
        status: 1, //状态1正常2禁用
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
      getMemberAction: 'member/getMemberListActions'
    }),
    //获取一条商品规格信息
    getMemberInfo(uid) {
      getMemberInfo({uid})
      .then(res => {
        if(res.data.code == 200){
          this.$message.success(res.data.msg);
          this.form = res.data.list
          this.form.uid = uid
        }else{
          this.$message.error(res.data.msg);
        }
      })
      .catch(err => {
        console.log('查询出错：',err);
      })
    },
    // 修改商品规格信息
    update() {
      getMemberEdit(this.form)
      .then(res => {
        // console.log(res);
        if(res.data.code == 200){
          this.$message.success(res.data.msg);
          this.cancel();
          this.getMemberAction()
        }
      })
      .catch(err => {
        console.log('添加错误', err);
      })
    },
  },
};
</script>
 
<style scoped>
.inputW {
  width: 80%;
}
</style>