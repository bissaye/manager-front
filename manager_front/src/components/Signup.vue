<template>
    <div>
        <nav class="navbar">
            <router-link to="/" class="navbar-brand"><img src="../assets/img/logo.png" height="100"></router-link>
            <p class="lead" style="color: black;">
                Already have an account?
                <router-link to="/signin" class="btn btn-lg btn-outline-success">Signin</router-link>
            </p>
        </nav>
        <div class="content position-absolute text-center">
            <div class="dialog alert alert-danger" v-if="error.bool">
                <p v-if="error.type === 'server'">authentication error <br>try again</p>
                <p v-if="error.type === 'form'">form error</p>
            </div>
            <form @submit.prevent="Control">
                <div class='container '>
                    <div class="form-group">
                        <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Username</span>
                        </div>
                        <input type="text" class="form-control" aria-label="Username" name="username" aria-describedby="inputGroup-sizing-default" v-model="form.username">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Email</span>
                        </div>
                        <input type="Email" class="form-control" aria-label="Email" name="email" aria-describedby="inputGroup-sizing-default" v-model="form.email">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">password</span>
                        </div>
                        <input type="password" class="form-control" aria-label="password" name="password" aria-describedby="inputGroup-sizing-default" id="password" v-model="form.password">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group mb-3">
                        <div class="input-group-prepend" >
                            <span class="input-group-text confirmation" id="inputGroup-sizing-default">Confirm password</span>
                        </div>
                        <input type="password" class="form-control" aria-label="Confirm password" name="confirm-password" aria-describedby="inputGroup-sizing-default" id="confirm-password" v-model="control">
                        </div>
                    </div>
                    <div class="form-group text-center">
                        <button type="submit" class="btn btn-primary" id="submit">submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default ({
  name: 'Signup',
  data () {
    return {
      control: '',
      error: {
        bool: false,
        type: ''
      },
      form: {
        username: '',
        email: '',
        password: ''
      }
    }
  },
  mounted () {
    console.log('signup')
  },
  methods: {
    Control () {
      if (!(this.form.password === this.control)) {
        this.error.bool = true
        this.error.type = 'form'
      } else {
        this.UserRe()
      }
    },
    UserRe () {
      this.loading = true
      console.log('requete pour user id')
      axios.post(
        this.$store.state.host + 'userre/',
        this.form
      ).then(
        (res) => {
          console.log(res.data)
          this.loading = false
          this.$router.push('/signin')
        }
      ).catch(
        (e) => {
          this.error.bool = true
          this.error.type = 'server'
          this.loading = false
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
