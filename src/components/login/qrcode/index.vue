<template>
  <div class="QRCode" :style="{'width':width, 'height':height}">
    <canvas id="canvasId" :style="{'width':width, 'height':height}"></canvas>
  </div>
</template>
<script>
import QRCode from "qrcode";
import {mapMutations} from 'vuex'
export default {
  name: "QRCode",
  props: {
    width: {
      type: String,
      default: "100"
    },
    height: {
      type: String,
      default: "100"
    },
  },
  data() {
    return {
      canvasId: "",
      timer: null,
      content:'',
      timerCode:null
    };
  },
  computed: {},
  created() {
    this.$nextTick(() => {
      this.getUUID();
      this.init();
    });
    this.timer = setInterval(() => {
      this.status();
    }, 5000)
    this.timerCode = setInterval(()=>{
     this.getUUID();
    },10000)
  },
  mounted: function() {},
  methods: {
    ...mapMutations('m_users',['updateToken']),
    init() {
      let width = this.width,
        height = this.height;
        
      QRCode.toCanvas(
        document.getElementById("canvasId"),
        this.content,
        { width, height},
        error => {}
      );
    },
    // getUUID() {
    //   let d = new Date().getTime();
    //   let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    //     /[xy]/g,
    //     function(c) {
    //       let r = (d + Math.random() * 16) % 16 | 0;
    //       d = Math.floor(d / 16);
    //       return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
    //     }
    //   );
    //   console.log(uuid)
    //   return uuid;
    // }
    async getUUID() {
      const res = await this.$axios.get("http://43.138.44.90:9001/code");
      console.log(res);
      this.content = res.data;
    },
    async status() {
      const { data: res } = await this.$axios.get(
        `http://43.138.44.90:9001/status?qrcode=${this.content}`
      );
      if (res.rawData) {
        console.log(res);
        res.rawData = JSON.parse(res.rawData);
        this.updateToken(res)
      //  window.sessionStorage('token',JSON.stringify(res))
        this.$message(`欢迎回家${res.rawData.nickName}`);
        clearInterval(this.timer);
        this.$router.push("/home");
      }

      console.log(res);
    }
  },
  watch: {
    //当客户端重新请求随机字符串的时候就进行更新二维码
    content() {
      this.init();
    }
  },
  //组件被销毁时就停止发送询问轮回
  destroyed(){
    clearInterval(this.timer)
    clearInterval(this.timerCode)
  }
};
</script>
<style lang="less" scoped>
.QRCode {
  display: inline-block;
  position: relative;
  overflow: hidden;
  .QQMode {
    position: absolute;
    left: 0;
    bottom: 100%;
    right: 0;
    height: 0;
    background-color: rgba(0, 0, 0, 0.45);
    transition: all 200ms ease-in-out;
    cursor: pointer;
    color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 20px;
    font-weight: bolder;
    box-sizing: border-box;
    padding: 10px;
  }
}
.QRCode:hover .QQMode {
  bottom: 0;
  height: 100%;
}
</style>