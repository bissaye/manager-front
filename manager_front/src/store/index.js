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
    AllUsers: null,
    logged: false,
    error: false,
    loading: false,
    taches: null,
    todayTaches: [],
    projets: null,
    today: true,
    data: '',

    // host for production
    // host: 'http://managerapi.herokuapp.com/',

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

    // fonction d'authentification
    auth (context) {
      context.state.loading = true
      context.state.error = false
      axios.post(context.state.host + 'manager/token/', context.state.form)
        .then((res) => {
          if (res.status === 200) {
            res = res.data
            context.state.access = res.access
            context.state.refresh = res.refresh
            context.state.logged = true
            let datas = ['userid', 'taches', 'projets', 'users']
            datas.forEach(element => {
              console.log(element)
              context.state.data = element
              context.dispatch('Get')
            })

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

    // fonction pour le refresh
    Refresh (context) {
      axios.post(context.state.host + 'manager/token/refresh/', {'refresh': context.state.refresh})
        .then(
          (res) => {
            context.state.access = res.data.access
          }
        )
    },

    // fonction pour trouver les taches d'une journee donnees
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

    // fonction pour les requetes en get vers les donnees
    Get (context) {
      console.log('chargement avec data = ' + context.state.data)
      context.state.loading = true
      context.state.error = false
      let chemin = context.state.host
      if (context.state.data === 'taches') {
        chemin = chemin + 'taches_user/'
      } else if (context.state.data === 'projets') {
        chemin = chemin + 'projet_user/'
      } else if (context.state.data === 'users') {
        chemin = chemin + 'users/'
      } else if (context.state.data === 'userid') {
        chemin = chemin + 'userid/'
      }
      console.log('requete vers ' + context.state.data)
      axios.get(
        chemin,
        {headers: {
          Authorization: 'Bearer ' + context.state.access
        }}
      ).then(
        (res) => {
          if (context.state.data === 'taches') {
            context.state.taches = res.data
            context.dispatch('TodayTaches')
            console.log('obtention des taches succes')
          } else if (context.state.data === 'projets') {
            context.state.projets = res.data
            console.log('obtention des projets succes')
            context.state.loading = false
          } else if (context.state.data === 'users') {
            context.state.AllUsers = res.data
            console.log('obtention des users succes')
            context.state.loading = false
          } else if (context.state.data === 'userid') {
            context.state.user_id = res.data.id
            context.state.loading = false
          }
        }
      ).catch(
        (e) => {
          if (e.response.status === 401) {
            try {
              context.dispatch('Refresh')
              context.dispatch('Load')
            } catch (e) {
              if (e.response.status === 400) {
                context.state.error = true
                router.push({
                  name: 'Signin'
                })
              }
            }
          }
        }
      )
    },

    // centralisation pour les requetes en post vers les donnees
    Post (context) {
      console.log('chargement avec data = ' + context.state.data)
      context.state.loading = true
      context.state.error = false
      let chemin = context.state.host
      if (context.state.data === 'taches') {
        chemin = chemin + 'taches'
      } else if (context.state.data === 'projets') {
        chemin = chemin + 'projet'
      }
      console.log('enregistrement de ' + context.state.data)
      axios.post(
        chemin,
        context.state.form,
        {headers: {
          Authorization: 'Bearer ' + context.state.access
        }}
      ).then(
        (res) => {
          console.log('ok')
          context.state.loading = false
          context.state.error = false
        }
      ).catch(
        (e) => {
          if (e.response.status === 401) {
            context.dispatch('Refresh')
            context.dispatch('Post')
          } else {
            context.state.loading = false
            context.state.error = true
          }
        }
      )
    }
  },
  modules: {
  }
})
