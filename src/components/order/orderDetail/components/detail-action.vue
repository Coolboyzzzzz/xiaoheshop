<template>
  <div class="detail-action">
    <div class="state">
      <span style="
    margin: 5px;" class="iconfont1 el-icon-bell"></span>
      <p>{{orderSum[order.orderStatus]}}</p>
    </div>
    <div class="info">
      <p>订单编号：{{order.orderId}}</p>
      <p>下单时间：{{order.createDate}}</p>
    </div>
    <div class="btn">
      <!-- 待付款 -->
      <template v-if="order.orderStatus == 1">
        <elButton
          @click="$router.push('/payPage?orderId='+order.orderId)"
          type="primary"
          size="small"
        >立即付款</elButton>
        <elButton @click="dialogVisible=true" type="gray" size="small">取消订单</elButton>
      </template>
      <!-- 待发货 -->
      <template v-if="order.orderStatus == 2">
        <elButton type="primary" size="small">再次购买</elButton>
      </template>
      <!-- 待收货 -->
      <template v-if="order.orderStatus == 3">
        <elButton @click="handlerConfirm(order)" type="primary" size="small">确认收货</elButton>
        <elButton type="plain" size="small">再次购买</elButton>
      </template>
      <!-- 待评价 -->
      <template v-if="order.orderStatus == 4">
        <elButton type="primary" size="small">再次购买</elButton>
        <elButton type="plain" size="small">评价商品</elButton>
        <elButton type="gray" size="small">申请售后</elButton>
      </template>
      <!-- 已完成 -->
      <template v-if="order.orderStatus == 5">
        <elButton type="primary" size="small">再次购买</elButton>
        <elButton type="plain" size="small">查看评价</elButton>
        <elButton type="gray" size="small">申请售后</elButton>
      </template>
      <!-- 已取消 -->
    </div>
    <OrderCancel @cancelTrue="dialogVisible=false" @cancel="cancel" :dialogVisible="dialogVisible"/>
  </div>
</template>
<script>
import OrderCancel from "@/components/order/components/cancel.vue";
export default {
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    OrderCancel
  },
  data() {
    return {
      dialogVisible: false
    };
  },
  methods: {
    //取消订单
    //更新订单状态
    cancel() {
      this.dialogVisible = false;
           this.$emit("on-cancel", this.order.orderId);
           console.log(13)
    },
  },

  computed: {
    orderSum() {
      return {
        0: "全部订单",
        1: "待付款",
        2: "待发货",
        3: "待收货",
        4: "待评价",
        5: "已完成",
        6: "已取消"
      };
    }
  }
};
</script>
<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont1 {
      font-size: 40px;
      color: rgb(45, 167, 175);
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .el-button {
      margin-left: 20px;
    }
  }
}
</style>
