<template>
   <div>
       <div class="display">
            <div class="form-group">
                <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">cree le :</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroup-sizing-default" :value="donne.date_joined" readonly style="background-color: inherit;">
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
                    <span class="input-group-text" id="inputGroup-sizing-default">Etat</span>
                </div>
                <input type="text" class="form-control" aria-describedby="inputGroup-sizing-default" :value="donne.etat" readonly style="background-color: inherit;">
                </div>
            </div>
        </div>
   </div>
</template>

<script>
export default {
  name: 'ProjectDetail',
  props: ['data'],
  data () {
    return {
      donne: this.data
    }
  },
  mounted () {
    console.log(this.data)
  }
}
</script>
