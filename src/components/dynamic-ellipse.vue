<template>
  <svg
    ref="shape"
    @click.alt="colorBorder"
    @click.meta="fillArtifact"
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
import { mapGetters } from "vuex";
export default {
  name: "DynamicEllipse",
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
        this.ellipse.rx(prop.rx);
        this.ellipse.ry(prop.ry);
        this.ellipse.move(prop.cx, prop.cy);
        this.ellipse.fill(prop.fill);
        this.ellipse.stroke(prop.stroke);
        this.ellipse.transform(prop.transform);
      }
    });
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
    colorBorder() {
      if (this.getBorderColorOption !== "") {
        this.ellipse.stroke(`#${this.getBorderColorOption}`);
        this.$firebaseRefs.artifacts
          .child(this.artifactKey)
          .update({ stroke: `#${this.getBorderColorOption}` });
      }
    },
    fillArtifact() {
      if (this.getArtifactFillOption !== "") {
        this.ellipse.fill(`#${this.getArtifactFillOption}`);
        this.$firebaseRefs.artifacts
          .child(this.artifactKey)
          .update({ fill: `#${this.getArtifactFillOption}` });
      }
    },
    select() {
      this.ellipse.fire("select");
    },
    deselect() {
      this.ellipse.fire("deselect");
    },
    initShape() {
      this.ellipse = this.draw
        .ellipse(this.rx, this.ry)
        .fill(this.artifactFill)
        .stroke("#EA80FC")
        .stroke({ width: 5 })
        .style("cursor", "move")
        .move(this.cx, this.cy);
      if (this.transform !== undefined) {
        this.ellipse.transform(this.transform);
      }
      this.ellipse.draggable();
    }
  },
  computed: {
    ...mapGetters(["getBorderColorOption", "getArtifactFillOption"])
  }
};
</script>
<style scoped>

</style>
