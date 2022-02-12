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
              <SelfLoading v-if="this.$store.state.loading"></SelfLoading>
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
import SelfLoading from './SelfLoading.vue'

export default ({
  name: 'Signin',
  data () {
    return {
      // loading: this.$store.state.loading,
      form: {
        username: '',
        email: '',
        password: ''
      },
      error: this.$store.state.error
    }
  },
  components: {
    SelfLoading
  },
  mounted () {
    if (this.$session) {
      this.$router.push('/home')
    }
  },
  methods: {
    auth () {
      try {
        console.log('obtention des datas')
        this.$store.commit('SetForm', this.form)
        console.log('auth')
        this.$store.dispatch('auth')
      } catch (e) {
        console.log('signin error')
      } finally {
        this.$router.push('/home')
      }
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
