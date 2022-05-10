<template>
  <el-descriptions  class="margin-top" :title="title" :column="3" border>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        收货人
      </template>
      {{item.username}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      {{item.phone}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        寄往省份
      </template>
      {{item.province}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        备注
      </template>
      <el-tag size="small">学校</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        收货地址
      </template>
      {{item.province + item.city +item.area +item.address}}
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    item: {
      type: Object,
      default: () => {
        return {
          username: "",
          phone: 12,
          province: "",
          city: "",
          area: "",
          address: ""
        };
      }
    }
  },
};
</script>

<style lang="less" scoped>
</style>
