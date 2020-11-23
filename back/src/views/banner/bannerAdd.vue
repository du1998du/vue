<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加轮播图信息' : '编辑轮播图信息'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
            :limit="1"
            :on-exceed="onExceed"
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
// 导入轮播图添加， 获取一条轮播图， 轮播图修改接口
import { getBannerAdd, getBannerInfo, getBannerEdit } from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        title: "", //轮播图名称
        img: "", //图片
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "80px",
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
      // 验证
      rules: {
        title: [
          { required: true, message: "请输入轮播图名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
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
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 重置表单
    reset() {
      this.form = {
        title: "", //轮播图名称
        img: "", //图片
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
      getBannerAction: "banner/getBannerListActions",
    }),
    // 添加轮播图
    add() {
      // console.log(this.form);
      let data = this.form;
      let file = new FormData();
      // 通过append想 FormData总添加数据
      for (let i in data) {
        file.append(i, data[i]);
      }
      // 添加img参数
      file.append("img", this.imgUrl);

      getBannerAdd(file)
        .then((res) => {
          this.$message.success(res.data.msg);
          // 关闭弹窗
          this.cancel();
          // 重新获取列表
          this.getBannerAction();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取一条轮播图信息
    getBannerInfo(id) {
      // console.log(id);
      getBannerInfo({ id })
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.form = res.data.list;
            this.form.id = id;
            // 将图片格式进行转化
            this.fileList = this.form.img
              ? [{ url: `${this.$imgUrl}${this.form.img}` }]
              : [];
          }else{
              this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log("清求出错", err);
        });
    },
    // 修改商品规格信息
    update() {
      let data = this.form;
      let file = new FormData();
      // 通过append想 FormData总添加数据
      for (let i in data) {
        file.append(i, data[i]);
      }
      //如果你新传了图片 this.imgUrl就有值。就赋值给this.imgUrl。如果没有新添加的图片就用上一次的图片
      this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
      // 添加img参数
      file.append("img", this.imgUrl);

      getBannerEdit(file)
        .then((res) => {
          this.$message.success(res.data.msg);
          // 关闭弹窗
          this.cancel();
          // 重新获取列表
          this.getBannerAction();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
 
<style scoped>
.inputW {
  width: 80%;
}
</style>