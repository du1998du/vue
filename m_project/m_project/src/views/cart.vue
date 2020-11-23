<template>
  <div>
    <!-- 导航栏 -->
    <van-nav-bar
      :title="$route.meta.name"
      left-arrow
      @click-left="$router.go(-1)"
      right-text="注册"
      @click-right="$router.push('/register')"
    >
    </van-nav-bar>
    <div v-if="cartList.length > 0 && userInfo">
      <van-swipe-cell v-for="(item, i) in cartList" :key="item.id">
        <!-- <van-checkbox v-model="item.check" class="cbx" @click="select(i)" /> -->
        <input
          type="checkbox"
          v-model="item.check"
          class="cbx"
          @change="select(i)"
        />
        <van-card
          :num="item.num"
          :price="item.price | toPrice"
          desc="描述信息"
          :title="item.goodsname"
          class="goods-card"
          :thumb="$imgUrl + item.img"
        >
          <template #footer>
            <div>
              <van-stepper
                v-model="item.num"
                theme="round"
                button-size="22"
                disable-input
              />
            </div>
          </template>
        </van-card>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="del(item.id)"
          />
        </template>
      </van-swipe-cell>
      <van-submit-bar :price="allPrice" button-text="提交订单">
        <!-- <van-checkbox v-model="isCheckAll" @click="checkAll">全选</van-checkbox> -->
        <input type="checkbox" v-model="isCheckAll" @change="checkAll" />全选
      </van-submit-bar>
    </div>
    <div v-else>
      <van-empty description="还未登录，快去登录" />
      <van-button @click="$router.push('/login')" type="warning"
        >请先登录，再查看</van-button
      >
  </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { getCartList, getCartDelete } from "../util/axios";
export default {
  data() {
    return {
      cartList: [],
      isCheckAll: true,
      goodsNum: 1,
      userInfo: "",
    };
  },
  mounted() {
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : "";

    this.getCartInfo();
  },
  methods: {
    getCartInfo() {
      getCartList({
        uid: this.$route.query.id ? this.$route.query.id : this.userInfo.uid,
      }).then((res) => {
        // console.log(res);
        if (res.code == 200) {
          this.cartList = res.list;
          // 循环为每一个 添加一个check属性
          this.cartList.forEach((item) => {
            item.check = true;
            // console.log(item);
          });
        }
      });
    },
    del(id) {
      getCartDelete({ id }).then((res) => {
        if (res.code == 200) {
          Toast.success(res.msg);
          this.getCartInfo();
        } else {
          Toast.fail(res.msg);
        }
      });
    },
    // 判断是否全选
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.cartList.map((item) => {
        item.check = this.isCheckAll;
      });
    },
    // 点击那一个商品， 将选择的状态置为相反的状态
    select(i) {
      this.cartList[i].check = !this.cartList[i].check;
    },
  },
  // 监听
  watch: {
    cartList: {
      deep: true,
      handler: function (val) {
        this.isCheckAll = this.cartList.every((item) => {
          return item.check;
        });
      },
    },
  },
  // 计算属性
  computed: {
    // 计算总价钱
    allPrice() {
      let sum = 0;
      this.cartList.forEach((item) => {
        sum += item.price * item.num;
      });
      // 价钱单位 是  分
      return sum * 100;
    },
  },
};
</script>

<style  lang="" scoped>
.delete-button {
  height: 100%;
}

.cbx {
  position: absolute;
  left: 10px;
  top: 50%;
  margin-top: -20px;
  z-index: 33;
}
.van-card {
  /* flex: 1; */
  padding-left: 40px;
}
</style>
