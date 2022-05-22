<template>
  <div class="container" >
    <div class="header">
      <imgScale :src="goodsData.bookphoto" />
      <div class="detail">
        <span class="title">{{goodsData.bookname}}</span>
        <div class="author">
          <a>{{goodsData.bookauthor}}</a>
          &nbsp; 著
          &nbsp;&nbsp;&nbsp;&nbsp;{{goodsData.bookabout}}
        </div>
        <div class="banner">
          <img src="./img/banner.png" alt>
          <div class="price">
            <span class="base">价格：</span>
            <span>￥{{goodsData.bookprice}}</span>
          </div>
          <div class="discount">
            <span>55价：</span>
            <span>￥{{discount}}</span>
            <img
              style="width:78px;height:16px;vertical-align:-webkit-baseline-middle;"
              src="./img/huasuan.png"
              alt
            >
          </div>
        </div>
        <div class="meta">
          <span class="base">运费：</span>
          <span>河北&nbsp;石家庄</span>&nbsp;&nbsp;
          至&nbsp;&nbsp;
          <VDistpicker class="address" province="广东省" city="广州市" area="海珠区"/>&nbsp;&nbsp;
          <span>快递费：0.00</span>
        </div>
        <div class="serve">
          <span>支持</span>
          <span>可配送海外</span>|
          <span>49元免基础运费</span>|
          <span>破损包退换</span>|
          <span>上门换新</span>
        </div>
        <div class="date">
          <span>出版时间：</span>
          <span>{{goodsData.bookdate | FormatDate}}</span>
        </div>
        <div class="pinxiang">
          <span>品相:</span>
          <span>全新</span>
        </div>
        <div class="number">
          <span>数量：</span>
          <el-input-number size="mini" v-model="num" :min="1" :max="goodsData.bookstock"/>
          库存：{{goodsData.bookstock}}
        </div>
        <div class="buy">
          <a @click="addCart">
            <i class="el-icon-shopping-cart-2"></i>加入购物车
          </a>
          <span style="color:#999;margin-left:100px;">
            温馨提示
            ·支持7天无理由退货
          </span>
        </div>
      </div>
      <div class="suggest">
        <suggest title="猜你喜欢" border="none"/>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="detail2">
      <div class="title2">
        <a>
          商品详情
          <span></span>
          <span></span>
        </a>
      </div>
      <div class="content">
        <img :src="goodsData.bookphoto">
        <div style="display:inline-block">
          <h1>书名： {{goodsData.bookname}}</h1>
          <h4>作者： {{goodsData.bookauthor}} &nbsp;&nbsp;著</h4>
          <h4>出版社： {{goodsData.bookabout}}</h4>
          <h4>出版时间： {{goodsData.bookdate | FormatDate}}</h4>
          <div class="bookdetail">
            <h1>内容简介</h1>
            <h4>{{goodsData.booktext}}</h4>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottomtitle">配送说明</div>
        <p>1.快递默认发申通、圆通、邮政，快递不接受指定，随机发货；</p>
        <p>2.不发中转仓代运仓，此类收货地址请勿下单；</p>
        <p>3.客户订单货物总重量超过1KG，本店酌收超重费；</p>
        <p>4.目前仓库人力有限，现货书籍会在工作日72小时内尽快发出，不保证具体发货时间，急单慎拍，不支持加急! 周末仓库休息一天发货略有延迟；</p>
        <p>5.本店商品若有缺货，将通过站内信通知，同时发出已经配到的图书，如有异议，请下单前说明；</p>
        <p>6.订单发货后：①本店不受理客户变更收货地址的要求。②买家由于自身原因（包括全新书7天无理由退货）申请（或导致）退货，则由买家承担发货和退货运费，介意者请慎拍！</p>
        <p>7.带塑封书籍一经拆封，不支持7天无理由退换，还请理解！</p>
      </div>
    </div>
    </div>
</template>

<script>
import suggest from "@/components/rank/suggestCate.vue";
import { getBookdetail } from "@/api/recommend.js";
import VDistpicker from "v-distpicker";
import imgScale from "./imgScale.vue";
import { mapMutations } from "vuex";
export default {
  components: {
    imgScale,
    VDistpicker,
    suggest
  },
  data() {
    return {
      cur: 0,
      num: 1,
      goodsData: []
    };
  },
  created() {
    this.getbookDetail(this.$route.query.bookid);
  },
  watch: {
    '$route' (to, from) {
        this.$router.go(0);
    }
},
  computed: {
    discount() {
      return (this.goodsData.bookprice * this.goodsData.discount).toFixed(2);
    }
  },
  methods: {
    ...mapMutations("m_cart", ["addTocart"]),
    async getbookDetail(id) {
      const res = await getBookdetail(id);
      this.goodsData = res.data.data;
      console.log(this.goodsData);
    },
    addCart() {
      if (!this.$store.state.m_users.token) {
        this.$message({message:"请先登录,即将跳转登录界面！",type:'warning'});
        setTimeout(() => {
            this.$router.push("/login");
        }, 2000);
      return
      }
      const goods = {
        bookid: this.goodsData.bookid,
        book_count: this.num,
        book_state: true
      };
      this.addTocart(goods);
    }
  },
  //定义一个过滤器 格式化时间
  filters: {
    FormatDate(msg) {
      msg = new Date(msg);
      let date = {
        year: msg.getFullYear(),
        month: msg.getMonth() + 1,
        date: msg.getDate()
      };

      if (parseInt(date.date) < 10) {
        date.date = "0" + date.date;
      }
      return date.year + "-" + date.month + "-" + date.date;
    }
  }
};
</script>


