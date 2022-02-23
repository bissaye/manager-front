<template>
    <div>
      <SelfLoading v-if="loading"></SelfLoading>
      <div class="dialog alert alert-danger" v-if="error">
        request error <br>try again
      </div>
      <form @submit.prevent="addProject" v-if="!loading">
        <div class="form-group">
          <label for="nom">nom du projet</label>
          <input type="input" class="form-control" id="" placeholder="nom de la tache" name="nom" v-model="form.nom">
        </div>
        <div class="form-group">
          <label for="description">description</label>
          <textarea class="form-control" id="" name="description" rows="3" v-model="form.description"></textarea>
        </div>
        <div class="form-group">
          <label for="type">type</label>
          <input type="input" class="form-control" id="" placeholder="type de tache" name="type" v-model="form.type">
        </div>
        <div class="form-group">
          <label for="etat">etat</label>
          <select class="form-control" name="etat" v-model="form.etat">
            <option>termine</option>
            <option>en cours</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary text-center">Submit</button>
      </form>
    </div>
</template>

<script>
import axios from 'axios'
import SelfLoading from './SelfLoading.vue'
export default {
  name: 'ProjectForm',
  data () {
    return {
      loading: false,
      error: false,
      form: {
        nom: '',
        type: '',
        description: '',
        user: this.$store.state.user_id,
        etat: ''
      }
    }
  },
  components: {
    SelfLoading
  },
  methods: {
    auth () {
      console.log('refresh')
      axios.post(this.$store.state.host + 'manager/token/refresh/', {'refresh': this.$store.state.refresh})
        .then(
          (res) => {
            console.log(res.data)
            this.$store.state.access = res.data.access
          }
        ).catch(
          (e) => {
            if (e.response.status === 400) {
              this.$router.push('/signin')
            }
          }
        )
    },
    addProject () {
      this.loading = true
      console.log(this.form)
      this.$store.commit('SetForm', this.form)
      this.$store.state.data = 'projets'
      this.$store.dispatch('Post')
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
