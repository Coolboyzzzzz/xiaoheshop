<template>
    <div>
        {{aa.bb}}
        <button @click="chage">dianji1</button>
    </div>
</template>

<script>
export default {
data(){
    return {
        aa:{
            bb:1,
            cc:1
        }
    }
},
methods:{
    chage(){
       
       this.$delete(this.aa,"bb")
       console.log(this.aa)
    }
}
}
</script>

<style>

</style>
