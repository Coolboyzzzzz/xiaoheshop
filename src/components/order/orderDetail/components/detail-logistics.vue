<template>
  <div class="detail-logistics">
    <p>
      <span>{{'提交订单'}}</span>
      <span>{{order.createDate}}</span>
    </p>
    <a href="javascript:;" @click="visibleDialog = true">查看物流</a>
      <OrderLogistics :order='order' @close='visibleDialog = false' :visibleDialog='visibleDialog' />
  </div>
</template>
<script>
import OrderLogistics from './order-logistics'
export default {
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    OrderLogistics
  },
  data(){
      return{
          visibleDialog:false
      }
  }
}
</script>
<style scoped lang="less">
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: rgb(207, 87, 87);
    text-align: center;
  }
}
</style>
