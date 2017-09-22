<template>
  <div class="hello">
      <toolbar></toolbar>
      <main>
        <v-container>
          <div class="canvas">
            <svg
              id="wb"
              ref="wb"
              width="500"
              height="300"
              style="border:1px solid #81c784; background:#81c784"
            >
            <g>
              <rect v-for="(rect, idx) in rectangles" :key="idx"
                :x="rect.x"
                :y="rect.y"
                :width="rect.width"
                :height="rect.height"
                :fill="rect.fill"
                @click="selectRect(idx)"
              >
              </rect>
            </g>
            </svg>
          </div>
        </v-container>
      </main>
  </div>
</template>
<script>
import {DB} from '../firebase'
import Toolbar from './Toolbar'
export default {
  name: 'main',
  mounted () {
    this.renderMockSVG()
  },
  data () {
    return {
      canvas: '',
      ctx: '',
      loggedIn: false,
      rectangles: []
    }
  },
  methods: {
    renderMockSVG () {
      DB.ref('WhiteBoards').on('value', snapshot => {
          let artifact = snapshot.val().mockWB
          this.rectangles.push(
            {
              x: artifact.x,
              y: artifact.y,
              width: artifact.width,
              height: artifact.height,
              fill: artifact.fillStyle
            }
          )
        })
    },
    selectRect (idx) {
      let rect = this.rectangles[idx]
      rect.fill = 'purple'
      console.log(rect)
    },
    getMousePositionOnCanvas (e) {
      var mousePos = this.getCoordinates(this.canvas, e);
      console.log(`Mouse position: ${mousePos.x} , ${mousePos.y}`);
    },
    getCoordinates (canvas, evt) {
      const rect = canvas.getBoundingClientRect()
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      }
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

