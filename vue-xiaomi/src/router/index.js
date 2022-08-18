import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue' //静态导入

//路由懒加载
const Home = () => import( /* webpackChunkName: "Home" */ '../views/Home.vue')



Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
        path: '/goods',
        name: 'goods',
        component: () => import('../views/goods.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/about.vue')
      },
      {
        path: '/homeview',
        name: 'homeview',
        component: () => import('../views/homeview.vue')
      },
      {
        path: '/car',
        name: 'car',
        component: () => import('../views/car.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: "homeview"
  }
]
const router = new VueRouter({
  routes
})
//路由守卫-进行全局路由拦截

router.beforeEach((to, form, next) => {
  if (to.path == '/homeview' || to.path == '/about' || to.path == '/goods' || to.path == 'zhuce') {
    return next()
  }
  const token = localStorage.getItem('token')
  if (to.path != '/homeview' && !token) {
    next('/homeview')
  }
  next()

})



export default router