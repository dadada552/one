import axios from 'axios'

// 创建一个 axios实例 
const http = axios.create({
// 存放 公用的url路径的
baseURL: '',
// 设置网络请求超时时间
timeout: 1000
})

// 请求拦截
http.interceptors.request.use(
// 成功会走第一个参数
(config) => {
return config
},
// 如果发送请求失败 会走第二个参数
(error) => console.log(error)
)

// 响应拦截
http.interceptors.response.use(
// 成功 走第一个回调函数
(result) => {
return result
},
// 失败走第二个回调函数
(error) => console.log(error)
)
export default http
