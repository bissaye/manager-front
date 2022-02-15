<template>
    <div>
      <SelfLoading v-if="loading"></SelfLoading>
      <div class="dialog alert alert-danger" v-if="error">
        request error <br>try again
      </div>
      <form @submit.prevent="addTask" v-if="!loading">
        <div class="form-group">
          <label for="projet">Projet</label>
          <select class="form-control" name="projet"  v-model="nom_proj">
            <option value=""> Aucun </option>
            <option v-for="proj in projets" :key="proj">{{ proj.nom }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="nom">nom de la tache</label>
          <input type="input" class="form-control" id="" placeholder="nom de la tache" name="nom" v-model="form.nom">
        </div>
        <div class="form-group">
          <label for="description">description</label>
          <textarea class="form-control" id="" name="description" rows="3" v-model="form.description"></textarea>
        </div>
        <div class="form-group">
          <label for="asign">assigner a un utilisateur</label>
          <select class="form-control" name="asign"  v-model="nom_user">
            <option value=""> Aucun </option>
            <option v-for="user in users" :key="user">{{ user.username }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="type">type</label>
          <input type="input" class="form-control" id="" placeholder="type de tache" name="type" v-model="form.type">
        </div>
        <div class="form-group">
          <label for="priorite">Priorite</label>
          <select class="form-control" name="priorite" v-model="form.priorite">
            <option>basse</option>
            <option>moyenne</option>
            <option>elevee</option>
          </select>
        </div>
        <div class="form-group row">
          <label for="duree_estimee" class="col">duree estimee en heures</label>
          <input type="number" class="form-control col" min="0" max="24" name="duree_estimee" v-model="form.duree_estimee">
        </div>
        <div class="form-group row">
          <label for="jour" class="col">jour prevu pour le debut</label>
          <input type="date" class="form-control col" name="jour" v-model="form.jour">
        </div>
        <div class="form-group row">
          <label for="deadline" class="col">Deadline</label>
          <input type="datetime-local" class="form-control col" name="daedline" v-model="form.deadline">
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
  name: 'TaskFrom',
  components: {
    SelfLoading
  },
  data () {
    return {
      error: false,
      loading: false,
      projets: this.$store.state.projets,
      users: this.$store.state.AllUsers,
      nom_proj: '',
      nom_user: '',
      form: {
        projet: null,
        user: this.$store.state.user_id,
        user_asign: null,
        nom: '',
        description: '',
        type: '',
        priorite: '',
        duree_estimee: '',
        jour: null,
        deadline: '',
        etat: ''
      }
    }
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
    ObtainProjectID () {
      console.log('debut obtention de la cle du projet')
      for (let p in this.projets) {
        if (this.projets[p].nom === this.nom_proj) {
          this.form.projet = this.projets[p].id
          console.log('id du projet obtenu')
        }
      }
    },
    ObtainUserID () {
      console.log('debut obtention user')
      for (let u in this.users) {
        if (this.users[u].username === this.nom_user) {
          this.form.user_asign = this.users[u].id
          console.log('user obtenu')
        }
      }
    },
    addTask () {
      this.loading = true
      this.ObtainProjectID()
      this.ObtainUserID()
      console.log(this.form)
      axios.post(this.$store.state.host + 'taches/', this.form, {headers: { Authorization: 'Bearer ' + this.$store.state.access }})
        .then(
          (res) => {
            console.log(res.data)
            console.log('ok')
            this.loading = false
            this.close()
          }
        ).catch(
          (e) => {
            if (e.response.status === 401) {
              this.auth()
              this.addTask()
              this.loading = false
              this.error = true
            } else {
              console.log(e.response)
              this.loading = false
              this.error = true
            }
          }
        )
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
