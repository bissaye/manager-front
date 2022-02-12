<template>
    <div>
      <div>
        <div>
          <SelfLoading v-if="loading"></SelfLoading>
        </div>
        <div class="dialog alert alert-danger" v-if="error">
          request error <br>try again
        </div>
        <div>
          <button class="btn btn-primary" @click="reload">reload</button>
        </div>
        <div v-if="this.$store.state.today === false">
          <div class="sub_contenus" v-for="(tache, id) in taches" :key="id">
            <div :class="tache.etat==='termine' ? 'ok' : 'sub_contenu' ">
              <button disabled='disabled'>@{{ tache.id }}</button>
              <button :id="tache.id" @click="popup_add" style="border: none; background-color: inherit; cursor: pointer; color: blue;" >{{ tache.nom }} </button>
              <button :id="tache.id" v-if="tache.etat === 'en cours'" @click="Terminer">ok</button>
              <button :id="tache.id" v-if="tache.etat === 'termine'" @click="Rouvrir" style="border-color: green;"><i class="fas fa-check" style="color: green"></i></button>
            </div>
          </div>
        </div>
        <div v-if="this.$store.state.today === true">
          <div class="sub_contenus" v-for="(tache, id) in todayTaches" :key="id">
            <div :class="tache.etat==='termine' ? 'ok' : 'sub_contenu'">
              <button disabled='disabled'>@{{ tache.id }}</button>
              <button :id="tache.id" @click="popup_add" style="border: none; background-color: inherit; cursor: pointer; color: blue;" >{{ tache.nom }} </button>
              <button :id="tache.id" v-if="tache.etat === 'en cours'" @click="Terminer">ok</button>
              <button :id="tache.id" v-if="tache.etat === 'termine'" @click="Rouvrir"><i class="fas fa-check"></i></button>
            </div>
          </div>
        </div>
        <Modal v-if="detail" @close="popup_rm" type='taskDetail' :data="donnees">
          <template v-slot:header>
            <h1>
              Details de la tache <b><u>{{donnees.nom}}</u></b>
            </h1>
          </template>
        </Modal>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import SelfLoading from './SelfLoading.vue'
import Modal from './Modal.vue'
export default {
  components: {
    SelfLoading,
    Modal
  },
  name: 'Task',
  props: ['today'],
  data () {
    return {
      error: false,
      Today: this.$store.state.today,
      taches: this.$store.state.taches,
      todayTaches: this.$store.state.todayTaches,
      loading: false,
      detail: false,
      donnees: {},
      modifs: {}
    }
  },

  mounted () {
    this.error = false
    this.Today = this.$store.state.today
    this.taches = this.$store.state.taches
    this.todayTaches = this.$store.state.todayTaches
    this.loading = false
    this.detail = false
    this.donnees = {}
    this.modifs = {}
  },

  methods: {
    reload (e) {
      this.$store.dispatch('Load_task')
    },
    popup_add: function (e) {
      console.log('pop up')
      let id = e.path[0].id
      for (let t in this.taches) {
        console.log(t)
        console.log(this.taches[t].id)
        if (this.taches[t].id === parseInt(id)) {
          this.donnees = this.taches[t]
        }
      }
      this.detail = true
    },
    popup_rm: function () {
      this.detail = false
    },
    Terminer: function (e) {
      this.loading = true
      let id = e.path[0].id
      for (let index in this.taches) {
        if (this.taches[index].id === parseInt(id)) {
          this.modifs = {}
          this.modifs = this.taches[index]
        }
      }
      this.modifs.etat = 'termine'
      console.log(this.modifs)
      axios.put(this.$store.state.host + 'taches/' + id + '/', this.modifs, {headers: { Authorization: 'Bearer ' + this.$store.state.access }})
        .then(
          (res) => {
            console.log('modif ok')
            this.loading = false
            this.Load_task()
            this.error = false
          }
        ).catch(
          (e) => {
            if (e.response.status === 401) {
              this.auth()
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
    Rouvrir: function (e) {
      this.loading = true
      let id = e.path[1].id
      console.log(id)
      console.log('evenement')
      console.log(e)
      for (let index in this.taches) {
        if (this.taches[index].id === parseInt(id)) {
          this.modifs = {}
          this.modifs = this.taches[index]
        }
      }
      this.modifs.etat = 'en cours'
      console.log(this.modifs)
      axios.put(this.$store.state.host + 'taches/' + id + '/', this.modifs, {headers: { Authorization: 'Bearer ' + this.$store.state.access }})
        .then(
          (res) => {
            console.log('modif ok')
            this.loading = false
            this.Load_task()
          }
        ).catch(
          (e) => {
            if (e.response.status === 401) {
              this.auth()
              this.loading = false
              this.error = true
            } else {
              console.log(e.response)
              this.loading = false
              this.error = true
            }
          }
        )
    }
  }
}
</script>

<style scoped>
.sub_contenus{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
}

.sub_contenu{
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
    border: 5px solid;
    border-color: red;
    border-radius: 10px;
    width: 500px;
    height: 10%;
    margin: 10px;
}

.ok {
    display: flex;
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
    border: 5px solid;
    border-color: green;
    border-radius: 10px;
    width: 500px;
    height: 10%;
    margin: 10px;
}

.sub_contenu button{
   border-radius: 19px;
   background-color: #fff;
}

.ok button{
  border-radius: 19px;
  background-color: #fff;
}

@media only screen and (max-width: 600px){
   .sub_contenu{
      width: 300px;
   }
}
</style>
