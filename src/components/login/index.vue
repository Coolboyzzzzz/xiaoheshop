<template>
  <div>
    <div id="loginbc">
      <div class="content">
        <div id="login-left">
          <a href="/home"></a>
        </div>
        <div id="login-right">
          <div class="transImg">
            <img @click="tranRegister" :src="flag ? img[0] : img[1]" alt>
          </div>
          <template v-if="flag">
            <el-tabs v-model="activeName">
              <!-- @tab-click="handleClick" -->

              <el-tab-pane label="账号密码登录" name="first">
                <!-- 封装登录组件 父向子传值 -->
                <transition name="el-zoom-in-center">
                  <login styles="用户名"/>
                </transition>
              </el-tab-pane>
              <el-tab-pane label="邮箱登录" name="second">
                <login styles="邮箱"/>
              </el-tab-pane>
            </el-tabs>
          </template>
          <template v-else>
            <el-page-header @back="tranRegister" content="扫码登录"></el-page-header>
            <div class="code">
              <qrcode class="qrcode" width="210" height="210"/>
              <div class="code-help"></div>
            </div>
            <div style="text-align:center">
              打开微信小程序
              <span style="color:red">小何书店</span> 扫描二维码
            </div>
            <div class="iconLogin">
              <div>
                <i class="el-icon-key"></i>
                <span>免输入</span>
              </div>
              <div>
                <i class="el-icon-s-promotion"></i>
                <span>更快速</span>
              </div>
              <div>
                <i class="el-icon-success"></i>
                <span>更安全</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import login from "./login.vue";
import qrcode from "./qrcode/index.vue";
export default {
  components: {
    login,
    qrcode
  },
  data() {
    return {
      flag: true,
      activeName: "first",
      img: []
    };
  },
  methods: {
    //转换到注册
    tranRegister() {
      this.flag = !this.flag;
    }
  },
  created() {
    this.img = [require("./img/code.png"), require("./img/pass.png")];
  }
};
</script>


<style lang="less" scoped>
#loginbc {
  margin-top: 43px;
  height: 590px;
  background-image: url("./img/get_login_ad.png");
  background-repeat: no-repeat;
  background-position: 50%;
}

.content {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  #login-right {
    position: relative;
    flex: 1;
    margin-top: 40px;
    width: 420px;
    height: 492px;
    background: #fff;
    box-shadow: 0 6px 20px 0 rgba(37, 43, 50, 0.15);
    border-radius: 16px;
    z-index: 1;
    .transImg {
      img {
        width: 79px;
        height: 73px;
      }
      position: absolute;
      top: 0;
      right: 0;
      z-index: 999;
    }
  }
  #login-left {
    width: 680px;
    height: 590px;
    margin-right: 100px;
  }
}

.el-tab-pane {
  height: 410px;
}
.code {
  margin-top: 30px;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 270px;
  &:hover .qrcode {
    left: 30%;
  }
  &:hover .code-help {
    right: -10%;
    opacity: 1;
  }
  .qrcode {
    position: absolute;
    box-shadow: 0 6px 20px 0 rgba(37, 43, 50, 0.15);
    transition: all 0.6s linear;
    top: 5%;
    left: 50%;
    transform: translate(-50%);
  }
  .code-help {
    top: 5%;
    transition: all 0.6s linear;
    width: 210px;
    height: 210px;
    position: absolute;
    opacity: 0;
    right: -50%;
    background: url("./img/phone-orange.png") no-repeat;
  }
}
.el-tabs {
  margin-top: 10px;
  /deep/.el-tabs__nav-wrap {
    height: 65px;
  }
  /deep/.el-tabs__header {
    margin: 0;
  }
}

//设置自定义二维码页面的样式
.el-page-header {
  padding: 5px;
  margin: 10px;
  font-size: 20px;
  font-weight: bold;
  /deep/ .el-page-header__content {
    font-size: 20px;
    margin-left: 60px;
  }
}
.iconLogin {
  color: rgb(155, 155, 155);
  width: 60%;
  margin: 20px auto 0px;
  text-align: center;
  display: flex;
  justify-content: space-around;
}

/deep/.el-tab-pane {
  animation: hideIndex 0.6s;
  // -moz-animation: hideIndex  0.3s; /* Firefox */
  // -webkit-animation: hideIndex  0.3s; /* Safari and Chrome */
  // -o-animation: hideIndex  0.3s; /* Opera */
}

@keyframes hideIndex {
  // 0%{ opacity: 0; transform: translate(800px, 0) }
  // 100%{opacity: 1; transform: translate(0, 0) }
  0% {
    transform: rotateY(0deg);
    opacity: 1;
  }
  25% {
    transform: rotateY(90deg);
    opacity: 0.5;
  }
   50% {
     transform: rotateY(180deg);
     opacity: 0;
   }
   75% {
     transform: rotateY(270deg);
     opacity: 0;
   }
  100% {
    opacity: 1;
    transform: rotateY(360deg);
  }
}
</style>
