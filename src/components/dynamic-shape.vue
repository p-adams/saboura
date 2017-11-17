<template>
  <svg v-resize>

  </svg>
</template>
<script>
import svg from "svg.js";
import resize from "svg.resize.js";
import select from "svg.select.js";
import draggable from "svg.draggable.js";
export default {
  name: "DynamicShape",
  directives: {
    resize: {
      inserted: function(el, bindings) {
        const draw = svg(el).size(800, 800);
        const rect = draw.rect(100, 100).fill("blue");
        rect.draggable();
        rect.on("dragmove.namespace", function(event) {
          console.log(event.detail.p);
        });
      }
    }
  }
};
</script>
<style scoped>

</style>
