import Vue from 'vue'
import Vuex from 'vuex'
import pers from 'vuex-persistedstate';
import getters from "./getters"
import mutations from "./mutations"
import state from "./state"
Vue.use(Vuex)


export default new Vuex.Store({
  // 本地持久化插件
  plugins: [pers()],
  state,
  getters,
  mutations,
  actions: {

  }
})
