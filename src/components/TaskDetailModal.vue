<template>
  <div class="modal-mask">
    <div class="modal task-details" @keypress.esc="close">
      <button class="icon-button modal-close-button" @click="close">
        <icon-close class="icon" />
      </button>

      <header class="modal-header">
        <h2 class="modal-title">
          <editable :text="editingTask.description" @change="(e) => {editingTask.description = e.text; update()}" :no-newlines="true"></editable>
          </h2>
        <p class="modal-title-meta" v-text="friendlyDate(task.created)"></p>
      </header>

      <div class="modal-content">
        <editable :text="editingTask.details" @change="(e) => {editingTask.details = e.text; update()}" placeholder="Add any task notes here..."></editable>
      </div>

      <div class="modal-controls level">
        <div class="level-left">
          <button class="button is-text" @click="remove">Delete</button>
        </div>

        <div class="level-right">
          <button class="button" @click="updateAndClose">Okay</button>
        </div>
      </div>
    </div>

    <div id="modal-backdrop" @click="updateAndClose"></div>
  </div>
</template>

<script>
import Editable from './Editable.vue'
import moment from 'moment'
import 'moment/locale/en-au'

import IconClose from '../assets/icons/close.svg'

moment.locale('en-au')

export default {
  name: 'TaskDetailModal',
  components: {Editable, IconClose},
  props: ['task'],
  data () {
    return {
      editingTask: this.task
    }
  },
  methods: {
    friendlyDate: (date) => moment(date, 'x').calendar(),
    remove () {
      this.$store.dispatch('removeTask', this.task.id)
      this.$emit('closed')
    },
    update () {
      this.$store.dispatch('updateTask', this.editingTask)
    },
    updateAndClose () {
      this.update()
      this.close()
    },
    close () {
      this.$emit('closed')
    }
  }
}
</script>
