import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from './components/elementUi';
import axios from 'axios'
import './common/style.less'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/iconfont.js'
import './assets/css/iconfont.css'
//导入设置排行榜hover事件，等等，自定义脚本
import './common/js/hover.js'
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
