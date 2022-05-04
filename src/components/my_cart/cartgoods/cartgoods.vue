<template>
  <div class="goosItem">
      <div style="border-bottom:1px solid rgb(220,220,220);padding-left:30px;">
        <img style="width:52px;height:16px;" src="https://img.alicdn.com/tfs/TB18DwDbcLJ8KJjy0FnXXcFDpXa-126-36.png">  每满100减50，可选任意图书
      </div>
    <el-row>
      <el-col :span="12">
              <div class="left">
      <input type="checkbox">
      <img :src="book_pic">
      <span>{{bookname}}</span>
    </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content"><span class='forward'>￥{{price}}</span><div class="current">￥{{discountPrice}}</div></div>
        
      </el-col>
      <el-col :span="3">
        <div class="grid-content"><el-input-number  v-model="num" @change="goodsNum" :min="1" :max="10" size="mini"  />
            </div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content"><span style="color: #f40;font-weight: 700;">￥{{total}}</span></div>
      </el-col>
      <el-col :span="3">
        <div class="grid-content"><span class='delete'>删除</span></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    props:{
        price:{
            type:Number,
            default:'85.35'
        },
        discount:{
            type:Number,
            default:0.8
        },
        book_pic:{
            type:String,
            default:'https://img.alicdn.com/tfs/TB18DwDbcLJ8KJjy0FnXXcFDpXa-126-36.png'
        },
        bookname:{
            type:String,
            default:'愿你历尽千帆归来仍是少年'
        }
    },
    data(){
        return{
            num:1,
        }
    },
    methods:{
        goodsNum(val){
            console.log(val)
        }
    },
    computed:{
        total(){
            return (this.num*this.discountPrice).toFixed(2)
        },
        discountPrice(){
            return (this.price*this.discount).toFixed(2)
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

