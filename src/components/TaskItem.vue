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
    background-color: $task-item-bg-color;
    border: 1px solid $white-3;
    box-shadow: 0 0 5px 0 transparentize($grey-4, 0.85);
    cursor: pointer;
    margin-bottom: 1em;
    padding: 1em 2em;
  }

  .sortable-chosen {
    border-color: $highlighted-border-color;
    box-shadow: 0 0 5px 0 $highlighted-shadow-color;
  }
</style>
