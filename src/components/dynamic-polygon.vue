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
  name: "DynamicPolygon",
  mounted() {
    this.draw = svg(this.$refs.shape).size(1000, 1000);
    this.initShape();
    this.polygon.on("dragmove.namespace", function(event) {});
  },
  data() {
    return {
      draw: "",
      polygon: ""
    };
  },
  watch: {
    polygon: function() {
      this.polygon.on("select", e => {
        this.polygon.selectize().resize();
      });
      this.polygon.on("deselect", e => {
        this.polygon.selectize(false);
      });
    }
  },
  methods: {
    ...mapActions(["removeArtifactFromWhiteboard"]),
    select() {
      this.polygon.fire("select");
    },
    deselect() {
      this.polygon.fire("deselect");
    },
    remove() {
      this.draw.clear();
    },
    initShape() {
      this.polygon = this.draw
        .polygon("50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40")
        .fill("none")
        .stroke({ width: 5 })
        .fill("red")
        .style("cursor", "move")
        .move(20, 40);
      this.polygon.draggable();
    }
  }
};
</script>
<style scoped>

</style>
