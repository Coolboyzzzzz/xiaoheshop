<template>
  <div class="login-code" style="display:flex;justify-content:space-between">
    <!--验证码组件-->
    <el-input
      prefix-icon="el-icon-message-solid"
      type="text"
      placeholder="请输入验证码"
      v-model="ruleForm.checkEmail"
      class="shipei"
    ></el-input>
    <div>
      <el-button
        :disabled="disabled"
        :loading="loading"
        type="danger"
        @click="sendEmail"
        class="guding"
      >{{content}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: "", //控制子组件显示的是注册页面还是找回密码界面
      //按钮的loading效果
      loading: false,
      //按钮的默认显示文本
      content: "发送验证码",
      time: null,
      //发送邮件按钮倒计时
      totalTime: 10,
      //设置按钮是否可以点击
      disabled: false,
      ruleForm: {
        checkEmail: ""
      }
    };
  },
  methods: {
    //发送验证码
    sendEmail() {
      this.loading = true;
      this.$refs["register"].validateField("email", async err => {
        if (err) {
          this.$notify.error({
            title: "提示",
            message: err
          });
          this.loading = false;
        } else {
          const res = await sendEmailapi({ email: this.ruleForm.email });
          this.disabled = true;
          this.loading = false;
          this.$notify.success({
            title: "提示",
            message: "邮件发送成功，请注意查收！"
          });
          this.time = setInterval(() => {
            this.totalTime--;
            this.content = `${this.totalTime}s后重新发送`;
            if (this.totalTime == 0) {
              this.disabled = false;
              this.content = "重新发送验证码";
              this.totalTime = 10;
              clearInterval(this.time);
            }
          }, 1000);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.haveCode {
  display: flex;
  .el-input {
    margin-right: 50px;
  }
}
.guding {
  width: 130px;
}
</style>
