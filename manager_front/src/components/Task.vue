<template>
    <div>
    <SelfLoading v-if="loading"></SelfLoading>
      <button class="btn btn-primary" @click="Load_task">reload</button>
      <div class="sub_contenus" v-for="tache in taches" :key="tache">
        <div class="sub_contenu">
          <button disabled='disabled'>@{{ tache.id }}</button>
          <button :id="tache.id" @click="popup_add" style="border: none; background-color: inherit; cursor: pointer; color: blue;" >{{ tache.nom }} </button>
          <button>ok</button>
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
  data () {
    return {
      taches: {},
      loading: false,
      detail: false,
      donnees: {}
    }
  },
  mounted () {
    this.Load_task()
  },
  methods: {
    auth () {
      axios.post('http://localhost:8000/manager/token/refresh/', {'refresh': this.$store.state.refresh})
        .then(
          (res) => {
            console.log(res.data)
            this.$store.state.access = res.data.access
            this.Load_task()
          }
        ).catch(
          (e) => {
            if (e.response.status === 400) {
              this.$router.push('/signin')
            }
          }
        )
    },
    Load_task () {
      this.loading = true
      console.log('requete vers taches')
      axios.get(
        'http://localhost:8000/taches_user/',
        {headers: {
          Authorization: 'Bearer ' + this.$store.state.access
        }}
      ).then(
        (res) => {
          this.taches = res.data
          console.log(this.taches)
          console.log('obtention des taches succes')
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
      this.Load_task()
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
    border-color: #000;
    border-radius: 10px;
    width: 500px;
    height: 10%;
    margin: 10px;
}

.sub_contenu button{
   border-radius: 19px;
}

@media only screen and (max-width: 600px){
   .sub_contenu{
      width: 300px;
   }
}
</style>
