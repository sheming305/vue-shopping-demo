import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import * as mutations from './mutations'

Vue.use(Vuex)


export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations
})
