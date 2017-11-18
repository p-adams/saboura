<template>
  <svg
    ref="shape"
    @click.alt="remove"
  ></svg>
</template>
<script>
import svg from "svg.js";
import selectize from "svg.select.js";
import resize from "svg.resize.js";
import draggable from "svg.draggable.js";
import { mapActions } from "vuex";
export default {
  name: "DynamicText",
  mounted() {
    this.draw = svg(this.$refs.shape).size(1000, 1000);
    this.initShape();
    this.text.on("dragmove.namespace", function(event) {});
  },
  data() {
    return {
      draw: "",
      text: ""
    };
  },
  methods: {
    ...mapActions(["removeArtifactFromWhiteboard"]),
    remove() {
      this.draw.clear();
    },
    initShape() {
      this.text = this.draw.text("Colorless green ideas sleep furiously");
      this.text
        .style("cursor", "move")
        .move(20, 40)
        .font({ fill: "#f06", family: "Inconsolata" });
      this.text.draggable();
    }
  }
};
</script>
<style scoped>

</style>
