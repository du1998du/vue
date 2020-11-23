<template>
  <div>
    <el-container>
      <el-header>
        <h1>XXX商城后台管理系统</h1>
        <div class="box">
          <p class="user">
            <span class="el-icon-s-custom" v-text="getUserInfo.username"></span>
          </p>
          <p class="exit" @click="exit">退出</p>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 左侧导航 -->
          <v-nav></v-nav>
        </el-aside>
        <el-main>
          <!-- 二级路由出口 -->
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
 
<script>
import {mapGetters,mapActions} from 'vuex'
import vNav from "../components/nav";
export default {
  data() {
    return {
      username: "",
    };
  },
  components: {
    vNav,
  },
  mounted() {},
  computed: {
    ...mapGetters(["getUserInfo"]),
  },
  methods: {
    ...mapActions(["changeUserInfoAction"]),
    exit() {
      this.$confirm("确实要退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.changeUserInfoAction(null);
          //退出之后强制跳转登录页
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
 
<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-header {
  background-color: $secondBgColor;
  line-height: 60px;
  text-align: center;
  position: relative;

  h1 {
    font-weight: bold;
    font-size: 20px;
  }

  .box {
    position: absolute;
    top: 0;
    right: 30px;
    display: flex;
    font-size: 16px;

    .user {
      margin-right: 10px;
      color: #363850;
    }

    .exit {
      font-size: 14px;

      &:hover {
        color: orangered;
        cursor: pointer;
        text-decoration: rgb(172, 50, 5);
      }
    }
  }
}

.el-aside {
  background-color: $thirdBgColor;
  height: 92vh;
}
</style>