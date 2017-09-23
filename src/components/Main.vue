<template>
  <div class="hello">
      <main>
        <v-container>
          <whiteboard-app></whiteboard-app>
        </v-container>
      </main>
  </div>
</template>
<script>
import WhiteboardApp from './WhiteboardApp'
export default {
  name: 'main',
  data () {
    return {
      loggedIn: false,
    }
  },
  components: {
    WhiteboardApp
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>

