<template>
  <div class="hello">
      <toolbar></toolbar>
      <main>
        <v-container>
          <div class="canvas">
            <canvas
              id="wb"
              ref="wb"
              width="500"
              height="300"
              style="border:1px solid #81c784; background:#81c784"
            >
            </canvas>
          </div>
        </v-container>
      </main>
  </div>
</template>

<script>
//import socket from '../socket.js'
import {DB} from '../firebase'
import Toolbar from './Toolbar'
export default {
  name: 'main',
  mounted () {
    this.ctx = wb.getContext('2d')
    this.renderMockSVG()
  },
  data () {
    return {
      ctx: '',
      loggedIn: false
    }
  },
  methods: {
    renderMockSVG () {
      DB.ref('WhiteBoards').on('value', snapshot => {
          let artifact = snapshot.val().mockWB
          this.ctx.fillRect(artifact.x, artifact.y, artifact.width, artifact.height)
          this.ctx.fillStyle = artifact.fillStyle
        })
    }
  },
  components: {
    Toolbar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .canvas {
    margin-top:60px;
  }
</style>

