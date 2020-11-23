<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品信息' : '编辑商品信息'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
      @opened="createEditor"
    >
      <el-form :model="form" :rules="rules" ref="rules">
        <el-form-item
          label="一级分类"
          :label-width="formLabelWidth"
          prop="first_cateid"
        >
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择一级分类"
            @change="changeCate(false)"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="二级分类"
          :label-width="formLabelWidth"
          prop="second_cateid"
        >
          <el-select v-model="form.second_cateid" placeholder="请选择二级分类">
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="商品名称"
          :label-width="formLabelWidth"
          prop="goodsname"
        >
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="商品价格"
          :label-width="formLabelWidth"
          prop="price"
        >
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="市场价格"
          :label-width="formLabelWidth"
          prop="market_price"
        >
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
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

        <el-form-item
          label="商品规格"
          :label-width="formLabelWidth"
          prop="specsid"
        >
          <el-select
            v-model="form.specsid"
            placeholder="请选择商品规格"
            @change="changeSpecs(false)"
          >
            <el-option
              v-for="item in allSpecsList"
              :key="item.id"
              :value="item.id"
              :label="item.specsname"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="规格属性"
          :label-width="formLabelWidth"
          prop="specsattr"
        >
          <el-select v-model="form.specsattr" placeholder="请选择规格属性" multiple>
            <el-option
              v-for="item in attrArr"
              :key="item"
              :value="item"
              :label="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="formLabelWidth">
          <el-radio-group v-model="form.isnew">
            <el-radio v-model="form.isnew" :label="1">是</el-radio>
            <el-radio v-model="form.isnew" :label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="formLabelWidth">
          <el-radio-group v-model="form.ishot">
            <el-radio v-model="form.ishot" :label="1">是</el-radio>
            <el-radio v-model="form.ishot" :label="2">否</el-radio>
          </el-radio-group>
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

        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <div id="editor"></div>
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
// 引入富文本编辑器
import E from 'wangeditor'
import { mapActions, mapGetters } from "vuex";
// 导入商品规格添加， 获取一条商品规格， 商品规格修改接口
import { getGoodsAdd, getGoodsInfo, getGoodsEdit } from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      editor: null, //定义一个编辑器变量
      form: {
        first_cateid: "", //一级分类
        second_cateid: "", //二级分类
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //图片
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "80px",
      dialogImageUrl: "", //预览图片地址
      dialogVisible: false, //预览图片的弹框
      imgUrl: "", //用来接收图片信息
      fileList: [], //文件上传列表
      secondCate: [], //二级分类
      attrArr: [], //  规格属性
      // 验证
      rules: {
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" },
        ],
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        market_price: [
          { required: true, message: "请输入商品的市场价格", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" },
        ],
        specsattr: [
          { required: true, message: "请选择商品属性", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // console.log(this.$store);
    this.getSpecsActions();
    this.getCateAction();
    this.getAllListAction()
  },
  computed: {
    ...mapGetters({
      specsList: "specs/getSpecsList",
      cateList: "cate/geteCateList",
      allSpecsList: 'specs/getAllList'
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
        first_cateid: "", //一级分类
        second_cateid: "", //二级分类
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: "", //图片
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, //是否新品
        ishot: 1, //是否热卖推荐
        status: 1, //状态1正常2禁用
      };
      //图片列表清空
      this.fileList = [];
      //二级分类
      this.secondArr = [];
      //属性数组
      this.attrArr = [];
      //清空规则验证 当关闭弹框时，可以调取清空验证规则函数resetFields()
      //console.log( this.$refs.rules,' this.$refs.rules')
      this.$refs["rules"].resetFields();
    },
    //   关闭弹窗 ，触发父组件中的关闭弹窗事件
    cancel() {
      this.$emit("cancel", false);
      // 关闭弹窗，清空表单
      this.reset();
    },
    ...mapActions({
      getSpecsActions: "specs/getSpecsListActions",
      getCateAction: "cate/getCateListActions",
      getGoodsAction: 'goods/getGoodsListActions',
      getCountAction: 'goods/getGoodsCountActions',
      getAllListAction: 'specs/getAllSpecsListActions'
    }),
    // 选择一级分类，对应的二级分类
    changeCate(n) {
      // console.log(n);
      // findIndex 数组的方法， 找到符合条件 将索引返回
      let index = this.cateList.findIndex((item, i) => {
        // console.log(item , i);
        return item.id == this.form.first_cateid;
      });
      this.secondCate = this.cateList[index].children;
      //进行联动判空。如果你选择了别的一级，那么清空上一次二级的选择值
      if (!n) {
        this.form.second_cateid = "";
      }
    },
    changeSpecs(n) {
      let index = this.allSpecsList.findIndex(
        (item) => this.form.specsid == item.id
      );
      this.attrArr = this.allSpecsList[index].attrs;
      if (!n) {
        this.form.specsattr = [];
      }
    },
    // 添加商品规格事件
    add() {
      // 对规格属性的数据进行转化
      this.form.specsattr = this.form.specsattr ?  this.form.specsattr.join(",") : '';
      // 设置描述信箱
      this.form.description = this.editor.txt.html();
      // console.log(this.form);
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      file.append("img", this.imgUrl);

      getGoodsAdd(file)
        .then((res) => {
          // console.log(res);
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.getGoodsAction();
            this.getCountAction();
            this.cancel()
          } else {
            this.$message.erroe(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取一条商品信息
    getGoodsInfo(id) {
      // console.log(id);
      getGoodsInfo({ id })
        .then((res) => {
          // console.log(res);
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.form = res.data.list;
            this.form.id = id;
            this.fileList = this.form.img
              ? [{ url: `${this.$imgUrl}${this.form.img}` }]
              : [];
              this.form.specsattr = this.form.specsattr ? this.form.specsattr.split(',') : [];
              // this.editor.txt.html(this.form.description);
              // 重新调取changeCate和changeSpecs事件
              //防止 概率问题
              this.changeCate(true);
              this.changeSpecs(true)
          } else {
            this.$message.error(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 修改商品规格信息
    update() {
      // 对规格属性的数据进行转化
      this.form.specsattr = this.form.specsattr ?  this.form.specsattr.join(",") : '';
      // 设置描述信箱
      this.form.description = this.editor.txt.html();
      // console.log(this.form);
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      file.append("img", this.imgUrl);

      getGoodsEdit(file)
        .then((res) => {
          // console.log(res);
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);

            this.getGoodsAction();
            this.getCountAction();
            this.cancel()
          } else {
            this.$message.erroe(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //定义一个编辑器变量
    createEditor(){
      // 实例化 富文本编辑器
      this.editor = new E('#editor');
      // 调用富文本编辑器的 create方法
      this.editor.create();
      // 设置内容
      this.editor.txt.html(this.form.description);
    }
  },
};
</script>
 
<style scoped>
.inputW {
  width: 80%;
}
</style>