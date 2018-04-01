import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)

/**
 * Export a constructor function to allow the client
 * and server create their own instance of the router.
 */
export default function createRouter() {
  return new Router({
    mode: 'history',
    routes,
    // Simulate native-like scroll behavior
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })
}
