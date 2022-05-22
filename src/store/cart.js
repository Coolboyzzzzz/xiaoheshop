import { addCart, getCart, deleteCart } from '@/api/user.js'
export default {
    namespaced: true,
    state: () => (
        {
            cart: [],
            all: false
        }
    ),
    mutations: {
        //添加到购物车
        addTocart(state, book) {
            const findResult = state.cart.find(x => x.bookid == book.bookid)
            if (!findResult) {
                state.cart.push(book)
                this.commit('m_cart/saveServe', book)
            } else {
                findResult.book_count += book.book_count
                this.commit('m_cart/saveServe', findResult)
            }
        },
        //初始化购物车
        initCart(state, obj) {
            state.cart = obj
        },
        //保存本地存储
        saveToStorage(state) {
            window.localStorage.setItem('cart', JSON.stringify(state.cart))


        },
        //更新购物车选中状态
        updatacart(state, item) {
            const result = state.cart.find(x => x.bookid === item.bookid)
            result.book_state = !result.book_state
            this.commit('m_cart/saveServe', result)
        },
        //更新商品数量
        updatanum(state, item) {
            const result = state.cart.find(x => x.bookid === item.bookid)
            result.book_count = item.current
            this.commit('m_cart/saveServe', result)
        },
        //删除商品
        deletegoods(state, id) {
            const result = state.cart.filter(x => x.bookid !== id)
            state.cart = result
            //提交服务器删除
            deleteCart(id)
        },
        //提交服务器储存
        saveServe(state, obj) {
            addCart(obj)
        },
        //选中全部
        checkedAll(state) {
            state.all = !state.all
            state.cart.forEach(x => {
                x.book_state = state.all
                this.commit('m_cart/saveServe', x)
            })
        },
        //删除已经生成订单的商品
        deleteOrdergoods(state, id) {
            state.cart.forEach(x => {
                if (x.book_state == true) {
                    this.commit('m_cart/deletegoods', x.bookid) 
                }
            }
            )
        },

    },
    actions: {
        //获取购物车数据
        async getcart(state) {
            const { data: res } = await getCart()
            if (res.code !== 200) return
            this.commit('m_cart/initCart', res.message)
        },

    },
    getters: {
        //返回购物车商品的数量
        total(state) {
            let c = 0
            state.cart.forEach(book => c += book.book_count)
            return c
        },
        //返回购物车已选中的总钱数
        sum(state) {
            let c = 0
            state.cart.filter(x => x.book_state == true).forEach(price => c += price.bookprice * price.book_count * price.discount)
            return {
                pre: c.toFixed(2),
                cur: (c -= Math.floor(c / 100) * 50).toFixed(2)
            }
        },
        //返回已选中的商品数量
        num(state) {
            let c = 0
            state.cart.filter(x => x.book_state == true).forEach(x => c += x.book_count)
            return c
        },
        //判断是否用户自己手动的选中全部，如果是就成为true
        status(state) {
            const result = state.cart.find(x => x.book_state == false)
            if (result) {
                return false
            } else {
                return true
            }
        },
        order(state) {
            return state.cart.filter(x => x.book_state == true)
        }
    }
}