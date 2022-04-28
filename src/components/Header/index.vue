<template>
  <div>
    <div class="navbar">
      <!-- 导航部分 -->
      <div class="container">
        <div id="content">
          <div class="nav">
            <template v-if="token.rawData">
              <span class="avatar">
                <img :src="token.rawData.avatarUrl" alt>
              </span>
              <el-popover
                placement="bottom"
                title="标题"
                width="200"
                trigger="hover"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
              >
                <span style="margin: 0 10px" slot="reference">你好,{{token.rawData.nickName}}</span>
              </el-popover>
            </template>
            欢迎光临
            <span class="gradient-text-one" @click="gotohome">小何书店</span>
            <template v-if="!token.rawData">
              请
              <router-link to="/login" style="padding:0 5px">登录</router-link>
              <router-link to="/login">
                <span style="padding: 0 5px;border-left:1px solid #ac9f9f;">免费注册</span>
              </router-link>
            </template>
            <div></div>
          </div>
          <span id="logo">
            <router-link to="/login">个人中心</router-link>
            <router-link to="/center/myorder">我的订单</router-link>
            <router-link to="/shopcart">我的购物车</router-link>
            <a @click="ss">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </span>
        </div>
      </div>
    </div>
    <!-- 导航部分结束 -->
    <!--搜索区域-->
    <div class="container">
      <div style="margin-top: 15px;" class="search">
        <img src="./img/logo.png" style="height:58px" alt="logo">
        <div>
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
            <el-button slot="append" style="font-size:20px" icon="el-icon-search"></el-button>
          </el-input>
          <div class="recommend">
            <span>搜索热词：</span>
            <router-link to="/" v-for="(item,index) in recommend" :key="index">{{item}}</router-link>
          </div>
        </div>
        <div style="width:200px;color:white;position: relative;">
          <div class="searchtext" style="backgroundColor:red">
            <i style="font-size:20px;padding-right:5px" class="el-icon-shopping-cart-2"></i>
            <router-link to="/login">购物车</router-link>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      select: "",
      num: 0,
      recommend: []
    };
  },
  created() {
    this.getrecommend();
  },
  computed: {
    ...mapState("m_users", ["token"])
  },
  methods: {
    //获取热搜词
    async getrecommend() {
      const {
        data: { res: res }
      } = await this.$axios.get("../../static/recommend.json");
      console.log(res);
      this.recommend = res;
    },
    //返回主页
    gotohome() {
      this.$router.push("/home");
    },
    ss() {
      console.log("cuee", this.token);
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
  .avatar {
    display: inline-block;
    margin-top: 2px;
    width: 36px;
    height: 36px;
    border-radius: 18px;
    background-color: #fff;
    //   position: relative;
    overflow: hidden;
    img {
      width: 36px;
      height: 36px;
      //     position: absolute;
      //     left: 50%;
      //    transform:translate(-50%,0)
    }
  }
}
.navbar {
  background-color: rgb(235, 235, 235);
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
.searchtext {
  height: 44.8px;
  line-height: 44.8px;
  float: left;
  width: 100px;
  text-align: center;
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
.recommend {
  color: rgb(150, 150, 150);
  font: 12px "Hiragino Sans GB", "simsun", "Arial";
  display: flex;
  justify-content: space-around;
  a {
    text-decoration: none;
    color: rgb(150, 150, 150);
  }
  a:hover {
    text-decoration: underline;
    color: red;
  }
}
</style>
