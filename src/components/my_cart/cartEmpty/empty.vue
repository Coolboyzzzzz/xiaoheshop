<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="headerCart">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/home' }">我的书店</el-breadcrumb-item>
          <el-breadcrumb-item>我的购物车</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
          <span>购物车帮您一次性完成批量购买与付款，下单更便捷，付款更简单！</span>
        </div>
      </div>
      <div class="empty">
        <h2>您的购物车还是空的，赶紧行动吧！您可以：</h2>
        <h4>
          看看
          <router-link to="/mycart">我的收藏夹</router-link>
        </h4>
        <h4>
          看看
          <router-link to="/mycart">已买书籍</router-link>
        </h4>
      </div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.empty {
  padding: 88px 0 100px 156px;
  background: url(//gtd.alicdn.com/tps/i3/T1TvXUXnNjXXXXXXXX-100-100.png)
    no-repeat 40px 86px;
  position: relative;
  h4 {
    margin-top: 10px;
    a {
      margin-left: 5px;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
        color: red;
      }
    }
  }
}
.headerCart {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-card {
  margin-top: 40px;
  min-height: 400px;
}
</style>
