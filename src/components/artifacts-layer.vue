<template>
  <svg>
    <template v-for="(shape, key) in artifacts">
      <component :key="key" :is="shape"></component>
    </template>
    
  </svg>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ArtifactsLayer",
  data() {
    return {
      shapes: []
    };
  },
  computed: {
    ...mapGetters(["selectedTool"]),
    artifacts() {
      console.log(this.selectedTool);
      switch (this.selectedTool) {
        case "rectangle":
          this.shapes.push(() => import("./dynamic-rectangle"));
          break;
        case "circle":
          this.shapes.push(() => import("./dynamic-circle"));
          break;
        case "ellipse":
          this.shapes.push(() => import("./dynamic-ellipse"));
          break;
        case "line":
          this.shapes.push(() => import("./dynamic-line"));
          break;
        case "polyline":
          this.shapes.push(() => import("./dynamic-polyline"));
          break;
        case "polygon":
          this.shapes.push(() => import("./dynamic-polygon"));
          break;
        case "path":
          this.shapes.push(() => import("./dynamic-path"));
          break;
        case "text":
          this.shapes.push(() => import("./dynamic-text"));
          break;
        default:
          console.log("no dynamic shape to load");
      }
      return this.shapes;
    }
  }
};
</script>
<style scoped>

</style>
