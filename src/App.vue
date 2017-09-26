<template>
  <div id="app">
    <v-app dark>
      <app-bar></app-bar>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
import AppBar from './components/app-bar'
export default {
  name: 'app',
  components: {
    AppBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
