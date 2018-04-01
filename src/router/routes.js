import DefaultView from '@/views/Default'

const routes = [
  /**
   * This is the default view for all unkown routes.
   *
   * It acts like a little router itself: If the current route
   * `store.route.type` is a valid type, it displays the `SingleView`,
   * otherwise it shows the `ErrorView`.
   */
  {
    path: '*',
    component: DefaultView
  }
]

export default routes
