import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations/mutations'
import actions from './actions/actions'
import getters from './getters/getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    SearchTitle: '',
    products: [],
    cart: []
  },
  mutations,
  actions,
  getters
})
export default store
