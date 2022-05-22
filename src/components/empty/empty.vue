<template>
    <el-empty class="empty">
  <el-button @click="goback" type="primary">返回</el-button>
</el-empty>
</template>

<script>
export default {
    methods:{
        goback(){
            history.go(-1)
        }
    }
}
</script>

<style lang="less" scoped>
.empty{
    width: 100%;
    height: 500px;
    position: relative;
    z-index: 10;
}
</style>
