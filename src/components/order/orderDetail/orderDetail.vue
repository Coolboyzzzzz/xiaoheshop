<template>
  <div class="member-order-detail">
    <!-- 头部 -->
    <DetailAction @on-cancel="handlerCancel" :order="order"/>
    <!-- 进度 -->
    <DetailStep :order="order"/>
    <!-- 物流 -->
      <template>
        <!-- <DetailLogistics v-if="[3,4,5].includes(order.orderStatus)" :order="order"/> -->
        <DetailLogistics  :order="order"/>
      </template>
    <!-- 信息 -->
    <DetailInfo :order="order"/>
  </div>
</template>
<script>
import DetailAction from "./components/detail-action";
import DetailStep from "./components/detail-step";
import DetailLogistics from "./components/detail-logistics";
import DetailInfo from "./components/detail-info";
import { getOrder, updataOrderState } from "@/api/pay.js";
export default {
  components: {
    DetailAction,
    DetailStep,
       DetailLogistics,
      DetailInfo
  },
  data() {
    return {
      order: {}
    };
  },
  methods: {
    async getOrderDetail() {
      const { data: res } = await getOrder(this.$route.query.orderId);
      res.data[0].addressData = JSON.parse(res.data[0].addressData)
      res.data[0].bookDetail = JSON.parse(res.data[0].bookDetail)
      this.order = res.data[0];
      console.log(this.order)
    },
    //取消订单
    async handlerCancel(id) {
      const { data: res } = await updataOrderState({
        orderId: id,
        orderStatus: "6"
      });
      if (res.code != 200)
        return this.$message({
          type: "error",
          message: "取消订单失败，请稍后再试。"
        });
      this.$message({ type: "success", message: "取消订单成功！" });
      this.$store.dispatch("m_pay/initOrder");
      //进行更新
      this.getOrderDetail();
    }
  },
  created() {
    //进入详情页先进行请求id对应的详情页
    this.getOrderDetail();
  }
};
</script>
<style scoped lang="less">
.member-order-detail {
  background: #fff;
  height: 100%;
  width: 100%;
}
.loading {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
}
</style>
