
<template>
  <div class="container">
    <div id="particles-js"></div>
  </div>
</template>

<script>
  import particlesJs from "particles.js";
  const {particlesConfig}  = require("./config.js");
  export default {
    data() {
      return {};
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
              console.log(particlesConfig)
        particlesJS("particles-js", particlesConfig);
        document.body.style.overflow = "hidden";
      }
    }
  };
</script>

<style scoped>
#particles-js{
    width: 100%;
      height: 100%;

        /* background-image: url('./img/5.jpg') ;
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: contain; */
      
     }
.container{
    position: absolute; 
        width: 100%;
      height: 100%;
}
</style>