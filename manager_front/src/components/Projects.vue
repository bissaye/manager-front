<template>
    <div>
      <SelfLoading v-if="loading"></SelfLoading>
      <button class="btn btn-primary" @click="reload">reload</button>
      <div class="sub_contenus" v-for="(projet, id) in projets" :key="id">
        <div class="sub_contenu">
          <button disabled='disabled'>{{ projet.id }}</button>
          <button :id="projet.id" @click="popup_add" style="border: none; background-color: inherit; cursor: pointer; color: blue;" >{{ projet.nom }}</button>
          <button>ok</button>
        </div>
      </div>
      <Modal v-if="detail" @close="popup_rm" type='ProjectDetail' :data="donnees">
        <template v-slot:header>
          <h1>
            Details du projet <b><u>{{donnees.nom}}</u></b>
          </h1>
        </template>
      </Modal>
    </div>
</template>

<script>
import SelfLoading from './SelfLoading.vue'
import Modal from './Modal.vue'
export default {
  components: {
    SelfLoading,
    Modal
  },
  name: 'Projects',
  data () {
    return {
      projets: this.$store.state.projets,
      loading: false,
      detail: false,
      donnees: {}
    }
  },

  mounted () {
    this.projets = this.$store.state.projets
    this.loading = false
    this.detail = false
    this.donnees = {}
  },

  methods: {
    reload (e) {
      this.$store.dispatch('Load_project')
    },
    popup_add: function (e) {
      console.log('pop up')
      let id = e.path[0].id
      for (let p in this.projets) {
        console.log(p)
        console.log(this.projets[p].id)
        if (this.projets[p].id === parseInt(id)) {
          this.donnees = this.projets[p]
        }
      }
      this.detail = true
    },
    popup_rm: function () {
      this.detail = false
    }
  }
}
</script>

<style>
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
