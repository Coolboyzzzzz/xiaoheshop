<template>
  <div class="goosItem">
      <div style="border-bottom:1px solid rgb(220,220,220);padding-left:30px;">
        <img style="width:52px;height:16px;" src="https://img.alicdn.com/tfs/TB18DwDbcLJ8KJjy0FnXXcFDpXa-126-36.png">  每满100减50，可选任意图书
      </div>
    <el-row>
      <el-col :span="12">
              <div class="left">
      <input type="checkbox" :checked='goods.goods_state' @click="changeState">
      <img :src="goods.goods_photo">
      <span>{{goods.goods_name}}</span>
    </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content"><span class='forward'>￥{{goods.goods_price}}</span><div class="current">￥{{discountPrice}}</div></div>
        
      </el-col>
      <el-col :span="3">
        <div class="grid-content"><el-input-number  v-model="goods.goods_count" @change="goodsNum" :min="1" :max="10" size="mini"  />
            </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content"><span style="color: #f40;font-weight: 700;">￥{{total}}</span></div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content"><span class='delete' @click="deletegoods">删除</span></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    props:{
        // price:{
        //     type:Number,
        //     default:'85.35'
        // },
        // discount:{
        //     type:Number,
        //     default:0.8
        // },
        // goods__pic:{
        //     type:String,
        //     default:'https://img.alicdn.com/tfs/TB18DwDbcLJ8KJjy0FnXXcFDpXa-126-36.png'
        // },
        // goods_name:{
        //     type:String,
        //     default:'愿你历尽千帆归来仍是少年'
        // },
        goods:{
            type:Object,
            default: () => {
                return {
                    goods_id:1,
                goods_price:85.35,
                discount:0.8,
                goods_photo:"https://img.alicdn.com/tfs/TB18DwDbcLJ8KJjy0FnXXcFDpXa-126-36.png",
                goods_name:"愿你历尽千帆归来仍是少年",
                goods_count:1,
                goods_state:true
                }

            }
        }
    },
    methods:{
        //点击加减数量时进行触发
        goodsNum(val){
          this.$emit('changNum',{goods_id:this.goods.goods_id,current:this.goods.goods_count})
        },
        //选中或者取消复选框触发
        changeState(){
this.$emit('changeState',{goods_id:this.goods.goods_id})
        },
        //点击删除按钮
        deletegoods(){
    this.$emit('dele',this.goods.goods_id)        
        }
            },
    computed:{
        total(){
            return (this.goods.goods_count*this.discountPrice).toFixed(2)
        },
        discountPrice(){
            return (this.goods.goods_price*this.goods.discount).toFixed(2)
        }
    }
};
</script>


<style lang="less" scoped>
.el-row{
    margin-top: 10px;
    width: 1200px;
}
.goosItem {
  margin-top: 25px;
 // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 18px;
  height: 180px;
  line-height: 60px;
  .left {
    input {
      margin: 10px;
    }
    img {
      width: 80px;
      height: 80px;
      vertical-align: top;
    }
  }
}

    /deep/.el-input-number--mini{
width: 100px;
    }
.el-input-number{
transform: translateX(-40%);
}
.delete{
    cursor: pointer;
    &:hover{
        color: red;
        text-decoration: underline;
    }
}
.forward{
   color: #9c9c9c;
    text-decoration: line-through;
    font-family: Verdana,Tahoma,arial;
}
.current{
    transform: translateY(-75%);
        color: #3c3c3c;
    font-weight: 700;
    font-family: Verdana,Tahoma,arial;
}
</style>

