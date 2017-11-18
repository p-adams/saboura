<template>
  <svg
    ref="shape"
    @click.shift="select"
    @click.alt="remove"
    @dblclick="deselect"
  ></svg>
</template>
<script>
import svg from "svg.js";
import selectize from "svg.select.js";
import resize from "svg.resize.js";
import draggable from "svg.draggable.js";
import { mapActions } from "vuex";
export default {
  name: "DynamicPolyline",
  mounted() {
    this.draw = svg(this.$refs.shape).size(1000, 1000);
    this.initShape();
    this.polyline.on("dragmove.namespace", function(event) {});
  },
  data() {
    return {
      draw: "",
      polyline: ""
    };
  },
  watch: {
    polyline: function() {
      this.polyline.on("select", e => {
        this.polyline.selectize().resize();
      });
      this.polyline.on("deselect", e => {
        this.polyline.selectize(false);
      });
    }
  },
  methods: {
    ...mapActions(["removeArtifactFromWhiteboard"]),
    select() {
      this.polyline.fire("select");
    },
    deselect() {
      this.polyline.fire("deselect");
    },
    remove() {
      this.draw.clear();
    },
    initShape() {
      this.polyline = this.draw
        .polyline("0,0 100,50 50,100")
        .stroke({ width: 5 })
        .fill("brown")
        .style("cursor", "move")
        .move(20, 40);
      this.polyline.draggable();
    }
  }
};
</script>
<style scoped>

</style>
