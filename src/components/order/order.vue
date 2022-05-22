<template>
  <div class="container">
    <!--侧边栏 -->
    <Appaside class="menu"/>
    <!--订单区域 -->
    <router-view v-if='$route.query.orderId'  />
    <template v-else>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane
          v-for="item in orderSum"
          :key="item.name"
          :label="`${item.name}(${item.sum})`"
          :name="item.state"
        ></el-tab-pane>
        <div class="order-list" v-loading='flag'>
           <el-empty class="none" v-if="!flag && orderList.length === 0"></el-empty> 
          <orderItem
            @on-cancel="handlerCancel"
            @on-delete="handlerDelete"
            @on-confirm="handlerConfirm"
            @on-logistics="handlerLogistics"
            v-for="item in orderList"
            :key="item.orderId"
            :order="item"
          />
        </div>
   
      </el-tabs>
    </template>
  </div>
</template>

<script>
import Appaside from "./app-aside.vue";
import orderItem from "./components/orderItem.vue";
import { mapState, mapGetters } from "vuex";
import { deleteOrder,updataOrderState } from '@/api/pay.js'
export default {
  components: {
    Appaside,
    orderItem
  },
  computed: {
    ...mapState("m_pay", ["order"]),
    ...mapGetters("m_pay", [
      "cancelPay",
      "finshedPay",
      "finshPay",
      "alreadyPay",
      "readyPay",
      "waitPay"
    ]),
    orderSum() {
      return [
        {
          name: "全部订单",
          state: "0",
          sum: this.order.length
        },
        {
          name: "待付款",
          state: "1",
          sum: this.waitPay.length
        },
        {
          name: "待发货",
          state: "2",
          sum: this.readyPay.length
        },
        {
          name: "待收货",
          state: "3",
          sum: this.alreadyPay.length
        },
        {
          name: "待评价",
          state: "4",
          sum: this.finshPay.length
        },
        {
          name: "已完成",
          state: "5",
          sum: this.finshedPay.length
        },
        {
          name: "已取消",
          state: "6",
          sum: this.cancelPay.length
        }
      ];
    },
    //获取当前状态的订单
    orderList() {
      var result = this.order.filter(
        item => item.orderStatus == this.activeName || this.activeName == 0
      );
      this.flag = false
      return result
    }
  },
  data() {
    return {
      activeName: "0",
      flag:true
    };
  },
  methods: {
async handlerDelete(id){
const {data:res} =  await deleteOrder({orderId:id})
console.log(res)
if(res.code !== 200) return this.$message({type:"error",message:res.message})
this.$message({type:"success",message:res.message})
this.$store.dispatch('m_pay/initOrder')
},
handlerLogistics(){

},
handlerConfirm(){

},
//取消订单
async  handlerCancel(id){
const {data:res} =  await updataOrderState({orderId:id,orderStatus:'6'})
if(res.code != 200) return this.$message({type:'error',message:'取消订单失败，请稍后再试。'})
this.$message({type:'success',message:'取消订单成功！'})
    this.$store.dispatch("m_pay/initOrder");
}

  },
  created() {
    this.$store.dispatch("m_pay/initOrder");
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  margin-top: 35px;
}
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  min-height: 400px;
  width: 960px;
}
.el-empty {
  margin-top: 150px;
}
.el-tabs {
  flex: 1;
  background-color: #fff;
}
/deep/.el-tabs__item {
  width: 120px;
  height: 60px;
  text-align: center;
  font-size: 16px;
  line-height: 60px;
  border-top-color: #fff;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
  border-top: 2px solid #27ba9b;
  height: 60px;
  background: #fff;
  line-height: 56px;
}
/deep/.el-tabs--card > .el-tabs__header .el-tabs__item:last-child {
  border-right: 1px solid #e4e7ed;
}
</style>
