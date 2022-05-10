
<template>
  <div class="container">
    <!-- 如果有购物车数据 -->
    <template v-if="cart.length">
      <el-card class="box-card">
        <div slot="header" class="headerCart">
          <span class="switch-cart">
            购物车（全部
            <span style="font-weight:700">{{total}}</span>）
          </span>
          <div class="car_sum">
            <span class="pay-text">
              已选商品（不含运费）
              <span ref="pre" class="total">￥{{sum.pre}}</span>
              <span ref="cur" v-if="show">活动满减优惠后：￥{{sum.cur}}</span>
            </span>
            <router-link to="/pay">
              <el-button type="danger">结算</el-button>
            </router-link>
          </div>
          <!-- 显示满减的优惠金额 -->
          <div class="showmoney">
            <span v-html="money"></span>
          </div>
        </div>
        <div class="contentTop">
          <el-row :gutter="20">
            <el-col :span="2">
              <div class="grid-content">
                <div class="selectAll">
                  <input type="checkbox" @change="changeSelect" :checked="status">
                  <span>全选</span>
                </div>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content">
                <span>商品信息</span>
              </div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content">单价</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content">数量</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content">金额</div>
            </el-col>
            <el-col :span="3">
              <div class="grid-content">操作</div>
            </el-col>
          </el-row>
        </div>
        <cartgoods
          @changNum="updataNum"
          @changeState="changestate"
          @dele="deleteGoods"
          v-for="(goods,index) in cart"
          :key="index"
          :book="goods"
        />
      </el-card>
    </template>

    <!-- 没有加入购物车 -->
    <template v-else>
      <empty></empty>
    </template>
  </div>
</template>

<script>
//购物车为空的页面
import empty from "./cartEmpty/empty.vue";
import cartgoods from "./cartgoods/cartgoods.vue";
import { mapState, mapMutations, mapGetters,mapActions } from "vuex";
export default {
  components: {
    empty,
    cartgoods
  },
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapState("m_cart", ["cart"]),
    ...mapGetters("m_cart", ["status", "total", "sum"]),
    money() {
      if (this.sum.pre < 100) {
        return `还差<span style="color: #FF7800;font-size:14px;">${(
          100 - this.sum.pre
        ).toFixed(
          2
        )}</span>元可参与<span style="color: #FF7800;font-size:14px;">满100减50</span>`;
      } else {
        return `已参与<span style="color: #FF7800;font-size:14px;">满100减50</span>,已优惠<span style="color: #FF7800;font-size:14px;">${(
          this.sum.pre - this.sum.cur
        ).toFixed(2)}</span>元`;
      }
    }
  },
  watch: {
    sum: {
      immediate: true,
      handler() {
        if (this.sum.pre >= 100) {
          this.show = true;
          this.$nextTick(() => {
            this.$refs["pre"].style.textDecoration = "line-through";
            this.$refs["pre"].classList.remove("total");
            this.$refs["cur"].classList.add("total");
          });
        } else {
          if(this.sum.pre == 0 ) return
          this.show = false;
          this.$nextTick(() => {
            this.$refs["pre"].style.textDecoration = "none";
            this.$refs["pre"].classList.add("total");
          });
          
        }
      }
    }
  },
  methods: {
    ...mapMutations("m_cart", [
      "updatanum",
      "updatacart",
      "checkedAll",
      "deletegoods",
      'saveServe'
    ]),
        ...mapActions('m_cart',['getcart']),
    updataNum(obj) {
      this.updatanum(obj);
    },
    changestate(obj) {
      this.updatacart(obj);
    },
    changeSelect() {
      this.checkedAll();
    },
    deleteGoods(id) {
      this.deletegoods(id);
    },
  
  },
  created() {
    this.getcart()
  },
  // beforeDestroy(){
  //   console.log(212)
  //   this.cart.forEach(item => {
  //     this.saveServe({
  //       bookid:item.bookid,
  //       book_count: item.book_count,
  //       book_state: item.book_state
  //     })
  //   })
  // }
};
</script>

<style lang="less" scoped>
* {
  z-index: 10;
}
.container {
  //为了防止背景覆盖
  position: relative;
  width: 1200px;
  margin: 0 auto;
}
.el-card {
  margin-top: 40px;
  min-height: 400px;
}

.headerCart {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .switch-cart {
    overflow: hidden;
    color: #000;
    font-size: 18px;
    font-weight: 400;
    height: 36px;
    line-height: 36px;
  }
  .pay-text {
    font-family: Verdana, Arial;
    font-size: 14px;
    .total {
      position: relative;
      top: 3px;
      color: #ff5000;
      font-size: 22px;
      padding: 0 12px;
      font-weight: 200;
    }
  }
  .el-button {
    width: 74px;
    height: 42px;
    border-radius: 21px;
  }
  .showmoney {
    position: absolute;
    top: 56px;
    right: 114px;
  }
}
.contentTop {
  color: #3c3c3c;
  font-weight: 700;
  span {
    font-weight: 700;
    position: relative;
    top: -2px;
  }
  .selectAll {
    input {
      width: 15px;
      height: 15px;
    }
    span {
      font-size: 13px;
      margin-left: 5px;
    }
  }
}
.el-row {
  width: 1200px;
}
</style>
