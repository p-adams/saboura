<template>
  <svg
    ref="shape"
    @click.shift="select"
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
export default {
  name: "DynamicEllipse",
  firebase: {
    artifacts: DB.ref("testWB")
  },
  props: {
    artifactCx: {
      type: Number,
      required: true
    },
    artifactCy: {
      type: Number,
      required: true
    },
    artifactRx: {
      type: Number,
      required: true
    },
    artifactRy: {
      type: Number,
      required: true
    },
    artifactTransform: {
      required: true
    },
    artifactFill: {
      type: String,
      default: "#E3F2FD"
    },
    artifactKey: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.draw = svg(this.$refs.shape).size(1000, 1000);
    this.initShape();
  },
  data() {
    return {
      draw: "",
      ellipse: "",
      rx: this.artifactRx,
      ry: this.artifactRy,
      cx: this.artifactCx,
      cy: this.artifactCy,
      transform: this.artifactTransform,
      fill: this.artifactFill
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
      this.ellipse.on("dragmove", event => {
        this.cx = event.detail.event.target.cx.animVal.value;
        this.cy = event.detail.event.target.cy.animVal.value;
        this.$firebaseRefs.artifacts
          .child(this.artifactKey)
          .update({ cx: this.cx, cy: this.cy });
      });
      // handle resize
      this.ellipse.on("resizing", event => {
        this.cx = this.ellipse.node.cx.animVal.value;
        this.cy = this.ellipse.node.cy.animVal.value;

        this.rx = this.ellipse.node.rx.animVal.value;
        this.ry = this.ellipse.node.ry.animVal.value;
        this.$firebaseRefs.artifacts.child(this.artifactKey).update({
          cx: this.cx,
          cy: this.cy,
          rx: this.rx,
          ry: this.ry,
          transform: this.ellipse.transform()
        });
      });
    }
  },
  methods: {
    select() {
      this.ellipse.fire("select");
    },
    deselect() {
      this.ellipse.fire("deselect");
    },
    initShape() {
      this.ellipse = this.draw
        .ellipse(this.rx, this.ry)
        .fill("blue")
        .style("cursor", "move")
        .move(this.cx, this.cy);
      if (this.transform !== undefined) {
        this.ellipse.transform(this.transform);
      }
      this.ellipse.draggable();
    }
  }
};
</script>
<style scoped>

</style>
