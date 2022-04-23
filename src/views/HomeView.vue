<template>
  <div class="container">
    <img src="../assets/img/banner1.jpg" alt="">
    <div class="container">
      <!-- 轮播图 -->
      <div id="Carousel">
        <div class="block">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(url,index) in imgUrls" :key="index">
              <el-image :src="url" fit="fill"></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <!--排行榜-->
      <div id="banner">
        <div id="rank" :v-loading="flag">
          <p style="font-size: 18px;line-height: 1;color: rgb(248,141,179)">
            <i class="el-icon-trophy" style="font-size: 20px"></i>
            <span>图书畅销榜</span>
          </p>
          <el-collapse v-model="activeRankName" accordion >
            <el-collapse-item ref='hover' v-for="(book,index) in rank" :name="book.name" :key="book.id">
              <template slot="title">
                <svg class="icon" aria-hidden="true">
  <use v-bind:xlink:href="index<3?`#icon-daochu1024-2${6+index}`:''"></use>
</svg>
                第{{index+1}}名: {{book.name}}
              </template>
              <div class="rank-container" @click="BookDetail(book.id)">
                <img :src="book.img">
                <div class="content">
                  <div class="bookName">{{book.name}}</div>
                  <div class="price">
                    <span class="discountPrice">
                      <span style="font-size: 14px">¥</span>
                      {{(book.price*book.discount).toFixed(2)}}
                    </span>
                    <br>
                    <div><span class="price" v-if="book.discount<1">定价: ¥{{book.price}}</span></div>
                  </div>
                  <div class="sales">
                    <span style="font-size: 15px;color: #333333">{{book.sum}}</span>条评论
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <!--推荐书籍-->
        <div id="advice" v-loading="false">
          <p style="font-size: 18px;line-height: 1;color: rgb(254,156,53)">
            <i class="el-icon-reading" style="font-size: 20px"></i>
            <span>优质图书推荐</span>
          </p>
          <div class="info">
            <div v-for="book in rank" :key="book.id" class="item">
              <div class="adv-container" @click="BookDetail(book.id)">
                <img :src="book.img">
                <div class="contentadv">
                  <div class="bookName">{{book.name}}</div>
                  <div class="price">
                    <span class="discountPrice">
                      <span style="font-size: 14px">¥</span>
                      {{(book.price*book.discount).toFixed(2)}}
                    </span>
                    <br>
                    <div id='cn'>
                      <span class="price" v-if="book.discount<1">定价: ¥{{book.price}}</span>
                      </div>
                  </div>
                  <div class="sales">
                    <span style="font-size: 15px;color: #333333">{{book.sum}}</span>条评论
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrls: [],
      rank: [],
      activeRankName: [],
      flag: true,
      discount: 0.8
    };
  },
  methods: {
    async getimgUrl() {
      const {
        data: { res: res }
      } = await this.$axios.get("../../static/carousel.json");
      console.log(res);
      this.imgUrls = res;
    },
    async getRank() {
      const {
        data: { res: res }
      } = await this.$axios.get("../../static/rank.json");
      console.log(res);
      this.flag = false;
      this.rank = res;
      this.activeRankName = res[0].name
    },
    BookDetail(id) {
      console.log(id);
    }
  },
  created() {
    this.getimgUrl();
    this.getRank();
  },
  mounted(){

  }
};
</script>

<style lang="less" scoped>
.container{
  width: 1200px;
  margin: 0 auto;
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
  height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
#rank,
#advice {
  padding: 10px 15px 0px 15px;
  width: 250px;
  border: 1px #e9e9e9 solid;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow-y: visible;
  p{
    padding-bottom:15px ;
    margin-bottom: 5px;
  }
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
    div{
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
  display: flex;
  #advice {
    flex: 1;
    margin-left: 15px;
    p{
         border-bottom: 1px solid #EBEEF5;
    }
  }
}
.info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .item {
    width: 22%;
    margin:10px 5px 5px 5px;
    padding: 5px;
        border: 1px #e9e9e9 solid;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  &:hover{
      overflow: hidden;
      transform: scale(1.1);
      cursor:pointer;
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
    .contentadv{
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
    #cn{
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
</style>


