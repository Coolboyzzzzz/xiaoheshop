import Vue from 'vue'
import Vuex from 'vuex'
import users from './users/index.js'
import category from './category.js'
import cart from './cart.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    "m_users": users,
    "m_category":category,
    "m_cart":cart
  }
})
