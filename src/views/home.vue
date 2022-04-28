<template>
  <div id="app">
     <particles class="bc"/> 
<Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>
 
 <script>
  import Header from '../components/Header/index.vue'
import Footer from '../components/Footer/index.vue'
import particles from '../components/particles/Particles.vue'
 export default {
name:'App',
components:{
  Header,
  Footer,
particles
}
 }
 </script>

<style lang="less" scoped>
 #app{
   background-color: rgb(252,252,252);
         position: relative;
 }

 </style>
 
