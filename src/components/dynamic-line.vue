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
  name: "DynamicLine",
  props: {
    artifactX: {
      type: Number,
      required: true
    },
    artifactY: {
      type: Number,
      required: true
    },
    artifactX1: {
      type: Number,
      required: true
    },
    artifactX2: {
      type: Number,
      required: true
    },
    artifactY1: {
      type: Number,
      required: true
    },
    artifactY2: {
      type: Number,
      required: true
    },
    artifactTransform: {
      required: true
    },
    artifactStrokeWidth: {
      type: Number,
      required: false
    },
    artifactFill: {
      type: String,
      default: "#E3F2FD"
    },
    artifactKey: {
      type: String,
      required: true
    },
    whiteboardId: {
      type: String,
      required: false
    }
  },
  created() {
    this.$bindAsArray(
      "artifacts",
      DB.ref(`mockWhiteboards/${this.whiteboardId}/artifacts`)
    );
  },
  mounted() {
    this.draw = svg(this.$refs.shape).size(1750, 1000);
    this.initShape();
    DB.ref(
      `mockWhiteboards/${this.whiteboardId}/artifacts/${this.artifactKey}`
    ).on("value", snapshot => {
      if (snapshot.val()) {
        let prop = snapshot.val();
        this.line.plot(prop.x1, prop.y1, prop.x2, prop.y2);
        this.line.move(prop.cx, prop.cy);
        this.line.transform(prop.transform);
      }
    });
  },
  data() {
    return {
      draw: "",
      line: "",
      x: this.artifactX,
      y: this.artifactY,
      x1: this.artifactX1,
      x2: this.artifactX2,
      y1: this.artifactY1,
      y2: this.artifactY2,
      transform: this.artifactTransform,
      fill: this.artifactFill,
      stroke: this.artifactStrokeWidth
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
      // handle drag
      this.line.on("dragmove", event => {
        this.x1 = event.detail.event.target.x1.animVal.value;
        this.x2 = event.detail.event.target.x2.animVal.value;
        this.y1 = event.detail.event.target.y1.animVal.value;
        this.y2 = event.detail.event.target.y2.animVal.value;
        this.$firebaseRefs.artifacts
          .child(this.artifactKey)
          .update({ x1: this.x1, y1: this.y1, x2: this.x2, y2: this.y2 });
      });
      // handle resize
      this.line.on("resizing", event => {
        this.x1 = this.line.node.x1.animVal.value;
        this.x2 = this.line.node.x2.animVal.value;
        this.y1 = this.line.node.y1.animVal.value;
        this.y2 = this.line.node.y2.animVal.value;
        this.$firebaseRefs.artifacts.child(this.artifactKey).update({
          x1: this.x1,
          y1: this.y1,
          x2: this.x2,
          y2: this.y2,
          transform: this.line.transform()
        });
      });
    }
  },
  methods: {
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
        .line(this.x1, this.y1, this.x2, this.y2)
        .stroke({ width: this.stroke })
        .stroke(this.artifactFill)
        .style("cursor", "move")
        .move(this.x1, this.y1);
      if (this.transform !== undefined) {
        this.line.transform(this.transform);
      }
      this.line.draggable();
    }
  }
};
</script>
<style scoped>

</style>
