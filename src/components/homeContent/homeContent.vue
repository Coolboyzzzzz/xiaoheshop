<template>
  <div class="container">
    <search-bar/>
    <div>
      <img src="./img/banner1.jpg" alt style>
    </div>

    <div class="container">
      <!-- 轮播图 -->
      <div id="Carousel">
        <homeCate/>
        <div class="block">
          <el-carousel :interval="4000" arrow="always" height="460px">
            <el-carousel-item v-for="(url,index) in imgUrls" :key="index">
              <el-image :src="url" fit="fill"></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="gonggao">
          <el-image
            style="width:170px;height:165px;"
            src="http://img63.ddimg.cn/upload_img/00838/cxtc/202x195-1651915800.jpg"
            fit="fill"
          ></el-image>
          <el-tabs class="title" v-model="activeName">
            <el-tab-pane label="信息公告" name="first">
              <ul>
                <li><i class="el-icon-caret-right"></i><span> 茵曼大牌日</span></li>
                <li><i class="el-icon-caret-right"></i><span>童书大世界 爆品童书抢购</span></li>
                <li><i class="el-icon-caret-right"></i><span>图书每满100减50</span></li>
                <li><i class="el-icon-caret-right"></i><span>中小学用书，每满100减50</span></li>
                <li><i class="el-icon-caret-right"></i><span>水星家纺满700-150</span></li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="服务公告" name="second">
              <ul>
                <li><i class="el-icon-caret-right"></i><span>关于谨防诈骗的重要提示</span></li>
                <li><i class="el-icon-caret-right"></i><span>话费卡兑换当当礼品卡</span></li>
                <li><i class="el-icon-caret-right"></i><span>【虚假发货】-处罚公告</span></li>
              </ul>
            </el-tab-pane>
          </el-tabs>
            <el-carousel :interval="5000" indicator-position='none' initial-index='3' height="140px">
    <el-carousel-item  v-for="(url,index) in imgUrls" :key="index">
      <el-image :src="url" fit="fill"></el-image>
    </el-carousel-item>
  </el-carousel>
        </div>
      </div>
      <!--排行榜-->
      <div id="banner">
        <!-- 排行榜组件 -->
        <rank-vue :rankData="rankData" @bookDetail="BookDetail"></rank-vue>
        <!--推荐书籍-->
        <homeadvice @bookDetail="BookDetail"/>
      </div>
    </div>
  </div>
</template>

<script>
import searchBar from "../searchBar/searchBar.vue";
import { banner, Rank } from "@/api/recommend.js";
import rankVue from "@/components/rank/suggestCate.vue";
import homeCate from "@/components/homeContent/cate_nav/category.vue";
import homeadvice from "@/components/advice/advice.vue";
import { mapState } from "vuex";
export default {
  components: {
    searchBar,
    homeCate,
    rankVue,
    homeadvice
  },
  data() {
    return {
      imgUrls: [],
      rankData: [],
      flag: true,
      discount: 0.8,
      activeName: "first"
    };
  },
  computed: {
    ...mapState("m_users", ["userinfo"]),
    user_pic() {
      return this.userinfo.username.toUpperCase().slice(0, 1);
    }
  },
  methods: {
    async getRank() {
      const {
        data: { data: res }
      } = await Rank();
      this.flag = false;
      this.rankData = res;
    },
    BookDetail(id) {
      this.$router.push({ path: "/goodsdetail", query: { bookid: id } });
    },
    //获取轮播图
    async getrecommend() {
      const {
        data: { data: res }
      } = await banner();
      this.imgUrls = res.map(item => item.banner);
    },
    //切换公告
    switch() {
      const time = setInterval(() => {
        this.activeName = this.activeName == "first" ? "second" : "first";
        console.log(2);
      }, 7000);
      //绑定事件 清楚定时器
      this.$once("hook:beforeDestroy", () => {
        clearInterval(time);
      });
    }
  },
  created() {
    this.getrecommend();
    this.getRank();
    this.switch();
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  #Carousel {
    margin: 15px 0;
    .block {
      width: 750px;
      display: inline-block;
      vertical-align: top;
      margin: 20px 15px 0 15px;
    }
    .gonggao {
      display: inline-block;
      width: 170px;
      vertical-align: bottom;
      height: 500px;
      text-align: center;
      .title{
        height: 190px;
        border-top: 1px solid #eee;
        border-bottom:  1px solid #eee;
      }
ul{
  li{
    text-align: left;
    height: 25px;
    line-height: 25px;
    color: red;
    cursor: pointer;
i{
  color: #333;
  font-size: 8px;
}
  }
}
      /deep/ .el-tabs {
        width: 170px;
      }
     /deep/ .el-tabs__header{
       margin-bottom: 5px;
     }
      /deep/.el-tabs__item {
        padding: 0;
        width: 80px;
        font-size: 14px;
      }
    }
  }
}
.icon {
  width: 1.5em;
  height: 1.5em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.el-image {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  margin: 0;
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.rank-container {
  margin-left: 5px;
  height: 120px;
  cursor: pointer;
  img {
    float: left;
    width: 100px;
    height: 120px;
  }
  .content {
    float: left;
    width: 80px;
    height: 120px;
    margin-left: 20px;
    margin-top: 5px;
    .bookName {
      font-size: 14px;
      width: 90px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 可以显示的行数，超出部分用...表示*/
      -webkit-box-orient: vertical;
    }
    .discountPrice {
      color: #ff1f1f;
      font-size: 17px;
    }
    div {
      .price {
        margin-top: 5px;
        text-decoration: line-through;
        color: rgba(151, 151, 151, 0.9);
        font-size: 13px;
      }
    }

    .sales {
      margin-top: 5px;
      color: rgba(90, 90, 90, 0.9);
    }
  }
}
#banner {
  height: 607px;
  overflow: hidden;
  display: flex;
  #advice {
    flex: 1;
    margin-left: 15px;
    p {
      border-bottom: 1px solid #ebeef5;
    }
  }
}
.info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .item {
    width: 22%;
    margin: 10px 5px 5px 5px;
    padding: 5px;
    border: 1px #e9e9e9 solid;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    &:hover {
      overflow: hidden;
      transform: scale(1.1);
      cursor: pointer;
    }
  }
  .adv-container {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    align-items: center;
    img {
      width: 140px;
      height: 140px;
    }
    .contentadv {
      height: 100px;
      text-align: center;
    }
    .bookName {
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 可以显示的行数，超出部分用...表示*/
      -webkit-box-orient: vertical;
    }
    .discountPrice {
      color: #ff1f1f;
      font-size: 17px;
    }
    #cn {
      .price {
        margin-top: 5px;
        text-decoration: line-through;
        color: rgba(151, 151, 151, 0.9);
        font-size: 13px;
      }
    }

    .sales {
      margin-top: 5px;
      color: rgba(90, 90, 90, 0.9);
    }
  }
}
/deep/.el-collapse-item__header {
  background-color: inherit;
}
</style>


