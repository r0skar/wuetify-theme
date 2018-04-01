import Vue from 'vue'
import App from '@/App'
import createStore from '@/store'
import createRouter from '@/router'

Vue.config.devtools = true
Vue.config.performance = true
Vue.config.productionTip = false

/**
 * Export a constructor function to allow the client
 * and server create their own instance of the application.
 *
 * Returns the app itself, a new store instance and a
 * new router instance.
 */
export default function createApp() {
  const store = createStore()
  const router = createRouter()
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })
  return {
    app,
    store,
    router
  }
}
