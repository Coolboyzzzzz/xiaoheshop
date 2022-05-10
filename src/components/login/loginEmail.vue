<template>
<el-form :model="ruleForm" :rules="rules">
    <sendEmail />
    </el-form>
</template>

<script>
import sendEmail from './sendEmail'
export default {
components:{
    sendEmail
},
data(){
    return{
        ruleForm:{
            checkEmail:''
        },
        rules:{}
    }
}
}
</script>

<style lang="less" scoped>

</style>
