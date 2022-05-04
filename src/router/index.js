import Vue from 'vue'
import VueRouter from 'vue-router'
//重写push方法，让他在当前路径转到当前路径不会报错，官方写的是这样跳转会报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect:'/welcome'
  },{
    path:'/welcome',
    name: 'welcome',
    component: () => import('../views/WelcomeView.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component:() => import('../views/home.vue'),
    children:[
      {
        path:'/',
        name:'/',
        component:() => import('../components/homeContent/homeContent.vue'),
      },
      {
        path:'/login',
        name:'/login',
        component:() => import('../components/login/index.vue'),
      }, {
        path:'/mycart',
        name:'/mycart',
        component:() => import('../components/my_cart/my_cart.vue'),
      }     

    ]
      },
      //分类展示页容器
      {
        path:'/test',
        name:'/test',
        component:() => import('../components/goodscar/index.vue'),
      },
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
