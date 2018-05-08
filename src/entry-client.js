import { createApp } from './app'
// 客户端特定引导逻辑……
const { app, router, store } = createApp()
router.onReady(() => {
  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }
  app.$mount('#app')
})
