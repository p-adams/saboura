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
  name: "DynamicRectangle",
  mounted() {
    this.draw = svg(this.$refs.shape).size(1000, 1000);
    this.initShape();
    this.rect.on("dragmove.namespace", function(event) {});
  },
  data() {
    return {
      draw: "",
      rect: ""
    };
  },
  watch: {
    rect: function() {
      this.rect.on("select", e => {
        this.rect.selectize().resize();
      });
      this.rect.on("deselect", e => {
        this.rect.selectize(false);
      });
    }
  },
  methods: {
    // might need this in the future
    ...mapActions(["removeArtifactFromWhiteboard"]),
    select() {
      this.rect.fire("select");
    },
    deselect() {
      this.rect.fire("deselect");
    },
    remove() {
      // to clear el from parent el
      this.draw.clear();
      // to remove artifact from whiteboard
      // this.removeArtifactFromWhiteboard(this.rect);
    },
    initShape() {
      this.rect = this.draw
        .rect(100, 100)
        .fill("#f06")
        .style("cursor", "move")
        .move(20, 40);
      this.rect.draggable();
    }
  }
};
</script>
<style scoped>

</style>
