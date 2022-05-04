<template>
  <div>
    <div class="navbar">
      <!-- 导航部分 -->
      <div class="container">
        <div id="content">
          <div class="nav">
            <span class="gradient-text-one" @click="gotohome">小何书店</span>
            <div v-if="!userinfo.username">
              请
              <router-link to="/login" style="padding:0 5px">登录</router-link>
              <router-link to="/login">
                <span style="padding: 0 5px;border-left:1px solid #ac9f9f;">免费注册</span>
              </router-link>
            </div>
            <div v-else>
              <el-menu background-color="#ebebeb" class="el-menu-demo" mode="horizontal">
                <el-submenu index="2">
                  <template slot="title">
                    <img class="nav-img" v-if="userinfo.user_pic" :src="userinfo.user_pic" alt>
                    <span v-else class="text-avatar">{{user_pic}}</span>
                    你好,{{userinfo.username}}
                  </template>
                  <el-menu-item>个人中心</el-menu-item>
                  <el-menu-item>我的购物车</el-menu-item>
                  <el-menu-item @click="quit">退出登录</el-menu-item>
                </el-submenu>
              </el-menu>
            </div>
          </div>
          <span id="logo">
            <router-link to="/center/myorder">我的订单</router-link>
            <router-link to="/shopcart">我的购物车</router-link>
            <a @click="ss">我的尚品汇</a>
            <a>商家后台</a>
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
            <!-- <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>-->
            <el-button
              slot="append"
              style="font-size:20px"
              icon="el-icon-search"
              @click="searchBook"
            ></el-button>
          </el-input>
          <ul class="suggest" v-if="showsuggest">
            <!-- <div v-if="!input3">
              搜索历史：
              <el-tag v-for="(item,index) in searchHistory" :key="index">{{item}}</el-tag>
            </div>-->
            <template v-if="!input3">
              <div style="color:rgb(150,150,150)">搜索历史：</div>
              <template v-if="!searchHistory[0]">
                <span class="empty">空空如也，快去搜索把~~~</span>
              </template>
              <li @click="history" v-for="(item,index) in searchHistory" :Key="index+item">
                <span>{{item.bookname}}</span>
                <span
                  @click.stop="deleteHistory(index)"
                  class="delete"
                  style="float:right;color:#fff;z-index:99999"
                >删除</span>
              </li>
            </template>
            <div class="empty" v-if="searchSuggest.length == 0 && input3">暂无搜索结果</div>
            <li v-for="(item,index) in searchSuggest" :Key="index">
              <span v-html="brightenKeyword(item.bookname, input3)">{{item.bookname}}</span>
            </li>
          </ul>
          <div class="recommend">
            <span>搜索热词：</span>
            <router-link to="/" v-for="(item,index) in recommend" :key="index">{{item}}</router-link>
          </div>
        </div>
        <div style="width:200px;color:white;position: relative;">
          <div class="searchtext" style="backgroundColor:red">
            <i style="font-size:20px;padding-right:5px" class="el-icon-shopping-cart-2"></i>
            <router-link to="/mycart">购物车</router-link>
            <span>{{num}}</span>
          </div>
          <div class="searchtext" style="backgroundColor:rgb(246,246,246);">
            <router-link to="/login" style="color: rgb(100,100,100);">我的订单</router-link>
          </div>
        </div>
      </div>
      <!-- 搜索结束 -->
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getUserInfo } from "@/api/user.js";
import { banner, suggest } from "@/api/recommend.js";
export default {
  data() {
    return {
      input3: "",
      num: 0,
      user_pic: "",
      recommend: [], //热搜词
      searchSuggest: [], //搜索建议
      showsuggest: false,
      searchHistory: JSON.parse(window.localStorage.getItem("search")) || [], //搜索历史
      time:null,//防抖延时器
    };
  },
  created() {
    this.getUser();
    this.getrecommend();
  },
  computed: {
    ...mapState("m_users", ["token", "userinfo"])
  },
  methods: {
    ...mapMutations("m_users", ["updataUser", "updateToken"]),
    //制作用户默认头像信息
    async getUser() {
      if (!this.token) return;
      const { data: res } = await getUserInfo();
      console.log(this.userinfo);
      if (res.code == 1) return this.$message("用户身份信息失效，请重新登录");
      this.updataUser(res.data);
      this.user_pic = res.data.username.toUpperCase().slice(0, 1);
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
    ss() {
      console.log("cuee", this.token);
    },
    //退出登录事件
    quit() {
      //清空token
      this.updateToken("");
      //清空用户信息
      this.updataUser({});
      this.$message("退出登录成功！");
    },
    //得到搜索建议
     getSuggest() {
      //如果输入为空则不请求,利用防抖进行搜索请求，减轻服务器压力
      if (this.input3.trim() == "") return this.searchSuggest = [];
      clearTimeout(this.time)
      this.time = setTimeout( async ()=>{
        //防止出现bug，等延迟到了 再次判断是否输入框为空
       if (this.input3.trim() == "") return (this.searchSuggest = []);
      const res = await suggest(this.input3);
      this.searchSuggest = res.data.data;
      console.log(this.searchSuggest);
      },1000)

    },
    //点击搜索框时展开搜索建议
    transshow() {
      this.showsuggest = true;
      console.log("chufa");
    },
    //失去焦点时关闭
    transNoshow() {
      setTimeout(() => {
        this.showsuggest = false;
      }, 100);
    },
    //搜索时的事件
    searchBook() {
      this.updataHistory()
    },
    //搜索时更新搜索历史
    updataHistory() {
      if (!this.input3.trim()) return;
      var item = window.localStorage.getItem("search");
      var item1 = item ? JSON.parse(item) : [];
      //如果发现重复的搜索,则把之前的删除，追加到最后
      var index = item1.findIndex(item => item == this.input3);
      if (index >= 0) {
        item1.splice(index, 1);
      }
      //利用队列先进先出
      if (item1.length >= 5) {
        item1.shift();
        item1.push({bookname:this.input3});
      } else {
        item1.push({bookname:this.input3});
      }
      this.searchHistory = item1;
      window.localStorage.setItem("search", JSON.stringify(item1));
    },
    //关键词高亮显示
    brightenKeyword(val, keyword) {
      // 方法1：筛选变色
      // val = val + '';
      // if (val.indexOf(keyword) !== -1 && keyword !== '') {
      //     return val.replace(keyword, '<font color="#409EFF">' + keyword + '</font>')
      // } else {
      //     return val
      // }
      // 方法2：用正则表达式
      const Reg = new RegExp(keyword, "i");
      if (val) {
        const res = val.replace(
          Reg,
          `<span style="color: #FF7800;">${keyword}</span>`
        );
        // console.log(res);
        return res;
      }
    },
    //删除历史指定历史记录
    deleteHistory(index) {
      var item = JSON.parse(window.localStorage.getItem("search"));
      item.splice(index, 1);
      this.searchHistory = item;
      window.localStorage.setItem("search", JSON.stringify(item));
    },
    //根据历史寻找
    history() {
      alert(22);
    }
  },
  watch: {
    //监听token变化，每次变化更新用户信息
    token(new1, old) {
      this.getUser();
    }
  }
};
</script>



<style lang="less" scoped>
* {
  z-index: 10;
}
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
}
#content {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
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
/deep/.el-submenu .el-submenu__title {
  line-height: 40px;
}
.nav-img {
  width: 40px;
  height: 40px;
}
.text-avatar {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #009688;
  border-radius: 50%;
  line-height: 30px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  position: relative;
  top: -2px;
  margin-right: 10px;
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
