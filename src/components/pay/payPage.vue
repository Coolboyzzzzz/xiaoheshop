<template>
  <div class="xtx-pay-page">
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/mycart' }">购物车</el-breadcrumb-item>
        <el-breadcrumb-item>支付订单</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 付款信息 -->
      <div class="pay-info">
        <span v-if="!(m==0 && s ==0 && state != 1)" class="icon1 el-icon-success"></span>
        <span v-else class="icon1 el-icon-remove"></span>
        <div class="tip"  >
          <template v-if="m!=0 && s !=0 && state == 1">
          <p>订单提交成功！请尽快完成支付。</p>
          <p>
            支付还剩
            <span>{{m}}分钟 {{s}}秒</span>, 超时后将取消订单
          </p>
          </template>
          <template v-else>
           <p>订单已经取消！请重新下单。</p>
          <p>订单已经超时</p></template>
        </div>
        <div class="amount">
          <span>应付总额： </span>
          <span>¥   {{ orderTotal}} </span>
        </div>
      </div>
      <!-- 付款方式 -->
      <div class="pay-type" v-if='state == 1'>
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" href="javascript:;"></a>
          <a class="btn alipay" target="_blank" @click="alipay"></a>
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a>
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
    <!-- 支付提示对话框 -->
    <el-Dialog title="正在支付..." :visible.sync="DialogVisible" append-to-body>
      <div class="pay-wait">
        <img src="./img/load.gif" alt>
        <div v-if="true">
          <p>如果支付成功：</p>
          <RouterLink :to="`/orderDetail?orderId=${$route.query.orderId}`">查看订单详情></RouterLink>
          <p>如果支付失败：</p>
          <RouterLink to="/">查看相关疑问></RouterLink>
        </div>
      </div>
    </el-Dialog>
  </div>
</template>
<script>
import { orderpay, getOrder } from "@/api/pay.js";
export default {
  data() {
    return {
      m: 29,
      s: 59,
      cur: new Date().getTime(), //生成订单的时间
      DialogVisible: false,
      orderTotal: 0,
      state:1,
      orderTotal:0
    };
  },
  methods: {
    async alipay() {
      this.DialogVisible = true;
      const data = {
        orderId: this.$route.query.orderId,
        callback: "http:127.0.0.1:8080/callback",
        orderTotal: this.orderTotal
      };
      const { data: res } = await orderpay(data);
      console.log(res);
      window.open(res.message, "_blank");
    },
    //倒计时
    countdown() {
      const end = this.cur; // update_time是后台返的数据，代表创建订单的那一个时刻的毫秒数
      const now = new Date().getTime(); // 获取当前时间的毫秒数
      const minus = now - end;
      const m_30 = 30 * 60 * 1000 - minus; // 30分钟毫秒数，如十分钟倒计时，公式即为10*60*100，以此类推

      const differ = m_30; // 时间差

      let m = parseInt((differ / 1000 / 60) % 60);
      let s = parseInt((differ / 1000) % 60);

      this.m = m > 9 ? m : "0" + m;
      this.s = s > 9 ? s : "0" + s;

      const that = this;
      if (m >= 0 && s >= 0) {
        if (m == 0 && s == 0) {
          window.reload()
          return;
        }
        setTimeout(function() {
          that.countdown();
        }, 1000);
      }
    },
    async getOrders() {
      //路由传参 进行请求
      const { data: res } = await getOrder(this.$route.query.orderId);
      //获取创建订单的时间
      const result = res.data[0]
      this.cur = new Date(result.createDate).getTime();
      this.state = result.orderStatus
      this.orderTotal = result.orderTotal
      console.log(this.cur,this.state,this.orderTotal)
    }
  },
  mounted() {
    this.countdown();
  },
  created() {
    //获取当前订单的状态
    this.getOrders();
  }
};
</script>
<style scoped lang="less">
.pay-wait {
  display: flex;
  justify-content: space-around;
  p {
    margin-top: 30px;
    font-size: 14px;
  }
  a {
    color: #1dc779;
  }
}
.container {
  width: 1200px;
  margin: 0 auto;
  min-height: 500px;
}
.el-breadcrumb {
  margin: 35px 0px;
}
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;
  .icon1 {
    font-size: 80px;
    color: #1dc779;
  }
  .tip {
    padding-left: 10px;
    flex: 1;
    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }
      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }
      &:last-child {
        color: #1dc779;
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;
    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;
    &.active,
    &:hover {
      border-color: #1dc779;
    }
    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png)
        no-repeat center / contain;
    }
    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg)
        no-repeat center / contain;
    }
  }
}
</style>