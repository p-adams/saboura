<template>
  <div class="hello">
      <main>
        <v-container>
          <whiteboard-app v-if="isLoggedIn"></whiteboard-app>
          <welcome-page v-else></welcome-page>
        </v-container>
      </main>
  </div>
</template>
<script>
import WhiteboardApp from './whiteboard-app'
import WelcomePage from './welcome-page'
export default {
  name: 'main',
  data () {
    return {
      loggedIn: false,
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    }
  },
  components: {
    WhiteboardApp,
    WelcomePage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>

