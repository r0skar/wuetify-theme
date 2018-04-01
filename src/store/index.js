import Vue from 'vue'
import Vuex from 'vuex'
import forms from './modules/forms'
import wordpress from './modules/wordpress'

Vue.use(Vuex)

/**
 * Export a constructor function to allow the client
 * and server create their own instance of the store.
 */
export default function createStore() {
  return new Vuex.Store({
    modules: {
      wordpress,
      forms
    }
  })
}
