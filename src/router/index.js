import Vue from 'vue'
import Router from 'vue-router'

import addCustomer from '@/components/addCustomer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'addCustomer',
      component: addCustomer
    },
   
  ]
})
