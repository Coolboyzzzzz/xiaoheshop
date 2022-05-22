<template>
  <div class="QRCode" :style="{'width':width, 'height':height}">
    <canvas id="canvasId" :style="{'width':width, 'height':height}"></canvas>
  </div>
</template>
<script>
import QRCode from "qrcode";
import { mapMutations } from "vuex";
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
    content: {
      type: String,
      default: "279a281d-60f4-4783-ff46-b02719499f29"
    }
  },
  data() {
    return {
      canvasId: ""
    };
  },
  created() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      let width = this.width,
        height = this.height;
      QRCode.toCanvas(
        document.getElementById("canvasId"),
        this.content,
        { width, height },
        error => {}
      );
    }
  },
  watch: {
    //当客户端重新请求随机字符串的时候就进行更新二维码
    content() {
      this.init();
    }
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