<template>
  <div class="task-details">
    <input type="text" class="input" v-model="task.description">
  </div>
</template>

<script>
export default {
  name: 'TaskItem',
  props: ['task'],
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  
</style>
