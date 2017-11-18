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
    this.path.on("dragmove.namespace", function(event) {});
  },
  data() {
    return {
      draw: "",
      path: ""
    };
  },
  watch: {
    path: function() {
      this.path.on("select", e => {
        this.path.selectize().resize();
      });
      this.path.on("deselect", e => {
        this.path.selectize(false);
      });
    }
  },
  methods: {
    ...mapActions(["removeArtifactFromWhiteboard"]),
    select() {
      this.path.fire("select");
    },
    deselect() {
      this.path.fire("deselect");
    },
    remove() {
      this.draw.clear();
    },
    initShape() {
      this.path = this.draw
        .path("M0 0 H50 A20 20 0 1 0 100 50 v25 C50 125 0 85 0 85 z")
        .fill("none");
      this.path
        .stroke({
          color: "#f06",
          width: 4,
          linecap: "round",
          linejoin: "round"
        })
        .style("cursor", "move")
        .move(20, 40);
      this.path.draggable();
    }
  }
};
</script>
<style scoped>

</style>
