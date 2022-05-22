<template>
  <elDialog
    :visible.sync="visibleDialog"
    title="查看物流"
    width="680px"
    :before-close="close"
    :close-on-click-modal="false"
    @open='getexpress'
  >
    <div class="order-logistics-goods" v-if="JSON.stringify(order) != '{}'">
      <a class="image" href="javascript:;">
        <img  :src="order.bookDetail[0].bookphoto" alt>
        <p>{{order.totalNum}}件商品</p>
      </a>
      <div class="info">
        <p>
          <span>配送企业：</span>
          {{`中通快递`}}
        </p>
        <p>
          <span>快递单号：</span>
          {{75879498774785}}
        </p>
        <p>
          <span>联系电话：</span>
          {{order.addressData.phone }}
        </p>
      </div>
    </div>
    <div class="order-logistics-list">
      <div class="item" v-for="(item,i) in logistics.list" :key="item.id">
        <div class="line" :class="{ active: i == 0 }"></div>
        <div class="logistics">
          <p>{{item.context}}</p>
          <p>{{item.time}}</p>
        </div>
      </div>
    </div>
  </elDialog>
</template>
<script>
  import { getExpress } from "@/api/pay.js";
export default {
  props: {
    visibleDialog: {
      type: Boolean,
      default: false
    },
    order: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      logistics: {
        list: [
        {
            "time": "2022-05-19 10:25:37",
            "ftime": "2022-05-19 10:25:37",
            "context": "快件已被【菜鸟的师范大学国培大厦一楼东南角菜鸟驿站】代收，如有问题请电联（9519666），感谢使用中通快递，期待再次为您服务！"
        },
        {
            "time": "2022-05-19 08:00:35",
            "ftime": "2022-05-19 08:00:35",
            "context": "【石家庄师大新区】 的李艳涛（17703211408） 正在第1次派件, 请保持电话畅通,并耐心等待（95720为中通快递员外呼专属号码，请放心接听）"
        },
        {
            "time": "2022-05-19 08:00:30",
            "ftime": "2022-05-19 08:00:30",
            "context": "快件已经到达 【石家庄师大新区】"
        },
        {
            "time": "2022-05-19 05:27:17",
            "ftime": "2022-05-19 05:27:17",
            "context": "快件离开 【石家庄】 已发往 【石家庄师大新区】"
        },
        {
            "time": "2022-05-19 04:08:58",
            "ftime": "2022-05-19 04:08:58",
            "context": "快件已经到达 【石家庄】"
        },
        {
            "time": "2022-05-18 16:27:24",
            "ftime": "2022-05-18 16:27:24",
            "context": "快件离开 【京南转运中心】 已发往 【石家庄】"
        },
        {
            "time": "2022-05-18 14:17:27",
            "ftime": "2022-05-18 14:17:27",
            "context": "快件已经到达 【京南转运中心】"
        },
        {
            "time": "2022-05-17 08:32:28",
            "ftime": "2022-05-17 08:32:28",
            "context": "快件离开 【广州中心】 已发往 【京南转运中心】"
        },
        {
            "time": "2022-05-17 08:30:14",
            "ftime": "2022-05-17 08:30:14",
            "context": "快件已经到达 【广州中心】"
        },
        {
            "time": "2022-05-17 04:55:00",
            "ftime": "2022-05-17 04:55:00",
            "context": "快件离开 【广州永福】 已发往 【石家庄】"
        },
        {
            "time": "2022-05-17 04:17:48",
            "ftime": "2022-05-17 04:17:48",
            "context": "【广州永福】（020-22500630） 的 林志华直客（18925066308） 已揽收"
        }
    ]
      }
    };
  },
  methods: {
    close() {
      this.$emit("close");
      
    },
    //获取快递
  async  getexpress(){
    const customer = '1791F02982416498DF23813528422A81'
    const key = 'CpIyhxAX9326'
    const param = {"com":"yuantong","num":"YT6411541621201","phone":"","from":"","to":"","resultv2":0,"show":0,"order":"desc"}
    const sign = md5(`${param}${key}${customer}`).toUpperCase()
    console.log({customer,param,sign})
 const {data:res} = await  getExpress({customer,param,sign})
 console.log(res)

 
    }
  },
  mounted() {
  //引入外部md5的js文件，写法如下
  const md5 = document.createElement('script');
  md5.type = 'text/javascript';
  md5.src = 'https://cdn.bootcss.com/blueimp-md5/2.10.0/js/md5.min.js';
  document.body.appendChild(md5);
}
};
</script>
<style scoped lang="less">
.order-logistics-goods {
  display: flex;
  background-color: #f5f5f5;
  height: 130px;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 20px;
  font-size: 14px;
  .image {
    img{
         width: 92px;
    height: 92px; 
    }
    width: 92px;
    height: 92px;
    border: 1px solid #e4e4e4;
    position: relative;
    p {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 20px;
      line-height: 20px;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.5);
      text-align: center;
    }
  }
  .info {
    flex: 1;
    padding-left: 20px;
    line-height: 30px;
    span {
      color: #999;
    }
  }
}
.order-logistics-list {
  position: relative;
  padding-top: 10px;
  font-size: 14px;
  .item {
    display: flex;
    &:last-child {
      .line {
        border-color: transparent;
        &::before {
          top: 0;
        }
      }
    }
    .line {
      width: 27px;
      border-right: 2px solid #f5f5f5;
      margin-right: 25px;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(7px, 0);
        border-radius: 50%;
      }
      &::before {
        width: 12px;
        height: 12px;
        background: #e4e4e4;
      }
      // 激活
      &.active {
        &::before {
          background: rgb(102, 175, 52);
          z-index: 1;
        }
        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(11px, -4px);
          border-radius: 50%;
          width: 20px;
          height: 20px;
          background: #e3f9f4;
        }
      }
    }
    .logistics {
      flex: 1;
      padding-bottom: 35px;
      position: relative;
      top: -3px;
      p {
        &:first-child {
          color: #666;
        }
        &:last-child {
          color: #999;
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
