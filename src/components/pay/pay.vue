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
      <addRess class="check" :item="addressCur"/>
      <div class="button">
        <el-button @click="dialogSwitch = true">切换地址</el-button>
        <el-button @click="dialogVisible = true">添加地址</el-button>
      </div>
    </div>
    <div class="titlegoods">商品信息</div>
    <div class="goodstitle">
      <el-row :gutter="20">
        <el-col :span="11">
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
      </el-row>
    </div>
    <cartgoods :book="item" v-for="(item,index) in $store.getters['m_cart/order']" :key="index"/>

    <addAddress @closehandler="dialogVisible = false" :dialogVisible="dialogVisible"/>
    <switchAddress @closehandler="dialogSwitch = false" :dialogSwitch="dialogSwitch"/>
    <div>&nbsp;</div>
    <div class="titlegoods">配送时间</div>
    <div style="padding:30px 0 10px;">
      <el-radio v-model="radio1" label="1" border>不限送货时间：周一至周日</el-radio>
      <el-radio v-model="radio1" label="2" border>工作日提货：周一至周五</el-radio>
      <el-radio v-model="radio1" label="3" border>双休日：周六日送货</el-radio>
    </div>
    <div class="titlegoods">支付方式</div>
    <div style="padding:30px 0 10px;">
      <el-radio v-model="radio1" label="1" border>在线支付</el-radio>
      <el-radio v-model="radio1" label="2" border>货到付款</el-radio>
    </div>
    <div class="titlegoods">金额明细</div>
    <dl class="total">
      <dt>商品件数：</dt>
      <dd>{{$store.getters['m_cart/num']}}件</dd>
    </dl>
    <dl class="total">
      <dt>商品总价：</dt>
      <dd>￥{{$store.getters['m_cart/sum'].pre}}</dd>
    </dl>
    <dl class="total">
      <dt>
        运
        <div style="display:inline-block;width:2em;"></div>费：
      </dt>
      <dd>￥0</dd>
    </dl>
    <dl class="total">
      <dt>活动满减：</dt>
      <dd>
        <span>-{{($store.getters['m_cart/sum'].pre - $store.getters['m_cart/sum'].cur).toFixed(2)}}</span>
      </dd>
    </dl>
    <dl class="total" style="border-bottom: 2px solid #f1f1f1;">
      <dt>应付金额：</dt>
      <dd>
        <span class="sizes">￥{{$store.getters['m_cart/sum'].cur}}</span>
      </dd>
    </dl>
    <div class="submit">
      <el-button type="danger">提交订单</el-button>
    </div>
  </div>
</template>

<script>
import cartgoods from "./gooddetail.vue";
import addAddress from "./addAddress.vue";
import addRess from "./address.vue";
import switchAddress from "./switch.vue";
export default {
  components: {
    cartgoods,
    addAddress,
    addRess,
    switchAddress
  },
  data() {
    return {
      dialogVisible: false,
      dialogSwitch: false,
      radio1: "1"
    };
  },
  created() {
    //   进入支付页面初始化地址
    this.$store.dispatch("m_address/initaddress");
  },
  computed: {
    addressCur() {
      return this.$store.state.m_address.address[
        this.$store.state.m_address.index
      ];
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
      height: 70px;
      line-height: 90px;
      font-size: 15px;
    }
  }
  .address {
    position: relative;
    height: 140px;
    .border {
      border: 1px solid #dad0d0;
      position: absolute;
      top: 40%;
      left: 70%;
      height: 70px;
    }
    .button {
      position: absolute;
      top: 50%;
      left: 75%;
    }
    .el-descriptions {
      width: 800px;
    }
  }
}
.goodstitle {
  margin: 20px 0 0;
  height: 70px;
  font-size: 15px;
  text-align: center;
  line-height: 70px;
  background-color: #eee;
  border-radius: 10px;
}
.check {
  padding-top: 44px;
}
.time {
  height: 70px;
  line-height: 90px;
  font-size: 15px;
  border-bottom: 2px solid #f1f1f1;
}
.titlegoods {
  height: 70px;
  line-height: 90px;
  font-size: 15px;
  border-bottom: 2px solid #f1f1f1;
  width: 1200px;
}
.total {
  color: #333;
  font: 14px Microsoft Yahei, PingFang SC, Avenir, Segoe UI, Hiragino Sans GB,
    STHeiti, "Microsoft Sans Serif", WenQuanYi Micro Hei, sans-serif;
  display: flex;
  justify-content: flex-end;
  height: 50px;
  line-height: 50px;
  dt {
    width: 150px;
  }
  dd {
    width: 240px;
    text-align: right;
    padding-right: 70px;
    span {
      color: red;
      font-size: 18px;
    }
    .sizes {
      font-size: 24px;
    }
  }
}
.submit {
  height: 170px;
  padding: 60px;
  text-align: right;
}
</style>

