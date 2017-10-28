<template>
        <svg
            class="wb"
            @mousemove="getMousePositionOnCanvas"
            ref="wb"
            width="500"
            height="300"
        >
            <g>
                <rect
                  class="draggable"
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
</template>
<script>
import { DB } from "../firebase";
export default {
  name: "DrawingBoard",
  mounted() {
    this.renderMockSVG();
  },
  data() {
    return {
      loggedIn: false,
      rectangleRef: "",
      rx: 0,
      ry: 0,
      rectangles: [{ x: 200, y: 10, width: 20, height: 20, fill: "green" }]
    };
  },
  methods: {
    renderMockSVG() {
      DB.ref("WhiteBoards").on("value", snapshot => {
        let artifact = snapshot.val().mockWB;
        this.rectangles.push({
          x: artifact.x,
          y: artifact.y,
          width: artifact.width,
          height: artifact.height,
          fill: artifact.fillStyle
        });
      });
    },
    moveRectHandler() {
      const xPos = this.rectangleRef.x.animVal.value;
      const yPos = this.rectangleRef.y.animVal.value;
      this.rectangleRef.setAttribute(
        "transform",
        `translate(${this.x - xPos}, ${this.y - yPos})`
      );
    },
    selectRectangle(idx) {
      this.rectangleRef = this.$refs.rectangle[idx];
      this.$refs.wb.addEventListener("mousemove", this.moveRectHandler);
      this.$refs.wb.addEventListener("dblclick", e => {
        this.$refs.wb.removeEventListener("mousemove", this.moveRectHandler);
      });
    },
    getMousePositionOnCanvas(e) {
      var mousePos = this.getCoordinates(this.$refs.wb, e);
      this.x = mousePos.x;
      this.y = mousePos.y;
    },
    getCoordinates(canvas, evt) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wb {
  background: white;
}
</style>


