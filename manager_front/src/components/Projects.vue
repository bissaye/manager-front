<template>
    <div>
      <SelfLoading v-if="loading"></SelfLoading>
      <button class="btn btn-primary" @click="Load_project">reload</button>
      <div class="sub_contenus" v-for="projet in projets" :key="projet">
        <div class="sub_contenu">
          <button disabled='disabled'>{{ projet.id }}</button>
          <a href="#">{{ projet.nom }}</a>
          <button>ok</button>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import SelfLoading from './SelfLoading.vue'
export default {
  components: { SelfLoading },
  name: 'Projects',
  data () {
    return {
      projets: {},
      loading: false
    }
  },
  mounted () {
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
            this.Load_project()
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
      this.loading = true
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
