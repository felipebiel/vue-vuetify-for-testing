import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TreeVueChart from '../views/TreeVueChart.vue'
import VuetifyTree from '../views/VuetifyTree'
import TreeExample from "../views/TreeExample";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tree-chart',
    name: 'TreeVueChart',
    component: TreeVueChart
  },
  {
    path: '/tree-chart-vuetify',
    name: 'VuetifyTree',
    component: VuetifyTree
  },
  {
    path: '/tree-chart-exemple-1',
    name: 'TreeExample',
    component: TreeExample
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
