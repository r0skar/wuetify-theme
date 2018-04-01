/**
 * Submit a form to WP Backend.
 * Requires the Contact Form 7 plugin installed and activated.
 *
 * Status responses:
 * 'validation_failed'
 * 'acceptance_missing'
 * 'spam'
 * 'mail_sent'
 * 'mail_failed'
 */

const state = {
  busy: false,
  status: '',
  message: ''
}

const mutations = {
  IS_BUSY: (state, payload) => (state.busy = payload),
  SET_STATUS: (state, status) => (state.status = status),
  SET_MESSAGE: (state, message) => (state.message = message)
}

const actions = {
  async submitForm({ commit }, event) {
    commit('IS_BUSY', true)
    const response = await fetch(event.target.action, {
      method: 'POST',
      body: new FormData(event.target)
    })
    const json = await response.json()
    commit('SET_STATUS', json.status)
    commit('SET_MESSAGE', json.message)
    commit('IS_BUSY', false)
  }
}

const getters = {
  currentStatus: state => state.status,
  currentMessage: state => state.message
}

const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default store
