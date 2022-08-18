import server from './http.js' //导入axios

//首页轮播
const carousel = () => {
   let data = server.post('/resources/carousel')
   return data
}
const login = (msg) => {
   let data = server.post('/users/login', msg)
   return data
}
const shoppingCart = (msg) => {
   let data = server.post('/user/shoppingCart/getShoppingCart', msg)
   return data
}
// 获取首页商品
const getshopinhome = (msg) => {
   let data = server.post(`product/getPromoProduct`,msg)
   return data
}
// 注册
const register = (msg) => {
   let data = server.post('users/register',msg)
   return data
}
// 关于我们
const getAllProduct = ()=>{
    let data = server.post("product/getAllProduct")
    return data
}
export {
   carousel,
   login,
   shoppingCart,
   getshopinhome,
   register,
   getAllProduct
}