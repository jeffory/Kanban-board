<template>
  <div class="modal-mask">
    <div class="modal task-details">
      <button class="icon-button modal-close-button" @click="cancel">
        <icon-close class="icon" />
      </button>

      <header>
        <h2 class="modal-title"><editable :text="task.description"></editable></h2>
        <p class="modal-title-meta" v-text="friendlyDate(task.created)"></p>
      </header>

      <div>
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

<style lang="scss" scoped>
  .modal {
    background-color: #fff;
    border: 1px solid #ddd;
    box-sizing: border-box;
    padding: 1em 4em 1em 2em;
    position: fixed;
    left: 50%;
    top: 20%;
    transform: translate(-50%, -50%);
    width: 600px;
    z-index: 9001;
  }
  .modal-close-button {
    svg {
      fill: lighten(#333, 40%);
    }

    height: 24px;
    margin-top: .75em;
    right: 20px;
    top: 20px;
    position: absolute;
    width: 24px;
  }
  #modal-backdrop {
    background-color: hsla(180, 20, 87%, .7);
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 9000;
  }
  .modal-title {
    margin-bottom: 0;
    margin-top: 0;
  }

  .modal-title-meta {
    color: #888;
    font-size: .8em;
    margin-top: 0;
    padding-left: .6rem;
  }
</style>
