import { addCart } from '@/api/user.js'
export default {
    namespaced: true,
    state: () => (
        {
            cart: JSON.parse(window.localStorage.getItem('cart') || '[]'),
            all: false
        }
    ),
    mutations: {
        //添加到购物车
        addTocart(state, goods) {
            const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
            if (!findResult) {
                state.cart.push(goods)
                this.commit('m_cart/saveServe',goods)
            } else {
                findResult.goods_count += goods.goods_count
                this.commit('m_cart/saveServe',findResult)
            }
            this.commit('m_cart/saveToStorage')
        },
        //提交服务器储存
        saveServe(state,obj) {
                addCart(obj)

        },
        //保存本地存储
        saveToStorage(state) {
            window.localStorage.setItem('cart', JSON.stringify(state.cart))


        },
        //更新购物车选中状态
        updatacart(state, item) {
            const result = state.cart.find(x => x.goods_id === item.goods_id)
            result.goods_state = !result.goods_state
            this.commit('m_cart/saveServe',result)
            this.commit('m_cart/saveToStorage')
        },
        //更新商品数量
        updatanum(state, item) {
            const result = state.cart.find(x => x.goods_id === item.goods_id)
            result.goods_count = item.current
            this.commit('m_cart/saveServe',result)
            this.commit('m_cart/saveToStorage')
        },
        //删除商品
        deletegoods(state, id) {
            const result = state.cart.filter(x => x.goods_id !== id)
            state.cart = result
            this.commit('m_cart/saveToStorage')
        },
        //选中全部
        checkedAll(state) {
            state.all = !state.all
            state.cart.forEach(x => {
                x.goods_state = state.all
                this.commit('m_cart/saveServe',x)
            })
            this.commit('m_cart/saveToStorage')
        },

    },
    actions: {

    },
    getters: {
        //返回购物车商品的数量
        total(state) {
            let c = 0
            state.cart.forEach(goods => c += goods.goods_count)
            return c
        },
        //返回购物车已选中的总钱数
        sum(state) {
            let c = 0
            state.cart.filter(x => x.goods_state === true).forEach(price => c += price.goods_price * price.goods_count * price.discount)
            return {
                pre: c.toFixed(2),
                cur: (c -= Math.floor(c / 100) * 50).toFixed(2)
            }
        },
        //返回已选中的商品数量
        num(state) {
            let c = 0
            state.cart.filter(x => x.goods_state === true).forEach(x => c += x.goods_count)
            return c
        },
        //判断是否用户自己手动的选中全部，如果是就成为true
        status(state) {
            const result = state.cart.find(x => x.goods_state === false)
            if (result) {
                return false
            } else {
                return true
            }
        }
    }
}