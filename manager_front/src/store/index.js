import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access: '',
    refresh: '',
    user_id: 0,
    logged: false,
    taches: null,
    projets: null,
    today: true,
    host: 'http://managerapi.herokuapp.com/'
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
