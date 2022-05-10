<template>
  <el-dialog
    title="切换收货地址"
    :visible.sync="dialogSwitch"
    width="650px"
    :close-on-click-modal="false"
    :show-close="false"
    class="dialog"
  >
    <addRess
      @click.native="changeCur(index)"
      class="item"
      tabindex="1"
      v-for="(item,index) in $store.state.m_address.address"
      :key="index"
      :item="item"
    ></addRess>

    <span slot="footer" class="dialog-footer">
      <el-button @click="quit">取 消</el-button>
      <el-button type="primary" @click="handleClose">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import addRess from "./address";
export default {
  components: {
    addRess
  },
  props: ["dialogSwitch"],
  methods: {
    //退出
    quit() {
      this.$emit("closehandler");
    },
    handleClose() {
      this.$emit("closehandler");
    },
    changeCur(index) {
      this.$store.commit("m_address/updataIndex", index);
      //更新地址
      this.$store.dispatch("m_address/initaddress");
    }
  },
  created() {
    //更新地址
    this.$store.dispatch("m_address/initaddress");
  }
};
</script>

<style lang="less" scoped>
.item {
  margin-bottom: 25px;
  cursor: pointer;
}
.dialog {
  /deep/ .el-dialog__body {
    padding: 20px 30px;
    overflow-y: auto;
    height: 400px;
  }
}
</style>
