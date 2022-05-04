
<template>
  <div class="container">
    <!-- 如果有购物车数据 -->
    <template v-if="true">
      <el-card class="box-card">
        <div slot="header" class="headerCart">
          <span class="switch-cart">
            购物车（全部
            <span style="font-weight:700">70</span>）
          </span>
          <div class="car_sum">
            <span class="pay-text">
              已选商品（不含运费）
              <span class="total">0.00</span>
            </span>
            <el-button type="danger">结算</el-button>
          </div>
        </div>
        <div class="contentTop">
        <el-row :gutter="20">
          <el-col :span="2">
            <div class="grid-content">
              <div class="selectAll">
                <input type="checkbox">
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
           <cartgoods v-for="(item,index) in [1,2,3,2,1,1]" :key="index"/>
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
import cartgoods from './cartgoods/cartgoods.vue'
export default {
  components: {
    empty,
    cartgoods
  }
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
.el-row{
    width: 1200px;
}
</style>
