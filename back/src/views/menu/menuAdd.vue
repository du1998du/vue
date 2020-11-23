<template>
  <div>
    <!-- 
      对话框属性
      visible	是否显示 Dialog，支持 .sync 修饰符
      center	是否对头部和底部采用居中布局
      formLabelWidth label的宽度
     -->
    <el-dialog
      :title="addInfo.isAdd ? '添加菜单' : '编辑菜单'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          label="菜单名称"
          prop="title"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="pid" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changeMenu"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="菜单地址"
          :label-width="formLabelWidth"
          v-if="form.type == 2"
        >
          <el-select v-model="form.url" placeholder="请选择">
            <!-- 循环下拉菜单---- 地址列表 -->
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
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
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add('formDialog')" v-if="addInfo.isAdd">添 加</el-button>
        <el-button type="primary" @click="update('formDialog')" v-else>编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
// 导入菜单添加的接口
import { getMenuAdd, getMenuInfo, getMenuEdit} from "../../util/axios";
import { mapActions, mapGetters } from "vuex";
import { indexRoutes } from "../../router";
// 导入
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        title: "", //标题
        pid: 0, //上级分类编号，默认是0 顶级菜单
        icon: "", //图标
        type: 1, //类型 1是目录，2是菜单
        url: "", //菜单地址
        status: 1, //状态 1是正常， 2是禁用
      },
      formLabelWidth: "80px",
      options: [
        {
          value: "1",
          label: "系统管理",
        },
        {
          value: "2",
          label: "商城管理",
        },
      ],
      indexRoutes: indexRoutes,
      iconList: [
        "el-icon-s-tools",
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-goods",
        "el-icon-menu",
      ],
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 15,
            message: "长度在 2 到 15 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
      },
    };
  },
  mounted() {
    //   console.log(this.$store);
  },
  computed: {
    // 获取菜单列表
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    // 重置
    reset() {
      this.form = {
        title: "", //标题
        pid: 0, //上级分类编号，默认是0 顶级菜单
        icon: "", //图标
        type: 1, //类型 1是目录，2是菜单
        url: "", //菜单地址
        status: 1, //状态 1是正常， 2是禁用
      };
      this.$refs["formDialog"].resetFields();
    },
    // 子父通信  点击取消，将false传递给父组件
    // cancelTc:关闭弹窗
    cancel() {
      this.$emit("cancelTc", false);
      // 关闭时  调用重置函数
      this.reset();
    },
    ...mapActions({
      // 获取到最新的菜单列表
      getMenuList: "menu/getMenuListAction",
    }),
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加逻辑
          //调取添加接口
          getMenuAdd(this.form).then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMenuList();
            }else{
              this.$message.error(res.data.msg)
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 根据id获取一条菜单列表数据
    getMenuInfo(id){
      getMenuInfo({id})
      .then(res => {
        if(res.data.code == 200){
          this.$message.success (res.data.msg); 
          // 将获取到的表单数据，赋值给弹出框
          this.form = res.data.list
          // 当前的表单没有id，无法提交，需要创建一个id，提交时使用
          this.form.id = id;
        }else{
          this.$message.error(res.data.msg)
        }
      })
      .catch(err => {
        console.log(err);
      }) 
    },
    // 修改表单数据
    update(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //修改逻辑
          //调取修改接口
          getMenuEdit(this.form).then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getMenuList();
            }else{
              this.$message.error(res.data.msg)
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //下拉菜单修改触发的事件
    changeMenu() {
      //通过用户是否选择顶级菜单来渲染你的菜单类型
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
  },
};
</script>
 
<style scoped>
</style>