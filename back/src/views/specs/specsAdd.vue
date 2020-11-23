<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品规格' : '编辑商品规格'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          label="规格名称"
          :label-width="formLabelWidth"
          prop="specsname"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          v-for="(item, index) in arrAttr"
          :key="index"
          label="规格属性:"
          :label-width="formLabelWidth"
        >
          <el-input
            class="inputW"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button v-if="index==0" @click="addAttr" type="primary">新增规格属性</el-button>
          <el-button v-else @click="delAttr(index)" type="danger">删除</el-button>
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
// 导入商品规格添加， 获取一条商品规格， 商品规格修改接口
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";
export default {
  props: ["addInfo"],
  data() {
    return {
      form: {
        specsname: "", // 规格名称
        attrs: "", //规格属性
        status: 1 //状态1正常2禁用
      },
      arrAttr:[
        {
          value:''
        },
      ],
      formLabelWidth: "80px",
      // 验证
      rules: {
        specsname: [
          { required: true, message: "请输入商品规格名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // console.log(this.$store);
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    // 重置表单
    reset() {
      this.form = {
        specsname: "", // 规格名称
        attrs: "", //规格属性
        status: 1 //状态1正常2禁用
      };
      this.$refs["formDialog"].resetFields();
      // 关闭后  初始化动态表单
      this.arrAttr=[
        {
          value:''
        }
      ]
    },
    //   关闭弹窗 ，触发父组件中的关闭弹窗事件
    cancel() {
      this.$emit("cancel", false);
      // 关闭弹窗，清空表单
      this.reset();
    },
    ...mapActions({
      getSpecsList: "specs/getSpecsListActions",
      getSpecsCount: 'specs/getSpecsCountActions'
    }),
    // 添加商品规格
    addAttr(){
      this.arrAttr.push({
        value:''
      })
    },
    // 删除商品规格
    delAttr(i){
      // console.log(i);
      this.arrAttr.splice(i, 1)
    },
    // 添加商品规格事件
    add() {
      // console.log(this.form);
        // 将动态添加的商品规格属性，添加到form的attrs属性中
        let arr = this.arrAttr.map(item => {
          return item.value
        })
        this.form.attrs = arr.join(',');

        getSpecsAdd(this.form)
        .then(res => {
          if(res.data.code == 200){
            this.$message.success(res.data.msg);
            this.cancel();
            // 重新渲染列表
            this.getSpecsList()
            // /重新获取总数
            this.getSpecsCount()
          }else{
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log('添加失败', err);
        })
    },
    //获取一条商品规格信息
    getSpecsInfo(id) {
      // console.log(id);
      getSpecsInfo({ id })
        .then((res) => {
          // console.log(res);
          if (res.data.code == 200) {
            this.$message.success(res.data.msg);
            // 对数据进行二次修改
            let info = res.data.list[0]
            this.form = info

            info.attrs.map((item,index) => {
              // console.log(item);
              // 判断如果索引是0，将第一项匹配给她
              if(index == 0){
                this.arrAttr[0].value = item
              }else{
                this.arrAttr.push({
                  value: item
                })
              }
            })
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
      let arr = this.arrAttr.map(item => {
          return item.value
        })
        this.form.attrs = arr.join(',');

        getSpecsEdit(this.form)
        .then(res => {
          if(res.data.code == 200){
            this.$message.success(res.data.msg);
            this.cancel();
            // 重新渲染列表
            this.getSpecsList()
            // /重新获取总数
            this.getSpecsCount()
          }else{
            this.$message.error(res.data.msg);
          }
        })
        .catch(err => {
          console.log('添加失败', err);
        })
    },
  },
};
</script>
 
<style scoped>
.inputW{
  width: 80%;
}
</style>