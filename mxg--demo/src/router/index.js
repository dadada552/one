import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('../views/IndexView.vue')
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('../views/MemberView.vue')
      },
      {
        path: '/supplier',
        name: 'supplier',
        component: () => import('../views/SupplierView.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/GoodsView.vue')
      },
      {
        path: '/staff',
        name: 'staff',
        component: () => import('../views/StaffView.vue')
      },
    ]
  }
]

const router = new VueRouter({
  routes
})


// 挂载路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path != '/login' && !token) {
    next('/login')
  }
  next()
})
export default router
