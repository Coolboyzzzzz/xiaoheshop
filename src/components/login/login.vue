<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="SignIn"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item prop="user">
        <el-input
          type="text"
          :placeholder="holder"
          :prefix-icon="styles == '用户名'? 'el-icon-user-solid' : 'el-icon-message'"
          v-model="ruleForm.user"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input
          prefix-icon="el-icon-s-goods"
          placeholder="请输入密码"
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <div class="login-code" width="100%" style="display:flex">
          <!--验证码组件-->
          <el-input
            prefix-icon="el-icon-message-solid"
            type="text"
            placeholder="请输入验证码"
            v-model="ruleForm.code"
          ></el-input>
          <div class="code">
            <validator class="content" :identifyCode="identifyCode"></validator>
            <a @click="refreshCode">看不清？换一张</a>
          </div>
        </div>
      </el-form-item>
      <div id="forget">
        登录即同意
        <a>用户协议、隐私政策</a>
      </div>
      <el-form-item>
        <el-button size="medium" type="danger" @click="submitForm('SignIn')">登录</el-button>
      </el-form-item>
      <div id="register">
        <!-- 分别传入不同的值，动态渲染drawer组件 -->
        <a @click="register(['SignIn','注册'])">立即注册</a>
        <span style="border-left:1px solid rgb(178,178,178);width:1px;"></span>
        <a @click="register(['SignIn','忘记密码'])">忘记密码</a>
      </div>
    </el-form>
  <!-- 导入注册组件 -->
      <el-drawer
        :title="flag"
        :visible.sync="drawer"
        direction="rtl" 
        :before-close="handleClose"
        append-to-body
        size="35%"
        :wrapperClosable="false"
      >
        <el-form v-if="flag ==='注册'"
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="register"
          label-width="100px"
          class="demo-ruleForm zhuce"
        >
          <el-form-item prop="user">
            <el-input
              type="text"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user-solid"
              v-model="ruleForm.user"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              prefix-icon="el-icon-message"
              placeholder="请输入邮箱"
              type="text"
              v-model="ruleForm.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input
              prefix-icon="el-icon-phone"
              placeholder="请输入手机号"
              type="text"
              v-model="ruleForm.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              type="password"
              prefix-icon="el-icon-s-goods"
              placeholder="请输入密码"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="pass2">
            <el-input
              type="password"
              prefix-icon="el-icon-s-goods"
              placeholder="请重复输入密码"
              v-model="ruleForm.pass2"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('register')">注册</el-button>
          </el-form-item>
        </el-form>
        <el-form v-else
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="register"
          label-width="100px"
          class="demo-ruleForm zhuce"
        >
          <el-form-item prop="email">
            <el-input
              type="text"
              placeholder="请输入邮箱找回密码"
              prefix-icon="el-icon-message"
              v-model="ruleForm.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
            <el-form-item prop='code'>
            <el-input 
              type="text"
              placeholder="请输入验证码"
              prefix-icon="el-icon-message-solid"
              v-model="ruleForm.code"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type='danger'>提交</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    <div class="bottom">小何网上书城，买的安心，看的舒心！</div>
  </div>
</template>

<script>
/*重点封装组件时canvas绘制验证码的时候一直只能绘制一个另一个无法绘制
原因组件中的canvas的id为固定值，又因为同一页面中id值唯一，第二次使用组件实际上又在第一个上面绘制了一遍，所以在同一页面就只能绘制一个canvas
解决办法，在组件中动态设置id值即可
*/

import validator from "./validator_code.vue";
export default {
  props: ["styles"],
  components: {
    validator
  },
  data() {
    //验证码验证
    var checkcode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      setTimeout(() => {
        if (
          this.ruleForm.code.toLowerCase() !== this.identifyCode.toLowerCase()
        ) {
          this.refreshCode();
          callback(new Error("请填写正确验证码"));
        } else {
          callback();
        }
      }, 1000);
    };
    //确认密码验证
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        user: "",
        pass: "",
        age: "",
        code: "",
        pass2: "",
        email: "",
        phone: ""
      },
      identifyCodes: "1234567890abcdefjhijklinopqrsduvwxyz", //随机串内容
      identifyCode: "",
      rules: {
        user: [
          { required: true, message: `请输入${this.styles}`, trigger: "blur" },
          {
            pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,8}$/,
            message: "用户名不能有特殊符号"
          }
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
          {
            pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
            message: "至少6位包括1个大写字母、小写字母、数字、特殊字符"
          }
        ],
        code: [{ validator: checkcode, trigger: "blur" }],
        pass2: [
          { validator: validatePass2, trigger: "blur" },
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,3,5-9]))\d{8}$/,
            message: "请输入正确的手机号"
          }
        ]
      },
      drawer: false,//控制注册页面的开关
      flag:''//控制子组件显示的是注册页面还是找回密码界面
    };
  },
  mounted() {
    // 初始化验证码
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    // 重置验证码
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //跳转注册页面
    register(formName) {
     this.flag =  formName[1] 
      this.$refs[formName[0]].resetFields();
      this.drawer = true;
    },
    //关闭注册页面事件
    handleClose(done) {
      this.$confirm(`确定要关闭 ${this.flag} 窗口吗？`)
        .then(_ => {
          done();
          this.$refs["register"].resetFields();
        })
        .catch(_ => {});
    }
  },
  computed: {
    holder() {
      return `请输入${this.styles}`;
    }
  }
};
</script>




<style lang="less" scoped>
.el-form {
  padding: 30px 40px 0 40px;
  text-align: center;
  .el-button {
    width: 100%;
  }
  #forget {
    margin-bottom: 22px;
    color: rgb(144, 142, 143);
  }
  a {
    color: rgb(144, 142, 143);
    cursor: pointer;
    text-decoration: underline;
  }
  #register {
    display: flex;
    justify-content: space-around;
  }
}
.bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  width: 100%;
  line-height: 50px;
  text-align: center;
  border-top: 1px solid rgb(220, 220, 220);
  background-color: rgb(252, 252, 252);
  font-style: italic;
}
.code {
  transform: scale(1.3);
  margin: 0 30px;
  position: relative;
  a {
    font-size: 10px;
    position: absolute;
    bottom: -25%;
    left: 0;
  }
}
//自定义注册组件的样式
/deep/ .el-drawer__header {
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid rgb(200, 200, 200);
  margin: 0;
  padding: 20px;
}
// 注册组件自定义样式
.zhuce {
  /deep/.el-form-item__content {
    margin: 0 50px 0 50px !important;
  }
}
</style>

