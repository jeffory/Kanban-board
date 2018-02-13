<template>
  <div id="app">
    <h1>My Kanban Board</h1>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Cantarell', sans-serif;
  font-size: 12.5pt;
}
h1 {
  font-family: 'Fjalla One', sans-serif;
  font-size: 3.5em;
  letter-spacing: -3px;
  word-spacing: .1em;
  margin: 0;
  padding: .4em 0 .35em;
  text-align: center;
  text-transform: uppercase;
}
</style>
