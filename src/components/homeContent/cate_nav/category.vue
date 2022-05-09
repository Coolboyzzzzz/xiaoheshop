<template>
  <div class="home-category" @mouseleave="categoryId=null">
    <ul class="menu">
      <li
        :class="{active:categoryId&&categoryId===item.id}"
        v-for="item in menuList"
        :key="item.id"
        @mouseenter="categoryId=item.id"
      >
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
          <RouterLink
            v-for="sub in item.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`"
          >{{ sub.name }}</RouterLink>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4>
        {{currCategory&&currCategory.id==='brand'?'品牌':'分类'}}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <!-- 商品 -->
      <ul v-if="currCategory && currCategory.goods">
        <li v-for="item in currCategory.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt>
            <div class="info">
              <p class="name ellipsis-2">{{item.name}}</p>
              <p class="desc ellipsis">{{item.desc}}</p>
              <p class="price">
                <i>¥</i>
                {{item.price}}
              </p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌 -->
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "HomeCategory",
  data() {
    return {
      brand: {
        id: "brand",
        name: "品牌",
        children: [{ id: "brand-children", name: "品牌推荐" }],
        // 品牌列表
      },
      categoryId:''
    };
  },
  methods:{
...mapMutations('m_category',['setList'])
  },
  computed: {
    ...mapState("m_category", ["list"]),
    menuList() {
      // 得到9个分类切每个一级分类下的子分类只有两个
      const newlist = this.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2),
          goods: item.goods
        };
      });
      return newlist;
    },
    currCategory() {
      return this.menuList.find(item => item.id === this.categoryId);
    }
  },
  created(){
      this.setList()
}

}
</script>

<style scoped lang='less'>
.home-category {
  width: 250px;
  height: 500px;
  background: #eee;
  position: relative;
  display: inline-block;
  z-index: 99;
  a{
            text-decoration: none;
  }
  .menu {
      position: absolute;
      z-index: 100;
      width:calc( 100% - 4.5px ) ;
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        // background: rgb(202, 194, 194);
        background-color: #fff;
        transform: scale(1.05);
        border: 2px solid rgb(241, 31, 31);
        border-right: none;
      }
      a {
        margin-right: 4px;
        color: rgb(39, 36, 36);
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  // 弹出层样式
  .layer {
    width: 990px;
    height: 505px;
    background: rgba(255, 255, 255);
            border: 2px solid rgb(241, 31, 31);
    position: absolute;
    left: 250px;
    top: -5px;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: #eee;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
