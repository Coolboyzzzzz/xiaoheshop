<template>
  <div class="detail-step">
    <elSteps :active="order.orderStatus==6?1:order.orderStatus"  :space="200"  >
      <elStep title="提交订单" :description="order.createDate"  />
      <elStep title="付款成功"   />
      <elStep title="商品发货"  />
      <elStep title="确认收货"  />
      <elStep title="订单完成"  />
    </elSteps>
  </div>
</template>
<script>
export default {
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style scoped lang="less">
.detail-step {
      padding: 20px 0px 20px 93px;
}
</style>
