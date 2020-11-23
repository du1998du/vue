<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item label="上级分类" :label-width="formLabelWidth" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择上级分类">
            <el-option :value="0" label="顶级分类"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="分类名称"
          :label-width="formLabelWidth"
          prop="catename"
        >
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="onPreview"
            :on-remove="onRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="fileList"
            :limit='1'
            :on-exceed='onExceed'	
          >
            <i class="el-icon-plus"></i>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
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
import { getCateAdd, getCateInfo, getCateEdit } from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        img: "",
        status: 1,
      },
      formLabelWidth: "80px",
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
      // 验证
      rules: {
        pid: [{ required: true, message: "请选择上级分类", trigger: "blur" }],
        catename: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // console.log(this.$store);
    // this.getCateList()
  },
  computed: {
    ...mapGetters({
      cateList: "cate/geteCateList",
    }),
  },
  methods: {
    // 图片预览
    onPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片移除
    onRemove(file, fileList) {},
    //  onchange  图片上传时触发
    onChange(file) {
      // console.log(file);
      this.imgUrl = file.raw;
    },
    // 文件上传限制
    onExceed(files, fileList){
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 重置表单
    reset() {
      this.form = {
        pid: 0, //上级分类编号 默认是0 是顶级
        catename: "", //商品分类名称
        img: "", //图片(文件，一般用于二级分类)
        status: 1 //状态1正常2禁用
      };
      // 清空图片列表
      this.fileList = [];
      this.$refs["formDialog"].resetFields();
    },
    //   关闭弹窗 ，触发父组件中的关闭弹窗事件
    cancel() {
      this.$emit("cancel", false);
      // 关闭弹窗，清空表单
      this.reset();
    },
    ...mapActions({
      getCateList: "cate/getCateListActions",
    }),

    // 添加商品分类事件
    add() {
      // console.log(this.form);
      // 对于有文件上传的form表单，要使用FormDAta对象形式上传
      // 将普通数据改成FormData
      let data = this.form;
      let file = new FormData();
      // 必须通过append  添加属性
      for (let i in data) {
        file.append(i, data[i]);
      }
      //添加img参数
      file.append("img", this.imgUrl);
      // 使用 get方法，获取FormData中 的数据
      // console.log(file.get('catename'));
      // 调取接口
      getCateAdd(file)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            // 关闭弹窗
            this.cancel();
            // 重新获取列表
            this.getCateList();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log("添加错误", err);
        });
    },
    //获取一条商品分类信息
    getCateInfo(id) {
      getCateInfo({ id })
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.form = res.data.list;

            this.form.id = id;
            // 将图片格式进行转化
            this.fileList = this.form.img
              ? [{ url: `${this.$imgUrl}${this.form.img}` }]
              : [];
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改商品分类信息
    update() {
      let data = this.form;
      let file = new FormData();
      // 必须通过append  添加属性
      for (let i in data) {
        file.append(i, data[i]);
      }

      //如果你新传了图片 this.imgUrl就有值。就赋值给this.imgUrl。如果没有新添加的图片就用上一次的图片
      this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
      //添加img参数
      file.append("img", this.imgUrl);
      // 使用 get方法，获取FormData中 的数据
      // console.log(file.get('catename'));
      // 调取接口
      getCateEdit(file)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            // 关闭弹窗
            this.cancel();
            // 重新获取列表
            this.getCateList();
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log("添加错误", err);
        });
    },
    changeMenu() {
      // console.log(this.form.pid, "pid");
      //通过用户是否选择顶级菜单来渲染你的菜单类型
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    }
  },
};
</script>
 
<style scoped>
</style>