<template>
  <div id="app">
<Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>
 
 <script>
  import Header from '../components/Header/index.vue'
import Footer from '../components/Footer/index.vue'
 export default {
name:'App',
components:{
  Header,
  Footer,

}
 }
 </script>
 
<style lang="less" scoped>
 #app{
   background-color: rgb(252,252,252);
 }
 </style>
 
