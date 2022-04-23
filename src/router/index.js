import Vue from 'vue'
import VueRouter from 'vue-router'

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
        component:() => import('../views/HomeView.vue'),
      },
      {
        path:'/login',
        name:'/login',
        component:() => import('../components/login/index.vue'),
      }
    ]
      },
      //分类展示页容器

]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
