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
  name: "DynamicEllipse",
  mounted() {
    this.draw = svg(this.$refs.shape).size(1000, 1000);
    this.initShape();
    this.ellipse.on("dragmove.namespace", function(event) {});
  },
  data() {
    return {
      draw: "",
      ellipse: ""
    };
  },
  watch: {
    ellipse: function() {
      this.ellipse.on("select", e => {
        this.ellipse.selectize().resize();
      });
      this.ellipse.on("deselect", e => {
        this.ellipse.selectize(false);
      });
    }
  },
  methods: {
    ...mapActions(["removeArtifactFromWhiteboard"]),
    select() {
      this.ellipse.fire("select");
    },
    deselect() {
      this.ellipse.fire("deselect");
    },
    remove() {
      this.draw.clear();
    },
    initShape() {
      this.ellipse = this.draw
        .ellipse(200, 100)
        .fill("blue")
        .style("cursor", "move")
        .move(20, 40);
      this.ellipse.draggable();
    }
  }
};
</script>
<style scoped>

</style>
