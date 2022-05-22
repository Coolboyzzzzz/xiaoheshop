<template>
  <div class="xtx-pay-page">
    <div class="container">
      <el-breadcrumb>
        <el-breadcrumbItem to="/">首页</el-breadcrumbItem>
        <el-breadcrumbItem to="/cart">购物车</el-breadcrumbItem>
        <el-breadcrumbItem>支付结果</el-breadcrumbItem>
      </el-breadcrumb>
      <!-- 支付结果 -->
      <div class="pay-result">
        <span v-if="$route.query.payResult" class="iconfont1 green el-icon-success"></span>
        <span v-else class="iconfont1 el-icon-error" ></span>
        <p class="tit">订单支付{{$route.query.payResult?'成功':'失败'}}</p>
        <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
        <p>支付方式：<span>支付宝支付</span></p>
        <p>支付金额：<span class="red">¥{{$route.query.total_amount}}</span></p>
        <div class="btn">
          <el-button @click="$router.push('/myorder')" type="primary" style="margin-right:20px">查看订单</el-button>
          <elButton @click="$router.push('/home')" type="gray">进入首页</elButton>
        </div>
        <p class="alert">
          <span class="iconfont1 el-icon-s-opportunity"></span>
          温馨提示：小何书店不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import {  getOrder,updataOrderState } from "@/api/pay.js";
export default {
    created(){
            //获取当前订单的状态
    this.updataOrder();
    },
    methods:{
    async updataOrder() {
      //路由传参 进行请求
      const { data: res } = await updataOrderState({
          orderStatus:2,
          orderId:this.$route.query.orderId
      });
      if(res.code != 200) return this.$message({type:'error',message:'订单出错，请联系客服处理'})
      this.$message({type:'success',message:'付款成功'})
    }
    }

}
</script>
<style scoped lang="less">
.container{
    width: 1200px;
    margin: 0 auto;
}
.el-breadcrumb {
  margin: 35px 0px;
}
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  > .iconfont1 {
    font-size: 100px;
  }
  .green {
    color: #1dc779;
  }
  .red {
    color: red;
  }
  .tit {
    font-size: 24px;
  }
  .tip {
    color: #999;
  }
  p {
    line-height: 40px;
    font-size: 16px;
  }
  .btn {
    margin-top: 50px;
  }
  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>