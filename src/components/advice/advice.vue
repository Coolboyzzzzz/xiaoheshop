<template>
  <div id="advice" v-loading="false">
    <p style="font-size: 18px;line-height: 1;color: rgb(254,156,53)">
      <i class="el-icon-reading" style="font-size: 20px"></i>
      <span>优质图书推荐</span>
    </p>
    <div class="info">
      <div v-for="book in currank" :key="book.bookid" class="item">
        <div class="adv-container" @click="BookDetail(book.bookid)">
          <img :src="book.bookphoto">
          <div class="contentadv">
            <div class="bookName">{{book.bookname}}</div>
            <div class="price">
              <span class="discountPrice">
                <span style="font-size: 14px">¥</span>
                {{(book.bookprice*book.discount).toFixed(2)}}
              </span>
              <br>
              <div id="cn">
                <span class="price" v-if="book.discount<1">定价: ¥{{book.bookprice}}</span>
              </div>
            </div>
            <div class="sales">
              <span style="font-size: 15px;color: #333333">{{book.bookstock}}</span>条评论
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rankData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
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
    },
    BookDetail(id) {
      this.$emit("bookDetail", id);
    }
  },
  created() {
    this.getRank();
  }
};
</script>

<style lang="less" scoped>
#advice {
  z-index: 3;
  padding: 10px 15px 0px 15px;
  width: 250px;
  border: 1px #e9e9e9 solid;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow-y: visible;
  p {
    padding-bottom: 15px;
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
#advice {
  flex: 1;
  margin-left: 15px;
  p {
    border-bottom: 1px solid #ebeef5;
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
</style>
