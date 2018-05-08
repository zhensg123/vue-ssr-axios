/*import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
import {createRouter} from './router.js'
Vue.prototype.$http = "axios"
export function createApp () {
  const router=createRouter()
  const app = new Vue({
    // 根实例简单的渲染应用程序组件。
    router,
    render: h => h(App)
  })
  return { app,router}
}*/
// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
export function createApp () {
  // 创建 router 和 store 实例
  const router = createRouter()
  const store = createStore()
  // 同步路由状态(route state)到 store
  sync(store, router)
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  console.log(app);
  // 暴露 app, router 和 store。
  return { app, router, store }
}