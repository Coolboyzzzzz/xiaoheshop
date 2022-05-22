<template>
  <div class="order-item">
    <div class="head">
      <span>下单时间：{{order.createDate}}</span>
      <span>订单编号：{{order.orderId}}</span>
      <span class="down-time" v-if="order.orderStatus=='1' && (m!=0 && s!=0)">
        <i class="el-icon-alarm-clock"></i>
        <b>付款截止：{{m}}分{{s}}秒</b>
      </span>
      <el-popconfirm
        confirm-button-text="确定"
        cancel-button-text="取消"
        icon="el-icon-info"
        icon-color="red"
        title="删除后不可恢复，你确定删除吗？"
        @confirm="deleteItem"
      >
        <a
          slot="reference"
          href="javascript:;"
          class="del"
          v-if="['5','6'].includes(order.orderStatus)"
        >删除</a>
      </el-popconfirm>
    </div>
    <div class="body">
      <div class="column goods">
        <ul>
          <li v-for="goods in order.bookDetail" :key="goods.bookid">
            <RouterLink class="image" :to="`/goodsDetail?bookid=${goods.bookid}`">
              <img style="width:70px;height:70px;" :src="goods.bookphoto" alt>
            </RouterLink>
            <div class="info">
              <p class="name ellipsis-2">{{goods.bookname}}</p>
              <p class="attr ellipsis">作者：{{goods.bookauthor}} 出版社：{{goods.bookabout}}</p>
            </div>
            <div class="price">¥{{(goods.discount*goods.bookprice).toFixed(2)}}</div>
            <div class="count">x{{goods.book_count}}</div>
          </li>
        </ul>
      </div>
      <div class="column state">
        <p>{{MapState[order.orderStatus] }}</p>
        <!-- 待收货  查看物流 -->
        <!-- 待评价  评价商品 -->
        <!-- 已完成  查看评价 -->
        <p @click="$emit('on-logistics', order)" v-if="order.orderState==3">
          <a class="green" href="javascript:;">查看物流</a>
        </p>
        <p v-if="order.orderState==4">
          <a class="green" href="javascript:;">评价商品</a>
        </p>
        <p v-if="order.orderState==5">
          <a class="green" href="javascript:;">查看评价</a>
        </p>
      </div>
      <div class="column amount">
        <p class="red">¥{{order.orderTotal}}</p>
        <p>（含运费：¥{{0}}）</p>
        <p>在线支付</p>
      </div>
      <div class="column action">
        <!-- 待支付：立即付款，查看详情，取消订单 -->
        <!-- 待发货：查看详情，再次购买 -->
        <!-- 待收货：确认收货，查看详情，再次购买 -->
        <!-- 待评价：查看详情，再次购买，申请售后 -->
        <!-- 已完成：查看详情，再次购买，申请售后 -->
        <!-- 已取消：查看详情 -->
        <el-button
          @click="$router.push(`/payPage?orderId=${order.orderId}`)"
          v-if="order.orderStatus==1"
          type="danger"
          size="small"
        >立即付款</el-button>
        <elButton
          @click="$emit('on-confirm', order)"
          v-if="order.orderStatus==3"
          type="primary"
          size="small"
        >确认收货</elButton>
        <p>
          <a @click="$router.push({path:'/orderDetail',query:{orderId : order.orderId}})" href="javascript:;">查看详情</a>
        </p>
        <p v-if="order.orderStatus==1">
          <a @click="dialogVisible = true" href="javascript:;">取消订单</a>
        </p>
        <p
          @click="$router.push(`/member/checkout?orderId=${order.id}`)"
          v-if="['2','3','4','5'].includes(order.orderStatus)"
        >
          <a href="javascript:;">再次购买</a>
        </p>
        <p v-if="['4','5'].includes(order.orderStatus)">
          <a href="javascript:;">申请售后</a>
        </p>
        <cancelDialog @cancelTrue='dialogVisible=false' @cancel='cancel' :dialogVisible='dialogVisible' />
      </div>
    </div>
  </div>
</template>
<script>
import cancelDialog from './cancel.vue'
export default {
    components:{
        cancelDialog
    },
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      m: 0, //剩余分
      s: 0, //剩余秒
      MapState: {
        1: "待付款",
        2: "待发货",
        3: "待收货",
        4: "待评价",
        5: "已完成",
        6: "已取消"
      },
      cur: new Date().getTime(), //初始化时间
      dialogVisible:false
    };
  },
  created() {
    this.countdown();
    this.cur = new Date(this.order.createDate).getTime();
  },
  methods: {
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
          this.$store.dispatch("m_pay/initOrder");
          return;
        }
        setTimeout(function() {
          that.countdown();
        }, 1000);
      }
    },
    //删除订单
    deleteItem() {
      this.$emit("on-delete", this.order.orderId);
    },
    //更新订单状态
    cancel() {
      this.dialogVisible = false;
      this.$emit("on-cancel", this.order.orderId);
    }
  }
};
</script>
<style scoped lang="less">
* {
  color: #333;
  font: 1em/1.4 Microsoft Yahei, PingFang SC, Avenir, Segoe UI, Hiragino Sans GB,
    STHeiti, "Microsoft Sans Serif", WenQuanYi Micro Hei, sans-serif;
}
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        i {
          font-size: 16px;
          font-style: normal;
          -webkit-font-smoothing: antialiased;
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: 400;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      text-decoration: none;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: #27ba9b;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: red;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: #27ba9b;
          }
        }
      }
    }
  }
}
</style>
