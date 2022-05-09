<template>
  <div class="container">
    <div class="header">
      <div class="title">收货地址</div>
      <el-steps :active="3" finish-status="success">
        <el-step title="选择商品"></el-step>
        <el-step title="添加到购物车"></el-step>
        <el-step title="拍下商品"></el-step>
        <el-step title="付款到支付宝"></el-step>
        <el-step title="确认收货"></el-step>
      </el-steps>
    </div>
    <div class="address">
      <span class="border"></span>
      <el-descriptions class="margin-top" title="默认地址" :column="3" border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            收货人
          </template>
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号
          </template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            寄往省份
          </template>
          苏州市
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-tickets"></i>
            备注
          </template>
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            收货地址
          </template>
          江苏省苏州市吴中区吴中大道 1188 号
        </el-descriptions-item>
      </el-descriptions>
      <div class="button">
      <el-button @click="dialogVisible = true"> 切换地址</el-button>
      <el-button @click="dialogVisible = true">添加地址</el-button></div>
    </div>
    <cartgoods v-for="(item,index) in [1,2,3,2,1,1]" :key="index"/>

<addAddress @closehandler='dialogVisible = false' :dialogVisible='dialogVisible' />
  </div>
</template>

<script>
import cartgoods from "../my_cart/cartgoods/cartgoods.vue";
import addAddress from './addAddress.vue'
export default {
  components: {
    cartgoods,
    addAddress
  },
  data(){
      return{
          dialogVisible:false
      }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  .header {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #f1f1f1;
    .el-steps {
      margin: 25px 0 15px;
      width: 600px;
    }
    .title {
      align-self: flex-end;
      height: 50px;
      width: 120px;
      font-size: 25px;
      text-align: center;
      color: #ccc;
    }
  }
  .address {
    position: relative;
    .border {
      border: 1px solid #dad0d0;
      position: absolute;
      top: 40%;
    left: 70%;
    height: 70px;
    }
    .button{
            position: absolute;
      top: 50%;
    left: 75%;

    }
    .el-descriptions {
      width: 800px;
    }
  }
}
</style>

