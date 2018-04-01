/**
 * Represents the current Wordpress site.
 * The route is overriden on each vue-router event.
 */

const state = {
  user: [],
  menus: [],
  forms: [],
  posts: [],
  route: {},
  settings: {}
}

const mutations = {
  CHANGE_ROUTE: (state, route) => (state.route = route)
}

const actions = {
  changeRoute({ commit }, route) {
    commit('CHANGE_ROUTE', route)
  }
}

const getters = {
  allPosts: state => state.posts,
  allForms: state => state.forms,
  allMenus: state => state.menus,
  currentUser: state => state.user,
  currentRoute: state => state.route,
  allSettings: state => state.settings,
  siteSettings: state => state.settings.site,
  themeSettings: state => state.settings.theme,
  menuById: state => id => state.menus.find(menu => menu.id === id),
  formById: state => id => state.forms.find(form => form.id === id),
  currentPost: state => state.posts.find(post => post.id === state.route.post_id)
}

const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default store
