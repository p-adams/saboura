<template>
  <div class="hello">
      <app-bar></app-bar>
      <main>
        <v-container>
          <div class="canvas">
            <svg
              id="wb"
              @mousemove="getMousePositionOnCanvas"
              ref="wb"
              width="500"
              height="300"
              style="border:1px solid #81c784; background:white"
            >
            <g>
              <rect
                v-for="(rect, idx) in rectangles"
                @click="selectRectangle(idx)"
                ref="rectangle"
                :key="idx"
                :x="rect.x"
                :y="rect.y"
                :width="rect.width"
                :height="rect.height"
                :fill="rect.fill"
              ></rect>
            </g>
            </svg>
          </div>
        </v-container>
      </main>
  </div>
</template>
<script>
import {DB} from '../firebase'
import AppBar from './AppBar'
export default {
  name: 'main',
  mounted () {
    this.renderMockSVG()
  },
  data () {
    return {
      loggedIn: false,
      rectangleRef: '',
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
    moveRectHandler () {
      this.rectangleRef.setAttribute('transform', `translate(${this.x-100}, ${this.y-100})`)
    },
    selectRectangle (idx) {
      this.rectangleRef = this.$refs.rectangle[idx]
      this.$refs.wb.addEventListener('mousemove', this.moveRectHandler)
      this.$refs.wb.addEventListener('dblclick', e => {
        this.$refs.wb.removeEventListener('mousemove', this.moveRectHandler)
      })
    },
    getMousePositionOnCanvas (e) {
      var mousePos = this.getCoordinates(this.$refs.wb, e);
      this.x = mousePos.x
      this.y = mousePos.y
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
    AppBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .canvas {
    border: 1px solid red;
    margin-top:60px;
  }
  .draggable {
    cursor: move;
  }
</style>

