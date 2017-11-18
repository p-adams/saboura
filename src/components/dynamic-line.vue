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
  name: "DynamicLine",
  mounted() {
    this.draw = svg(this.$refs.shape).size(1000, 1000);
    this.initShape();
    this.line.on("dragmove.namespace", function(event) {});
  },
  data() {
    return {
      draw: "",
      line: ""
    };
  },
  watch: {
    line: function() {
      this.line.on("select", e => {
        this.line.selectize().resize();
      });
      this.line.on("deselect", e => {
        this.line.selectize(false);
      });
    }
  },
  methods: {
    ...mapActions(["removeArtifactFromWhiteboard"]),
    select() {
      this.line.fire("select");
    },
    deselect() {
      this.line.fire("deselect");
    },
    remove() {
      this.draw.clear();
    },
    initShape() {
      this.line = this.draw
        .line(0, 0, 100, 150)
        .stroke({ width: 10 })
        .fill("green")
        .style("cursor", "move")
        .move(20, 40);
      this.line.draggable();
    }
  }
};
</script>
<style scoped>

</style>
