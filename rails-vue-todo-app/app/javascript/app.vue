<template>
  <div id="app">
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>  
    </ul>    
  </div>
</template>

<script>

export default {
  props: ["todos"]
}
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>
