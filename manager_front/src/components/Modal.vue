<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
        </slot>
        <button type="button" class="btn-close" @click="close">
          x
        </button>
      </header>

      <div class="modal-body">
        <TaskForm v-if="choix === 'task'" @close="close"></TaskForm>
        <ProjectForm v-if="choix === 'project'" @close="close"></ProjectForm>
        <TaskDetail v-if="choix === 'taskDetail'" @close="close" :data="Data"></TaskDetail>
        <ProjectDetail v-if="choix === 'ProjectDetail'" @close="close" :data="Data"></ProjectDetail>
      </div>

      <footer class="modal-footer">
        <button type="button" class="btn-green" @click="close">
          Close Modal
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import TaskForm from './TaskForm'
import ProjectForm from './ProjectForm.vue'
import TaskDetail from './TaskDetail.vue'
import ProjectDetail from './ProjectDetail.vue'
export default {
  name: 'Modal',
  props: ['type', 'data'],
  data () {
    return {
      choix: this.type,
      Data: this.data
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  components: {
    TaskForm,
    ProjectForm,
    TaskDetail,
    ProjectDetail
  }
}
</script>

<style>
  .modal-backdrop {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 90%;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    overflow-y: scroll;
    position: relative;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>
