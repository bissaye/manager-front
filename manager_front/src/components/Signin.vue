<template>
    <div>
        <nav class="navbar">
            <router-link to="/" class="navbar-brand"><img src="../assets/img/logo.png" height="100"></router-link>
            <p class="lead" style="color: black;">
                you don't have an account?
                <router-link to="/signup" class="btn btn-lg btn-outline-success">Sign up</router-link>
            </p>
        </nav>
        <div class="content position-absolute text-center">
            <div class="dialog alert alert-danger" v-if="error">
                authentication error <br>try again
            </div>
            <form  @submit.prevent="auth">
              <SelfLoading v-if="loading"></SelfLoading>
                <div class='container '>
                    <div class="form-group">
                        <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Username</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Username" name="username" v-model="form.username" aria-describedby="inputGroup-sizing-default">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">password</span>
                        </div>
                        <input type="password" class="form-control" aria-label="password" aria-describedby="inputGroup-sizing-default" name="password" v-model="form.password">
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button type="submit" class="btn btn-primary">submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SelfLoading from './SelfLoading.vue'

export default ({
  name: 'Signin',
  data () {
    return {
      loading: false,
      form: {
        username: '',
        email: '',
        password: ''
      },
      error: false
    }
  },
  components: {
    SelfLoading
  },
  mounted () {
    if (this.$store.state.logged) {
      this.$router.push('/home')
    }
  },
  methods: {
    auth: function () {
      this.loading = true
      axios.post(this.$store.state.host + 'manager/token/', this.form)
        .then((res) => {
          if (res.status === 200) {
            res = res.data
            this.$store.state.access = res.access
            this.$store.state.refresh = res.refresh
            this.$store.state.logged = true

            this.Load_task()
            this.Load_project()
            this.User_id()

            console.log('succes')
            this.error = false
            this.loading = false

            this.$router.push('/home')
          } else {
            this.error = true
            this.loading = false
          }
        }).catch((e) => {
          console.log(e)
          this.error = true
          this.loading = false
        })
    },
    User_id () {
      this.loading = true
      console.log('requete pour user id')
      axios.get(
        this.$store.state.host + 'userid/',
        {headers: {
          Authorization: 'Bearer ' + this.$store.state.access
        }}
      ).then(
        (res) => {
          this.$store.state.user_id = res.data.id
          console.log('obtention de l\'id succes')
          this.loading = false
        }
      ).catch(
        (e) => {
          if (e.response.status === 401) {
            this.auth()
            this.loading = false
          }
        }
      )
    },
    Load_task () {
      this.loading = true
      console.log('requete vers taches')
      axios.get(
        this.$store.state.host + 'taches_user/',
        {headers: {
          Authorization: 'Bearer ' + this.$store.state.access
        }}
      ).then(
        (res) => {
          this.$store.state.taches = res.data
          console.log('obtention des taches succes')
        }
      ).catch(
        (e) => {
          if (e.response.status === 401) {
            this.auth()
            this.loading = false
          }
        }
      )
    },
    Load_project () {
      this.loading = true
      console.log('requete vers projets')
      axios.get(
        this.$store.state.host + 'projet_user/',
        {headers: {
          Authorization: 'Bearer ' + this.$store.state.access
        }}
      ).then(
        (res) => {
          this.$store.state.projets = res.data
          console.log('obtention des projets succes')
          this.loading = false
        }
      ).catch(
        (e) => {
          if (e.response.status === 401) {
            this.auth()
            this.loading = false
          }
        }
      )
    }
  }

})
</script>

<style>
.content{
    margin-left: 35%;
    margin-right:20%;
    margin-top: 10%;
    width: 400px;
}

@media only screen and (max-width: 650px){
    .content{
        margin: auto;
        position: relative;
        width: 100%;
        height: 100%
    }
}
</style>
