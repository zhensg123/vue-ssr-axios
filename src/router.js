// router.js
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Hello from "./components/Hello.vue"
import Halo from "./components/Halo.vue"

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
      	path:"/",component:Halo,
      },{
      	path:"/hello/:id",component:()=>import("./components/Hello.vue")
      },{
        path:"/item/:id",component:()=>import("./components/Item.vue")
      }
    ]
  })
}