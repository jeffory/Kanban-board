<template>
  <div class="modal-mask">
    <div class="modal task-details">
      <button class="icon-button modal-close-button" @click="cancel">
        <icon-close class="icon" />
      </button>

      <header class="modal-header">
        <h2 class="modal-title"><editable :text="task.description"></editable></h2>
        <p class="modal-title-meta" v-text="friendlyDate(task.created)"></p>
      </header>

      <div class="modal-content">
        <editable :text="task.details" placeholder="Add any task notes here..."></editable>
      </div>
    </div>

    <div id="modal-backdrop" @click="cancel"></div>
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
    return {}
  },
  methods: {
    friendlyDate: (date) => moment(date, 'x').calendar(),
    cancel () {
      this.$emit('cancelled')
    }
  }
}
</script>
