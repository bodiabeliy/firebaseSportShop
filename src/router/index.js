import Vue from 'vue'
import VueRouter from 'vue-router'
import Catalog from '../components/v-catalog.vue'
import Cart from '../components/v-cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Catalog',
    component: Catalog
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
