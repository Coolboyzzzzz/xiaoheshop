<template>
  <div>
    <div class="navbar">
      <!-- 导航部分 -->
      <div class="container">
        <div id="content">
          <div class="nav">
            <span class="gradient-text-one" @click="gotohome">小何书店</span>
            <div v-if="!userinfo.username && refresh">
              请
              <router-link to="/login" style="padding:0 5px">登录</router-link>
              <router-link to="/login">
                <span style="padding: 0 5px;border-left:1px solid #ac9f9f;">免费注册</span>
              </router-link>
            </div>
            <div v-else>
              <div class="el-submenu">
                &nbsp;&nbsp;&nbsp;&nbsp; 欢迎&nbsp;&nbsp;
                <span>{{userinfo.username}}</span>
                <i style="font-size:8px;" class="el-icon-arrow-down"></i>
                <div class="active">
                  <img class="nav-img" v-if="userinfo.user_pic" :src="userinfo.user_pic" alt>
                  <span v-else class="text-avatar">{{user_pic}}</span>
                  <div style="position:absolute;right:5px;top:2px;">
                    账号管理
                    <span style=" border-left: 1px solid #ccc;margin:0 5px;"></span>
                    <span class="quit" @click="quit">退出</span>
                  </div>
                  <div class="info">
                    <div>{{'hi,你好'+userinfo.username}}</div>
                    <div>普通会员</div>
                  </div>
                  <ul class="bangding">
                    <li v-if="userinfo.email">邮箱：已绑定</li>
                    <li v-else>
                      邮箱：
                      <span>点击绑定</span>
                    </li>
                    <li v-if="userinfo.vxcode">微信：已绑定</li>
                    <li v-else>
                      微信：
                      <span @mouseleave="showCode=false" @mouseover="showCode=true">现在绑定</span>
                      <div v-if="showCode" class="openCode">
                        <span>打开微信扫一扫</span>
                        <qrcode :content="content" class="code" width="150" height="150"/>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <span id="logo">
            <a style="border:none;">我的订单</a>
            <a>我的购物车</a>
            <a>会员中心</a>
            <a>帮助中心</a>
            <a>关于我们</a>
            <a @click="transd">商家后台</a>
          </span>
        </div>
      </div>
    </div>
    <!-- 导航部分结束 -->
    <!--搜索区域-->
    <div class="container">
      <div style="margin-top: 15px;" class="search">
        <img src="./img/logo.png" style="height:58px" alt="logo">
        <div class="searchBox">
          <el-input
            @input="getSuggest"
            placeholder="请输入内容"
            v-model="input3"
            class="input-with-select"
            @focus="transshow"
            @blur="transNoshow"
          >
            <el-button
              slot="append"
              style="font-size:20px"
              icon="el-icon-search"
              @click="searchBook(input3)"
            ></el-button>
          </el-input>
          <!-- 默认展开搜索历史 -->
          <ul class="suggest" v-if="showsuggest">
            <template v-if="!input3">
              <div style="color:rgb(150,150,150)">搜索历史：</div>
              <template v-if="!searchHistory[0]">
                <span class="empty">空空如也，快去搜索把~~~</span>
              </template>
              <li @click="searchBook(item)" v-for="(item,index) in trueHistory" :Key="index+item">
                <span>{{item}}</span>
                <span
                  @click.stop="deleteHistory(index)"
                  class="delete"
                  style="float:right;color:#fff;z-index:99999"
                >删除</span>
              </li>
            </template>
            <!-- 如果用户输入搜索词并且无返回数据 -->
            <div class="empty" v-if="searchResult && input3">暂无搜索结果</div>
            <!-- 如果用户输入搜索词并且有返回数据 -->
            <li v-for="(item,index) in searchSuggest" :Key="index" @click="gotoGoods(item)">
              <span v-html="brightenKeyword(item.bookname, input3)">{{item.bookname}}</span>
            </li>
          </ul>
          <div class="recommend">
            <span>搜索热词：</span>
            <router-link to="/" v-for="(item,index) in recommend" :key="index">{{item}}</router-link>
          </div>
        </div>
        <div style="width:200px;color:white;position: relative;">
          <div class="searchtext" style="backgroundColor:red" @click="gotoCart">
            <i style="font-size:20px;padding-right:5px" class="el-icon-shopping-cart-2"></i>
            购物车
            <span>{{total}}</span>
          </div>
          <div class="searchtext" style="backgroundColor:rgb(246,246,246);">
            <router-link to="/myorder" style="color: rgb(100,100,100);">我的订单</router-link>
          </div>
        </div>
      </div>
      <!-- 搜索结束 -->
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from "vuex";
import { getUserInfo, bindvxcode } from "@/api/user.js";
import { banner, suggest, getBookdetail } from "@/api/recommend.js";
import qrcode from "@/components/login/qrcode/index.vue";
import { qrCode, changeState } from "@/api/login";
export default {
  components: {
    qrcode
  },
  data() {
    return {
      input3: "",
      num: 0,
      user_pic: "",
      recommend: [], //热搜词
      searchSuggest: [], //搜索建议
      showsuggest: false,
      searchHistory: JSON.parse(window.localStorage.getItem("search")) || [], //搜索历史
      time: null, //防抖延时器
      searchResult: false,
      showCode: false, //控制绑定二维码的开关
      time1: null,
      time2: null,
      content: null,
      refresh: true
    };
  },
  created() {
    this.getUser();
    this.getrecommend();
    this.getcart();
  },
  computed: {
    ...mapState("m_users", ["token", "userinfo"]),
    ...mapGetters("m_cart", ["total"]),

    trueHistory() {
      return this.searchHistory.reverse();
    }
  },
  methods: {
    ...mapMutations("m_users", ["updataUser", "updateToken", "initCart"]),
    ...mapActions("m_cart", ["getcart"]),
    //实现局部刷新
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    //制作用户默认头像信息
    async getUser() {
      if (!this.token) return;
      const { data: res } = await getUserInfo();
      console.log(res);
      if (res.code == 1) {
        //清空token
        this.updateToken("");
        //清空用户信息
        this.updataUser([]);
        //清空购物车
        this.$store.commit("m_cart/initCart", []);
        this.$message("用户身份信息失效，请重新登录");
        return;
      }
      this.updataUser(res.data);
      this.user_pic = res.data.username.toUpperCase().slice(0, 1);
    },
    transd() {
      this.showCode = !this.showCode;
    },
    //返回主页
    gotohome() {
      this.$router.push("/home");
    },
    //获取热搜词
    async getrecommend() {
      const {
        data: { data: res }
      } = await banner();
      this.recommend = res.map(item => item.suggest);
    },
    //前往购物车页面
    gotoCart() {
      this.$router.push("/mycart");
    },
    //退出登录事件
    quit() {
      //清空token
      this.updateToken("");
      //清空用户信息
      this.updataUser([]);
      //清空购物车
      this.$store.commit("m_cart/initCart", []);
      this.$message("退出登录成功！");
    },
    //得到搜索建议
    getSuggest() {
      //每次搜索都让他不显示
      this.searchResult = false;
      //如果输入为空则不请求,利用防抖进行搜索请求，减轻服务器压力
      if (this.input3.trim() == "") return (this.searchSuggest = []);
      clearTimeout(this.time);
      this.time = setTimeout(async () => {
        //防止出现bug，等延迟到了 再次判断是否输入框为空
        if (this.input3.trim() == "") return (this.searchSuggest = []);
        const res = await suggest(this.input3);
        this.searchSuggest = res.data.data;
        //如果真没有那么就改变状态让显示
        if (this.searchSuggest.length == 0) this.searchResult = true;
      }, 1000);
    },
    //点击搜索框时展开搜索建议
    transshow() {
      this.showsuggest = true;
    },
    //失去焦点时关闭
    transNoshow() {
      setTimeout(() => {
        this.showsuggest = false;
      }, 200);
    },
    //搜索时更新搜索历史
    updataHistory(text) {
      if (!this.input3.trim()) return;
      var item = window.localStorage.getItem("search");
      var item1 = item ? JSON.parse(item) : [];
      //如果发现重复的搜索,则把之前的删除，追加到最后
      var index = item1.findIndex(item => item == text);
      if (index >= 0) {
        item1.splice(index, 1);
      }
      //利用队列先进先出
      if (item1.length >= 5) {
        item1.shift();
        item1.push(text);
      } else {
        item1.push(text);
      }
      this.searchHistory = item1;
      window.localStorage.setItem("search", JSON.stringify(item1));
    },
    //关键词高亮显示
    brightenKeyword(val, keyword) {
      // 方法2：用正则表达式
      const Reg = new RegExp(keyword, "i");
      if (val) {
        const res = val.replace(
          Reg,
          `<span style="color: #FF7800;">${keyword}</span>`
        );
        return res;
      }
    },
    //删除历史指定历史记录
    deleteHistory(index) {
      var item = JSON.parse(window.localStorage.getItem("search"));
      item.splice(index, 1);
      this.searchHistory = item;
      window.localStorage.setItem("search", JSON.stringify(item));
    }, //搜索时的事件
    async searchBook(name) {
      if (!name.trim()) return;
      this.updataHistory(name);
      const { data: res } = await suggest(name);
      console.log(res);
      if (res.code !== 200) this.$router.push({ path: "/empty" });
      this.$router.push({
        path: "/goodsdetail",
        query: { bookid: res.data[0].bookid }
      });
    },
    //点击联想词
    gotoGoods(item) {
      this.updataHistory(item.bookname);
      this.$router.push({
        path: "/goodsdetail",
        query: { bookid: item.bookid }
      });
    },
    //轮询此二维码的状态
    async changeCode(content) {
      const { data: res } = await changeState(this.content);
      if (res.code == 200) {
        clearInterval(this.timer1);
        clearInterval(this.timer2);
        console.log(res);
        const { data: res1 } = await bindvxcode({
          vxcode: res.message.vxcode,
          user_pic: res.message.user_pic
        });
        if (res1.code != 200)
          return this.$message({ type: "error", message: res1.message });
        this.$message({ type: "success", message: res1.message });
        this.reload();
      }
    },
    //获得一个随机字符串
    async getUUID() {
      const res = await qrCode();
      this.content = res.data;
    }
  },
  watch: {
    //监听token变化，每次变化更新用户信息
    token(new1, old) {
      this.getUser();
      this.getcart();
    },
    showCode(new1, old) {
      if (new1) {
        this.getUUID();
        this.time1 = setInterval(() => {
          this.getUUID();
        }, 30000);
        this.timer2 = setInterval(() => {
          this.changeCode();
        }, 1000);
        this.$once("hook:beforeDestory", () => {
          clearInterval(this.time1);
          clearInterval(this.timer2);
        });
      } else {
        clearInterval(this.time1);
        clearInterval(this.timer2);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.gradient-text-one {
  font-size: 20px;
  letter-spacing: 5px;
  background-image: -webkit-linear-gradient(left, blue, red, yellow);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
  margin: 0 5px;
}
.container {
  width: 1200px;
  margin: 0 auto;
}
.nav {
  display: flex;
  align-content: center;
}
.navbar {
  background-color: rgb(235, 235, 235);
  * {
    z-index: 10;
  }
}
#content {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}
#logo {
  a {
    margin-left: 5px;
    padding: 0 5px;
    border-left: 1px solid #ac9f9f;
    font: 12px "Hiragino Sans GB", "simsun", "Arial";
    color: #646464;
    cursor: pointer;
  }
}
.el-select .el-input,
.el-select {
  width: 130px;
}
.search {
  display: flex;
  justify-content: space-between;
}
.el-input {
  border: 3px solid rgb(0, 194, 154);
  width: 600px;
}
//购物车样式
.searchtext {
  height: 44.8px;
  line-height: 44.8px;
  float: left;
  width: 100px;
  text-align: center;
  cursor: pointer;
  span {
    position: absolute;
    top: -25%;
    left: 15%;
  }
  a {
    text-decoration: none;
    color: rgb(245, 245, 245);
  }
}
//热搜词样式
.recommend {
  width: 532px;
  color: rgb(150, 150, 150);
  font: 12px "Hiragino Sans GB", "simsun", "Arial";
  display: flex;
  justify-content: space-around;
  a,
  span {
    z-index: auto;
  }
  a {
    text-decoration: none;
    color: rgb(150, 150, 150);
  }
  a:hover {
    text-decoration: underline;
    color: red;
  }
}
//头像样式
.el-submenu {
  height: 40px;
  line-height: 40px;
  background-color: #ebebeb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  .active {
    display: none;
    position: absolute;
    top: 40px;
    width: 250px;
    left: 0;
    height: 150px;
    background-color: #fff;
    z-index: 99999;
    padding: 15px 15px 0 15px;
    font-size: 12px;
    color: #333;
    border: 1px solid #eee;
    .text-avatar {
      border: 2px solid white;
      box-shadow: 0 1px 5px black;
      display: inline-block;
      width: 60px;
      height: 60px;
      background-color: #009688;
      border-radius: 50%;
      line-height: 50px;
      text-align: center;
      font-size: 30px;
      color: #fff;
      position: relative;
      top: -12px;
      margin: 36px 31px -9px 20px;
    }
    .quit {
      &:hover {
        color: red;
      }
    }
    .info {
      display: inline-block;
      font-size: 15px;
      margin-top: 10px;
      div {
        height: 30px;
        line-height: 40px;
         width: 107px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
      }
    }
    .openCode {
      width: 200px;
      height: 200px;
      border: 1px solid #eee;
      background-color: rgb(253, 253, 253);
      position: absolute;
      width: 155px;
      height: 148px;
      text-align: center;
      z-index: 999;
      span {
        font-size: 14px;
        color: red;
      }
      .code {
        box-shadow: 0 6px 20px 0 rgba(37, 43, 50, 0.15);
      }
    }
    .bangding {
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        &:hover {
          color: red;
        }
      }
    }
  }
  &:hover {
    background-color: #fff;
    color: red;
  }
  &:hover .active {
    display: block;
  }
}
.nav-img {
  border-radius: 50%;
  border: 2px solid white;
  margin: 27px 31px -9px 20px;
  box-shadow: 0 1px 5px black;
  width: 60px;
  height: 60px;
}

.searchBox {
  position: relative;
  .suggest {
    width: 535px;
    border: 1px solid #c8c8c8;
    border-top: none;
    z-index: 99;
    position: absolute;
    top: 28px;
    padding-top: 6px;
    background-color: #f9f9f9;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    border: 3px solid #00c29a;
    border-top: none;
    li {
      font-size: 13px;
      color: rgb(100, 100, 100);
      display: block;
      padding-left: 10px;
      height: 30px;
      line-height: 30px;
      z-index: 999;
      *vertical-align: top;
      cursor: pointer;
      overflow: hidden;
      &:hover {
        color: red;
        background-color: rgb(230, 230, 230);

        &:hover .delete {
          color: red !important;
        }
      }
    }
  }
}

/deep/.el-input-group__append {
  background-color: #00c29a;
  border: none;
  color: #fff;
}
/deep/.el-input__inner {
  border-right: 3px solid #00c29a;
}
.empty {
  margin-top: 100px;
  font-size: 15px;
  display: inline-block;
  position: relative;
  top: -50px;
  left: 150px;
  color: red;
  text-align: center;
}
</style>
