<template>
  <div>
    <!-- <Accueil></Accueil> -->
    <router-view/>
  </div>
</template>

<script>
import Accueil from './components/accueil'
import Signin from './components/Signin'
export default {
  name: 'App',
  components: {
    Accueil,
    Signin
  }
}
</script>

<style>
</style>
