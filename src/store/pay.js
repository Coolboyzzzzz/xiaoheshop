//导入获取用户地址接口
import {  getOrder, updataOrderState } from '@/api/pay.js'
export default {
    namespaced: true,
    state: () => (
        {
            order: [],
            payoderId: 0
        }
    ),
    mutations: {
        //更新订单数据
        updateOrder(state, obj) {
            state.order = obj
            console.log(state.order)

        },
        updatapayoderId(state, obj) {
            state.payoderId = obj
        },
    },
    actions: {
        //初始化我的订单
        async initOrder() {
            const { data: res } = await getOrder()
            if(res.code != 200) return 
            res.data.forEach(async item => {
                //拦截数据转换格式
                item.bookDetail = JSON.parse(item.bookDetail)
                //获取数据的时候检查是否有过期的订单  有的话修改订单状态
                if ((new Date().getTime() - new Date(item.createDate).getTime()) / 60000 > 30 && item.orderStatus != 6) {
                    item.orderStatus = 6
                    console.log(item)
                    await updataOrderState({ orderStatus: item.orderStatus, orderId: item.orderId })
                }
            })
            this.commit('m_pay/updateOrder', res.data)
        }

    },
    getters: {
        //待付款订单
        waitPay(state) {
            return state.order.filter(item => item.orderStatus == 1)
        },
        //待发货订单
        readyPay(state) {
            return state.order.filter(item => item.orderStatus == 2)
        },
        //待收货订单
        alreadyPay(state) {
            return state.order.filter(item => item.orderStatus == 3)
        },
        //待评价订单
        finshPay(state) {
            return state.order.filter(item => item.orderStatus == 4)
        },
        //已完成订单
        finshedPay(state) {
            return state.order.filter(item => item.orderStatus == 5)
        },
        //已取消订单
        cancelPay(state) {
            return state.order.filter(item => item.orderStatus == 6)
        }

    }

}