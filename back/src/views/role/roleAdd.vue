<template>
  <div>
    <el-dialog
      center
      :title="addInfo.isAdd ? '添加角色' : '编辑角色'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          label="角色名称"
          prop="rolename"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
          <!-- el-tree 属性
            data	展示数据	array
            default-expand-all	是否默认展开所有节点
            node-key	每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
            props	配置选项，具体看下表	object
            show-checkbox	节点是否可被选择
            default-checked-keys	默认勾选的节点的 key 的数组	
             -->
          <el-tree
            :data="menuList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            check-strictly
            :props="{
              children: 'children',
              label: 'title',
            }"
          >
          </el-tree>
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
        <el-button
          type="primary"
          @click="add('formDialog')"
          v-if="addInfo.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update('formDialog')"
          >编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import { mapActions, mapGetters } from "vuex";
// 导入角色添加，查询角色一条信息， 角色修改的接口
import { getRoleAdd, getRoleInfo , getRoleEdit} from "../../util/axios";
// 获取菜单列表
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "80px",
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // console.log(this.$store);
    this.getMenuListAction();
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    //   表单重置
    reset() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      //   重置树型结构中 的值
      this.$refs.tree.setCheckedKeys([]);
      this.$refs["formDialog"].resetFields();
    },
    //关闭弹窗
    cancel() {
      this.$emit("cancel", false);
      //   关闭后重置表单
      this.reset();
    },
    ...mapActions({
      // 获取菜单actions
      getMenuListAction: "menu/getMenuListAction",
      getRoleListActions: "role/getRoleListActions",
    }),
    // 添加角色
    add(formName) {
      // console.log(this.form);
      // 获取树型控件的值
      // console.log(this.$refs.tree.getCheckedKeys());
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调取添加的接口
          // console.log(this.form.menus);
          this.form.menus = this.$refs.tree.getCheckedKeys().join(',');
          getRoleAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              //  添加成功的提示
              this.$message.success(res.data.msg);
              //  重新调取  渲染列表
              this.getRoleListActions();
              //   关闭弹窗
              this.cancel();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取 角色一条信息
    getRoleInfo(id) {
      getRoleInfo({ id })
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.form = res.data.list;
            //   为树型结构赋值
            this.$refs.tree.setCheckedKeys(res.data.list.menus.split(','));
            // 编辑的信息没有id， 需要创建一个id
            this.form.id = id;
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log("获取失败：", err);
        });
    },
    // 修改角色信息
    update(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调取添加的接口
          this.form.menus = this.$refs.tree.getCheckedKeys().join(',');
          getRoleEdit(this.form).then((res) => {
            if (res.data.code == 200) {
              //  添加成功的提示
              this.$message.success(res.data.msg);
              //  重新调取  渲染列表
              this.getRoleListActions();
              //   关闭弹窗
              this.cancel();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
 
<style scoped>
</style>