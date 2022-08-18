import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//导入axios
import axios from 'axios'
// 配置请求的基准URL地址
axios.defaults.baseURL = 'http://vue.mengxuegu.com/pro-api'
// axios设置请求拦截器,设置响应头token
axios.interceptors.request.use(
  config => {
    config.headers.token = window.localStorage.getItem('token') //每次发送请求之前自动将在session中的token提取出来当做响应头header
    return config
  },
  err => {
    console.log(err)
  }
)
//把axios注册到Vue
Vue.prototype.$axios = axios
//关闭vue在console中的默认提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
