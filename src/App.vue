<template>
  <div id="app">
    <v-app dark>
      <app-bar></app-bar>
      <div class="router-view">
        <v-container>
          <v-layout>
            <v-flex>
              <transition name="slide-fade" mode="out-in">
              <router-view></router-view>
              </transition>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
      
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
.slide-fade-enter-active {
  transition: all 0.9s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
