<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加秒杀管理' : '编辑秒杀管理'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
          prop="title"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="活动期限"
          :label-width="formLabelWidth"
          prop="catename"
        >
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择一级分类"
            @change="changeCate(false)"
          >
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.second_cateid"
            placeholder="请选择二级分类"
            @change="changeGoods()"
          >
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" :label-width="formLabelWidth">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option
              v-for="item in goodsList"
               :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            >
            </el-option>
          </el-select>
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
// 导入秒杀添加， 获取秒杀一条， 秒杀修改接口
import {
  getSeckAdd,
  getSeckInfo,
  getSeckEdit,
  getSpecsInfo,
  getGoodsList,
} from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: '', //商品编号
        status: 1, //状态1正常2禁用
      },
      date: '',
      formLabelWidth: "80px",
      secondCate: [],
      goodsList: [],
      // 验证
      rules: {
        title: [
          { required: true, message: "请输入秒杀标题", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // console.log(this.$store);
    this.getCateAction();
  },
  computed: {
    ...mapGetters({
      cateList: "cate/geteCateList",
    }),
  },
  methods: {
    // 重置表单
    reset() {
      this.form = {
        title: "", //限时秒杀名称
        begintime: "", //开始时间
        endtime: "", //结束时间
        first_cateid: '', //商品一级分类编号
        second_cateid: '', //商品二级分类编号
        goodsid: '', //商品编号
        status: 1, //状态1正常2禁用
      };
      this.date ='';
      this.$refs["formDialog"].resetFields();
    },
    //   关闭弹窗 ，触发父组件中的关闭弹窗事件
    cancel() {
      this.$emit("cancel", false);
      // 关闭弹窗，清空表单
      this.reset();
    },
    ...mapActions({
      getCateAction: "cate/getCateListActions",
      getSeckAction: "seck/getSeckListActions",
    }),
    changeCate(n) {
      let index = this.cateList.findIndex(
        (item) => item.id == this.form.first_cateid
      );
      this.secondCate = this.cateList[index].children;
      // 清空二级双向数据绑定还要清空三级
      if (!n) {
        this.form.second_cateid = "";
        this.form.goodsid = "";
      }
    },
    changeGoods(n) {
      getGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      })
        .then((res) => {
          if (res.data.code == 200) {
            this.goodsList = res.data.list;
            if (!n) {
              this.form.goodsid = "";
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 添加商品规格事件
    add() {
      this.form.begintime = this.date[0];
      this.form.endtime = this.date[1];
      // console.log(this.form);
      getSeckAdd(this.form)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.cancel();
            this.getSeckAction();
          } else {
            this.$message.error(res.daa.msg);
          }
        })
        .catch((err) => {
          console.log("添加失败", err);
        });
    },
    //获取一条商品规格信息
    getSeckInfo(id) {
      getSeckInfo({ id })
        .then((res) => {
          if (res.data.code == 200) {
            this.form = res.data.list;
            // date是数组时，给date赋值
            // this.$set(this, "date", [this.form.begintime, this.form.endtime]);
            this.date=[(this.form.begintime), (this.form.endtime)]

            this.form.id = id;
            // 清空双向数据绑定
            this.changeCate(true);
            this.changeGoods(true);
          }
        })
        .catch((err) => {
          console.log("获取秒杀信息失败", err);
        });
    },
    // 修改商品规格信息
    update() {
      this.form.begintime = this.date[0];
      this.form.endtime = this.date[1];
      getSeckEdit(this.form)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            this.cancel();
            this.date = [];
            this.getSeckAction();
          } else {
            this.$message.error(res.daa.msg);
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
.inputW {
  width: 80%;
}
</style>