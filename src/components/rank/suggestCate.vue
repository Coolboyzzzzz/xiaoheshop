<template>
  <div ref="rank" id="rank" :v-loading="flag">
    <p style="font-size: 18px;line-height: 1;color: rgb(248,141,179)">
      <i class="el-icon-trophy" style="font-size: 20px"></i>
      <span>{{title}}</span>
    </p>
    <el-collapse v-model="activeRankName" accordion>
      <el-collapse-item
        ref="hover"
        v-for="(book,index) in currank"
        :name="book.bookname"
        :key="book.bookid"
      >
        <template slot="title">
          <svg class="icon" aria-hidden="true">
            <use v-bind:xlink:href="index<3?`#icon-daochu1024-2${6+index}`:''"></use>
          </svg>
          第{{index+1}}名: {{book.bookname}}
        </template>
        <div class="rank-container" @click="BookDetail(book.bookid)">
          <img :src="book.bookphoto">
          <div class="content">
            <div class="bookName">{{book.bookname}}</div>
            <div class="price">
              <span class="discountPrice">
                <span style="font-size: 14px">¥</span>
                {{(book.bookprice*book.discount).toFixed(2)}}
              </span>
              <br>
              <div>
                <span class="price" v-if="book.discount<1">定价: ¥{{book.bookprice}}</span>
              </div>
            </div>
            <div class="sales">
              <span style="font-size: 15px;color: #333333">{{book.bookstock}}</span>条评论
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  props: {
    border: {
      type: String,
      default: "0 2px 12px 0 rgba(0, 0, 0, 0.1)"
    },
    title: {
      type: String,
      default: "图书畅销榜"
    },
    rankData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      activeRankName: "",
      flag: false,
      rank: []
    };
  },
  computed: {
    currank() {
      return this.rankData.length ? this.rankData : this.rank;
    }
  },
  methods: {
    async getRank() {
      const {
        data: { res: res }
      } = await this.$axios.get("../../../static/rank.json");
      this.flag = false;
      this.rank = res;
      this.activeRankName = res[0].name;
    },
    BookDetail(id) {
      this.$emit("bookDetail", id);
    }
  },
  created() {
    this.getRank();
  },
  mounted() {
    this.$refs["rank"].style.boxShadow = this.border;
    setTimeout(() => {
      var dom = document.querySelectorAll(".el-collapse-item__header");
      for (let i = 0; i < dom.length; i++) {
        dom[i].addEventListener("mouseover", () => {
          dom[i].click();
        });
      }
    }, 2000);
  }
};
</script>

<style lang="less" scoped>
#rank {
  z-index: 3;
  padding: 10px 15px 0px 15px;
  width: 250px;
  border: 1px #e9e9e9 solid;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow-y: visible;
  .icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  p {
    padding-bottom: 15px;
    margin-bottom: 5px;
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
}
/deep/.el-collapse-item__header {
  background-color: inherit;
}
</style>
