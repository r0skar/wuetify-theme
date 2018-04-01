import createApp from '@/app'
import NProgress from 'nprogress/nprogress'
import { fetchWpPostObject } from '@/utils'

NProgress.configure({ showSpinner: false })

/**
 * Get a new instance for app, store and router.
 */
const { app, store, router } = createApp()

/**
 * Before the route resolves:
 *
 * 1) Start progress loading.
 * 2) Fetch current route object from WP API.
 * 3) Fill store and change document title.
 * 4) Go to requested route.
 */
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  let json = await fetchWpPostObject(to.path)
  store.dispatch('wordpress/changeRoute', json.route)
  document.title = json.route.document_title
  next()
})

/**
 * Route has resolved:
 *
 * 1) Stop progress loading.
 */
router.afterEach((routeTo, routeFrom) => {
  NProgress.done()
})

/**
 * Mount application.
 */
if (process.env.NODE_ENV === 'production') {
  /**
   * The `__INITIAL_STATE__` is defined in server.js
   * and represents the app state on load.
   */
  store.replaceState(window.__INITIAL_STATE__)
  app.$mount('#app')
} else {
  /**
   * When we are in dev mode, we must create the initial app
   * state manually. The base wordpress state is fetched via
   * the WP API and than merged with the base app state.
   *
   * For production, this is taken care of in `server.js`.
   */
  ;(async function() {
    let json = await fetchWpPostObject(app.$route.path)
    store.replaceState({ ...store.state, wordpress: json })
    document.title = json.route.document_title
    app.$mount('#app')
  })()
}