<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  .header {
    //   box-shadow: 0 6px 20px 0 rgba(37, 43, 50, 0.15);
    margin-top: 20px;
    padding: 10px 10px 50px 10px;
    .detail {
      width: 500px;
      display: inline-block;
      margin-left: 40px;
      height: 400px;
      .author {
        a {
          color: rgb(0, 129, 180);
          cursor: pointer;
          &:hover {
            color: red;
            text-decoration: underline;
          }
        }
      }
      .title {
        width: 380px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1; /* 这里是超出几行省略 */
        overflow: hidden;
        font-size: 24px;
        font-weight: 700;
        color: #000;
      }
      .banner {
        font-family: Arial;
        width: 500px;
        background-color: #eee;
        img {
          width: 500px;
        }
        .price {
          span:nth-child(2) {
            text-decoration: line-through;
            font-size: 14px;
          }
        }
        .discount {
          span:nth-child(1) {
            color: #999;
            font-size: 12px;
            color: rgb(255, 0, 54);
            font-weight: bold;
            text-align: left;
            float: left;
            width: 69px;
            margin: 15px 0 0 10px;
            vertical-align: middle;
          }
          span:nth-child(2) {
            vertical-align: middle;
            font-size: 30px;
            color: #ff0036;
            font-weight: bolder;
            font-family: Arial;
            -webkit-font-smoothing: antialiased;
            margin-right: 5px;
          }
        }
      }
      .meta {
        margin: 5px 20px 5px 0;
        height: 37px;
        line-height: 37px;
        .address {
          display: inline;
          /deep/select {
            max-width: 75px;
            padding: 0;
            height: inherit;
            font-size: inherit;
          }
        }
      }
      .serve {
        color: #999;
        span:nth-child(1) {
          margin-left: 87px;
        }
        span:not(:first-child) {
          padding: 0 10px;
        }
      }
      .date {
        color: #999;
        height: 37px;
        line-height: 37px;
        span:nth-child(1) {
          margin-left: 8px;
        }
        span:nth-child(2) {
          color: #111;
          margin-left: 17px;
        }
      }
      .pinxiang {
        height: 37px;
        line-height: 37px;
        color: #999;
        span:nth-child(1) {
          margin-left: 8px;
        }
        span:nth-child(2) {
          color: #111;
          margin-left: 48px;
        }
      }
      .number {
        color: #999;
        span:nth-child(1) {
          margin-left: 8px;
        }
        .el-input-number {
          margin: 0 42px;
          width: 100px;
        }
      }
      .buy {
        height: 70px;
        width: 500px;
        line-height: 80px;
        a {
          width: 160px;
          margin-top: -1px;
          border-radius: 2px;
          color: #fff;
          cursor: pointer;
          background-color: #8c222c;
          display: inline-block;
          height: 40px;
          font-size: 14px;
          line-height: 38px;
          text-align: center;
          i {
            font-size: 20px;
          }
        }
      }
    }
    .suggest {
      float: right;
      width: 250px;
      height: 450px;
      overflow: hidden;
    }
  }
}
.base {
  color: #999;
  font-size: 12px;
  text-align: left;
  float: left;
  width: 69px;
  margin: 0 10px 0 8px;
}
.detail2 {
  .title2 {
    height: 50px;
    line-height: 50px;
    background-color: #ddd;
    font-size: 15px;
    font-weight: bold;
    a {
      display: inline-block;
      background-color: #eee;
      width: 110px;
      height: 50px;
      padding: 0 20px;
      position: relative;
      border-right: 1px solid #e5e5e5;
      span {
        display: block;
      }
      span:nth-child(1) {
        background-color: #86998d;
        position: absolute;
        top: 1px;
        left: 0;
        width: 100%;
        height: 2px;
      }
      span:nth-child(2) {
        position: absolute;
        top: 48px;
        left: 0;
        width: 100%;
        height: 2px;
        background: #b2cabb;
      }
    }
  }
  .content {
    margin: 25px auto 50px;
    position: relative;
    width: 1100px;
    padding: 40px;
    background-color: #fff;
    border: 3px solid rgba(137, 153, 169, 0.2);
    color: #333;
    img {
      vertical-align: top;
      width: 450px;
      height: 536px;
    }
    h1,
    h4 {
      margin-top: 10px;
    }
    .bookdetail {
      padding: 20px;
      height: 400px;
      width: 500px;
      //    background-color: #eee;
      border: 3px solid rgba(116, 129, 141, 0.2);
      color: #333;
    }
  }
  .bottom {
    border: 1px solid #e5e5e5;
    color: #333;
    margin: 25px 0;
    height: 300px;

    .bottomtitle {
      height: 50px;
      line-height: 50px;
      background-color: #ddd;
      font-size: 15px;
      font-weight: bold;
      padding-left: 10px;
    }
    p {
      font-size: 13px;
      color: #86998d;
      margin: 10px;
    }
  }
}
</style>
