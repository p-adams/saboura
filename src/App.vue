<template>
  <div id="app">
    <v-app dark>
      <app-bar></app-bar>
      <div class="router-view">
        <v-container>
          <v-layout>
            <v-flex>
              <router-view></router-view>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
      <v-footer class="pa-3">
        <v-spacer></v-spacer>
        <div>© {{ new Date().getFullYear() }}</div>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import AppBar from "./components/app-bar";
export default {
  name: "app",
  components: {
    AppBar
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: inline-block;
  width: 100%;
}
.router-view {
  margin-top: 60px;
}
</style>
