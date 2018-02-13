<template>
  <div class="task-item">
    <span v-text="item.description"></span>
  </div>
</template>

<script>
import Editable from './Editable.vue'

export default {
  name: 'TaskItem',
  props: ['item'],
  components: {Editable}
}
</script>

<style lang="scss" scoped>
  .task-item {
    background-color: rgb(252, 249, 233);
    border: 1px solid #eee;
    box-shadow: 0 0 5px 0 rgba(125,125,125,0.15);
    cursor: pointer;
    margin-bottom: 1em;
    padding: 1em 2em;
  }

  .sortable-chosen {
    border-color: #dbf5ff;
    box-shadow: 0 0 5px 0 rgba(18, 128, 168, .5);
  }
</style>
