<template>
  <svg
    ref="shape"
    @click.shift="select"
    @click.alt="remove"
    @dblclick="deselect"
  ></svg>
</template>
<script>
import { DB } from "../firebase";
import firebase from "firebase";
import svg from "svg.js";
import selectize from "svg.select.js";
import resize from "svg.resize.js";
import draggable from "svg.draggable.js";
import { mapActions } from "vuex";
export default {
  name: "DynamicRectangle",
  props: {
    rectX: {
      type: Number,
      required: true
    },
    rectY: {
      type: Number,
      required: true
    },
    rectWidth: {
      type: Number,
      required: true
    },
    rectHeight: {
      type: Number,
      required: true
    },
    rectFill: {
      type: String,
      default: "#E3F2FD"
    },
    itemKey: {
      type: String
    }
  },
  mounted() {
    console.log(this.itemKey);
    this.draw = svg(this.$refs.shape).size(1000, 1000);
    this.initShape();
    this.rect.on("dragmove.namespace", function(event) {});
  },
  firebase: {
    artifacts: DB.ref("testWB")
  },
  data() {
    return {
      draw: "",
      rect: "",
      x: this.rectX,
      y: this.rectY,
      width: this.rectWidth,
      height: this.rectHeight,
      fill: this.rectFill
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
    ...mapActions(["removeArtifactFromWhiteboard"]),
    select() {
      this.rect.fire("select");
    },
    deselect() {
      this.rect.fire("deselect");
    },
    remove() {
      this.$firebaseRefs.artifacts.child(this.itemKey).remove();
    },
    initShape() {
      this.rect = this.draw
        .rect(this.width, this.height)
        .fill(this.fill)
        .style("cursor", "move")
        .move(this.x, this.y);
      this.rect.draggable();
    }
  }
};
</script>
<style scoped>

</style>
