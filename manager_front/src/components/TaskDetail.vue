<template>
    <div>
        <div class="display">
            <div class="form-group">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">projet associe</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroup-sizing-default" :value="nomPorjet" readonly style="background-color: inherit;">
                </div>
            </div>
            <div class="form-group">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">cree le :</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroup-sizing-default" :value="donne.date_creation" readonly style="background-color: inherit;">
                </div>
            </div>
            <div class="form-group">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">description</span>
                </div>
                <textarea type="text" class="form-control" aria-describedby="inputGroup-sizing-default" readonly style="background-color: inherit;" v-model="donne.description"></textarea>
                </div>
            </div>
            <div class="form-group">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">type</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroup-sizing-default" :value="donne.type" readonly style="background-color: inherit;">
                </div>
            </div>
            <div class="form-group">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">priorite</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroup-sizing-default" :value="donne.priorite" readonly style="background-color: inherit;">
                </div>
            </div>
            <div class="form-group">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">duree_estimee</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroup-sizing-default" :value="donne.duree_estimee+' '+donne.unite_duree" readonly style="background-color: inherit;">
                </div>
            </div>
            <div class="form-group">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">jour choisi pour la tache</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroup-sizing-default" :value="donne.jour" readonly style="background-color: inherit;">
                </div>
            </div>
            <div class="form-group">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Deadline</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroup-sizing-default" :value="donne.deadline" readonly style="background-color: inherit;">
                </div>
            </div>
            <div class="form-group">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Etat</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroup-sizing-default" :value="donne.etat" readonly style="background-color: inherit;">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default{
  name: 'TaskDetail',
  props: ['data'],
  data () {
    return {
      donne: this.data,
      nomPorjet: '',
      projets: {}
    }
  },
  mounted () {
    console.log(this.data)
    this.Load_project()
  },
  methods: {
    auth () {
      console.log('refresh')
      axios.post('http://localhost:8000/manager/token/refresh/', {'refresh': this.$store.state.refresh})
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
    Load_project () {
      console.log('requete vers projets')
      axios.get(
        'http://localhost:8000/projet_user/',
        {headers: {
          Authorization: 'Bearer ' + this.$store.state.access
        }}
      ).then(
        (res) => {
          this.projets = res.data
          console.log('obtention des projets succes')
          this.ObtainProjectName()
        }
      ).catch(
        (e) => {
          if (e.response.status === 401) {
            this.auth()
            this.Load_project()
          }
        }
      )
    },
    ObtainProjectName () {
      console.log('debut obtention du nom du projet')
      for (let p in this.projets) {
        if (this.projets[p].id === this.donne.projet) {
          this.nomPorjet = this.projets[p].nom
          console.log('nom du projet obtenu')
        }
      }
    }
  }
}
</script>
