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
  name: "DynamicCircle",
  mounted() {
    this.draw = svg(this.$refs.shape).size(1000, 1000);
    this.initShape();
    this.circle.on("dragmove.namespace", function(event) {});
  },
  data() {
    return {
      draw: "",
      circle: ""
    };
  },
  watch: {
    circle: function() {
      this.circle.on("select", e => {
        this.circle.selectize().resize();
      });
      this.circle.on("deselect", e => {
        this.circle.selectize(false);
      });
    }
  },
  methods: {
    ...mapActions(["removeArtifactFromWhiteboard"]),
    select() {
      this.circle.fire("select");
    },
    deselect() {
      this.circle.fire("deselect");
    },
    remove() {
      this.draw.clear();
    },
    initShape() {
      this.circle = this.draw
        .circle(100)
        .fill("purple")
        .style("cursor", "move")
        .move(20, 40);
      this.circle.draggable();
    }
  }
};
</script>
<style scoped>

</style>
