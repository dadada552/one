import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect:'/table',
    children: [
      {
        path: '/table',
        name: 'table',
        component: () => import('../views/tableView.vue'),
        meta: { name: "table表格页" }
      },
      {
        path: '/tab',
        name: 'tab',
        component: () => import('../views/tabView.vue'),
        meta: { name: "tab标签页" }
      }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
