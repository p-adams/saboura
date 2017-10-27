<template>
  <svg
    class="sandbox-toolbar"
    @mousemove="getMousePositionOnCanvas"
    ref="sandbox"
    :width="svgWidth"
    :height="svgHeight"
  >
    <g>
        <rect
            @click="select"
            ref="rect"
            :width="rectWidth"
            :height="rectHeight"
            :x="rectX"
            :y="rectY"
            fill="gray"
        >
        </rect>
         <foreignObject :width="rectWidth" :height="rectHeight">
           <v-btn>meow</v-btn>
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
      rectWidth: "100%",
      rectHeight: "100%",
      toolbarButtons: []
    };
  },
  methods: {
    getMousePositionOnCanvas(event) {},
    getCoordinates(shape, event) {}
  }
};
</script>
<style scoped>
.sandbox-toolbar {
  border: 1px solid red;
}
</style>

