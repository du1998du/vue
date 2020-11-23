<template>
  <div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical-demo"
      background-color="#363850"
      text-color="#fff"
      active-text-color="#33ffff"
      unique-opened
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span>首页</span>
      </el-menu-item>

      <el-submenu :index="item.id.toString()" v-for="item in getUserInfo.menus" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item :index="menu.url" v-for="menu in item.children" :key="menu.id">
          <span slot="title">{{menu.title}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
 
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      defaultActive: '/home',
    };
  },
  mounted(){
    //组件一加载就会触发挂载
      // console.log(this.$route,'路由源信息')
    this.defaultActive = this.$route.path;
    // this.getMenuList();
  },
  computed:{
    ...mapGetters({
      getUserInfo: 'getUserInfo',
    })
  },
  methods:{
    // ...mapActions({
    //   // getMenuList: 'menu/getMenuListAction',
    // })
  }
};
</script>
 
<style scoped>
</style>