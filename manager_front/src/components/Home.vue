<template>
    <div class="home">
        <header class="home_header">
            <router-link to="/" class="navbar-brand"><img src="../assets/img/logo.png" height="100"></router-link>
            <a href="#" @click="this.select_tache" :class="task_selected">tasks</a>
            <a href="#" @click="this.select_projet" :class="project_selected">projects</a>
            <router-link to="/" class="navbar-brand"><img src="../assets/img/avatar.png" height="100"></router-link>
        </header>
        <div class="contenus">
            <div class="form-group row " style="display: flex; flex-direction: row; justify-content: space-between; width: 500px;">
              <button @click="this.popup_add" class="form-control col" >add</button>
              <button @click="this.NotAll" class="form-control col selected" id="inputGroup-sizing-default" :style="today_selected">today</button>
              <button @click="this.All" class="form-control col selected" id="inputGroup-sizing-default" :style="all_selected">all </button>
            </div>

            <Modal v-if="popup_add_task" @close="popup_rm" type='task'>
                <template v-slot:header>
                  <h1>
                    Add task
                  </h1>
                </template>
            </Modal>
            <Modal v-if="popup_add_project" @close="popup_rm" type='project'>
                <template v-slot:header>
                  <h1>
                    Add Project
                  </h1>
                </template>
            </Modal>
            <Task v-if="tasks"></Task>
            <Projects v-if="project"></Projects>
        </div>
    </div>
</template>

<script>
import Task from './Task'
import Projects from './Projects'
import Modal from './Modal'

export default {
  name: 'Home',
  data () {
    return {
      tasks: true,
      project: false,
      new_task: '',
      popup_add_task: false,
      popup_add_project: false
    }
  },
  components: {
    Task,
    Projects,
    Modal
  },
  mounted () {
    if (!this.$store.state.logged) {
      this.$router.push('/signin')
    }
  },
  methods: {
    NotAll: function (e) {
      console.log('toutes du jour')
      this.$store.state.today = true
    },
    All: function (e) {
      console.log('toutes les taches')
      this.$store.state.today = false
    },
    popup_add: function (e) {
      console.log('pop up')
      this.popup_add_task = this.tasks
      this.popup_add_project = this.project
    },
    popup_rm: function () {
      console.log('pop up close')
      this.popup_add_task = false
      this.popup_add_project = false
    },
    select_tache: function (e) {
      console.log('tache')
      this.tasks = true
      this.project = false
    },

    select_projet: function (e) {
      console.log('projet')
      this.tasks = false
      this.project = true
    }
  },
  computed: {
    task_selected: function () {
      if (this.tasks) {
        return 'selected'
      }
      return ''
    },

    project_selected: function () {
      if (this.project) {
        return 'selected'
      }
      return ''
    },
    today_selected: function () {
      if (this.$store.state.today) {
        return 'border-bottom: 4px solid rgb(218, 134, 134) ; border-left: 4px solid rgb(218, 134, 134) ; border-right: 4px solid rgb(218, 134, 134) ;'
      } else {
        return ''
      }
    },
    all_selected: function () {
      if (this.$store.state.today) {
        return ''
      } else {
        return 'border-bottom: 4px solid rgb(218, 134, 134); border-left: 4px solid rgb(218, 134, 134) ; border-right: 4px solid rgb(218, 134, 134) ;'
      }
    }
  }
}
</script>

<style>
.home{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.home_header{
    background: rgb(0, 0, 0);
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100px;
}

.home_header a{
    background: none;
    border-width: 0px 0px 0px 0px;
    font-family: Arial;
    color: white;
    font-weight: bold;
    text-decoration: none;
}

.home_header .selected{
  border-bottom: 4px solid rgb(218, 134, 134) ;
}

.contenus{
    margin-top: 105px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

</style>
