import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'
import {  Message } from 'element-ui'
//重写push方法，让他在当前路径转到当前路径不会报错，官方写的是这样跳转会报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    redirect: '/welcome'
  }, {
    path: '/welcome',
    name: 'welcome',
    component: () => import('../views/WelcomeView.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue'),
    children: [
      {
        path: '/',
        name: '/',
        component: () => import('../components/homeContent/homeContent.vue'),
      },
      {
        path: '/login',
        name: '/login',
        component: () => import('../components/login/index.vue'),
      }, {
        path: '/mycart',
        name: '/mycart',
        component: () => import('../components/my_cart/my_cart.vue'),
      },
      {
        path: '/myorder',
        name: '/myorder',
        component: () => import('../components/order/order.vue'),
        children:[
          {
            path:'/orderDetail',
            name:'orderDetail',
              component: () => import('../components/order/orderDetail/orderDetail.vue'),

          }
        ]
      },
      {
        path: '/payPage',
        name: '/payPage',
        component: () => import('../components/pay/payPage.vue'),
      },
      {
        path: '/pay',
        name: '/pay',
        component: () => import('../components/pay/pay.vue'),
      },
      {
        path: '/callback',
        name: '/callback',
        component: () => import('../components/pay/callback.vue'),
      },
      {
        path: '/goodsdetail',
        name: 'goodsdetail',
        component: () => import('../components/goodsdetails/goodsdetail.vue'),
      },
      {
        path: '/empty',
        name: 'empty',
        component: () => import('../components/empty/empty.vue'),
      }, 


    ]
  },
  //分类展示页容器
  {
    path: '/test',
    name: '/test',
    component: () => import('../components/homeContent/cate_nav/nav.vue'),
  },
  {
    path: '/test1',
    name: '/test1',
    component: () => import('../components/login/12.vue'),
  },
]

const router = new VueRouter({
  mode: "history",
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }	// x控制左右，y控制上下
  }
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 用户信息
  const token = store.state.m_users.token
  console.log(token)
  // 跳转去member开头的地址却没有登录
  if (['/mycart','/myorder'].includes(to.path) && !token) {
    Message({type:'error',message:'请先登录，在访问！'})
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  }
  next()
})

export default router
