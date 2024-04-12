<template>
  <div id="app">
      <demo/>
  </div>
</template>

<script>
import demo from './views/demo.vue'

export default {
  name: 'App',
  components: {
    demo
  }
}
</script>

<style lang="scss">
html {
  height: 100%;
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  background-color: #f3f5fb !important;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
</style>
