<template>
  <el-dialog title="取消订单" :close-on-click-modal='false' :show-close='false' :visible.sync="dialogVisible" width="620px">
    <div class="cancel">
      <img src="./img/sad.gif" alt>
      <!-- 取消原因列表 -->
      <div class="cancel-info">
        <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
        <p class="tip">请选择取消订单的原因（必选）：</p>
        <div class="btn">
          <a
            @click="curText = item"
            v-for="item in cancelReason"
            :key="item"
            href="javascript:;"
            :class="{ active: curText === item }"
          >{{ item }}</a>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="returnOrder">再想想</el-button>
      <el-button type="primary" @click="cancel">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    default: false
  },
  data() {
    return {
      cancelReason: [
        "配送信息有误",
        "商品买错了",
        "重复下单/误下单",
        "忘记使用优惠券、何币等",
        "其他渠道价格更低",
        "不想买了"
      ],
      curText:''
    };
  },
  methods:{
      //确定取消
      cancel(){
          if(!this.curText) return this.$message({type:"warning",message:'亲，请选择取消原因'})
      this.$emit('cancel')
  } ,
   //点击返回
   returnOrder(){
       this.$emit('cancelTrue')
   }
  }

};
</script>

<style lang="less" scoped>
/deep/.el-dialog{
    margin-top:50px!important;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n){
        margin-right: 0;
      }
      &:hover,&.active {
        background-color: #e3f9f4;
        border-color: rgb(12, 185, 99);
      }
    }
  }
}
  img{
      height: 160px;
    width: 502px;
  }
</style>
