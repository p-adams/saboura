<template>
  <svg
    class="sandbox-toolbar"
    @mousemove="getMousePositionOnCanvas"
    ref="sb"
    :width="svgWidth"
    :height="svgHeight"
  >
    <g>
        <rect
            class="draggable"
            @click="selectRectangle"
            ref="rectangle"
            :width="rectWidth"
            :height="rectHeight"
            :x="rectX"
            :y="rectY"
            fill="gray"
        >
        </rect>
        <foreignObject ref="text" width="200px" height="500px" x="20" y="50">
          <div class="btn-col">
            <v-btn>draw</v-btn>
            <v-btn>rectangle</v-btn>
            <v-btn>circle</v-btn>
            <v-btn>ellipse</v-btn>
            <v-btn>line</v-btn>
            <v-btn>polyline</v-btn>
            <v-btn>polygon</v-btn>
            <v-btn>path</v-btn>
             <v-btn>save</v-btn>
          </div>
        </foreignObject>
    </g>
  </svg>
</template>
<script>
export default {
  name: "SandboxToolbar",
  data() {
    return {
      svgWidth: 400,
      svgHeight: 600,
      rectWidth: "50%",
      rectHeight: "500",
      rectX: 20,
      rectY: 20,
      toolbarButtons: [],
      x: "",
      y: "",
      rectangleRef: ""
    };
  },
  methods: {
    moveRectHandler() {
      const xPos = this.rectangleRef.x.animVal.value;
      const yPos = this.rectangleRef.y.animVal.value;
      this.rectangleRef.setAttribute(
        "transform",
        `translate(${this.x - xPos}, ${this.y - yPos})`
      );

      this.$refs.text.setAttribute(
        "transform",
        `translate(${this.x - xPos}, ${this.y - yPos})`
      );
    },
    selectRectangle() {
      this.rectangleRef = this.$refs.rectangle;
      console.log(this.rectangleRef);
      this.$refs.sb.addEventListener("mousemove", this.moveRectHandler);
      this.$refs.sb.addEventListener("dblclick", e => {
        this.$refs.sb.removeEventListener("mousemove", this.moveRectHandler);
      });
    },
    getMousePositionOnCanvas(event) {
      const mousePos = this.getCoordinates(this.$refs.sb, event);
      this.x = mousePos.x;
      this.y = mousePos.y;
    },
    getCoordinates(shape, event) {
      const rect = shape.getBoundingClientRect();
      return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
  }
};
</script>
<style scoped>
.sandbox-toolbar {
  border: 1px solid red;
}
.draggable {
  cursor: pointer;
}
.btn-col {
  border: 1px solid red;
}
</style>

