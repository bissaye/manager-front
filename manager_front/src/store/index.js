import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    access: '',
    refresh: '',
    user_id: 0,
    logged: false,
    error: false,
    loading: false,
    taches: null,
    todayTaches: [],
    projets: null,
    today: true,

    // host for production
    // host: 'http://managerapi.herokuapp.com/'

    // host for debug
    host: 'http://localhost:8000/',
    form: {}
  },

  mutations: {
    SetForm (state, form) {
      state.form = form
    }
  },
  actions: {
    auth (context) {
      context.state.loading = true
      axios.post(context.state.host + 'manager/token/', context.state.form)
        .then((res) => {
          if (res.status === 200) {
            res = res.data
            context.state.access = res.access
            context.state.refresh = res.refresh
            context.state.logged = true

            context.dispatch('User_id')
            context.dispatch('Load_task')
            context.dispatch('Load_project')

            context.state.error = false
            context.state.loading = false
          } else {
            context.state.error = true
            context.state.loading = false
          }
        }).catch((e) => {
          console.log(e)
          context.state.error = true
          context.state.loading = false
        })
    },

    Refresh (context) {
      axios.post(context.state.host + 'manager/token/refresh/', {'refresh': context.state.refresh})
        .then(
          (res) => {
            context.state.access = res.data.access
          }
        )
    },
    User_id (context) {
      context.state.loading = true
      axios.get(
        context.state.host + 'userid/',
        {headers: {
          Authorization: 'Bearer ' + context.state.access
        }}
      ).then(
        (res) => {
          context.state.user_id = res.data.id
          context.state.loading = false
        }
      ).catch(
        (e) => {
          if (e.response.status === 401) {
            router.push({
              name: 'Signin'
            })
            context.dispatch('auth')
            context.state.loading = false
          }
        }
      )
    },

    TodayTaches (context) {
      var dateDuJour = new Date(Date.now())
      for (let index in this.taches) {
        var dateTache = new Date(context.state.taches[index].jour)
        if (dateTache.getFullYear() === dateDuJour.getFullYear() && dateTache.getMonth() === dateDuJour.getMonth() && dateTache.getDate() === dateDuJour.getDate()) {
          context.state.todayTaches.push(context.state.taches[index])
        }
      }
      console.log('obtention des taches du jour')
    },

    Load_task (context) {
      context.state.loading = true
      console.log('requete vers taches')
      axios.get(
        context.state.host + 'taches_user/',
        {headers: {
          Authorization: 'Bearer ' + context.state.access
        }}
      ).then(
        (res) => {
          context.state.taches = res.data
          context.dispatch('TodayTaches')
          console.log('obtention des taches succes')
        }
      ).catch(
        (e) => {
          if (e.response.status === 401) {
            try {
              context.dispatch('Refresh')
              context.dispatch('Load_task')
            } catch (e) {
              if (e.response.status === 400) {
                router.push({
                  name: 'Signin'
                })
              }
            }
          }
        }
      )
    },
    Load_project (context) {
      context.state.loading = true
      console.log('requete vers projets')
      axios.get(
        context.state.host + 'projet_user/',
        {headers: {
          Authorization: 'Bearer ' + context.state.access
        }}
      ).then(
        (res) => {
          context.state.projets = res.data
          console.log('obtention des projets succes')
          context.state.loading = false
        }
      ).catch(
        (e) => {
          if (e.response.status === 401) {
            context.dispatch('auth')
            context.state.loading = false
          }
        }
      )
    }
  },
  modules: {
  }
})
