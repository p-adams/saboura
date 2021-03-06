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
  name: "DynamicCircle",
  props: {
    artifactCx: {
      type: Number,
      required: false
    },
    artifactCy: {
      type: Number,
      required: false
    },
    artifactTransform: {
      required: true
    },
    artifactRadius: {
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
        this.circle.radius(prop.radius);
        this.circle.stroke(prop.stroke);
        this.circle.fill(prop.fill);
        this.circle.move(prop.cx, prop.cy);
        this.circle.transform(prop.transform);
      }
    });
  },
  data() {
    return {
      draw: "",
      circle: "",
      cx: this.artifactCx,
      cy: this.artifactCy,
      transform: this.artifactTransform,
      radius: this.artifactRadius,
      fill: this.artifactFill
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
      // handle move
      this.circle.on("dragmove", event => {
        this.cx = event.detail.event.target.cx.animVal.value;
        this.cy = event.detail.event.target.cy.animVal.value;
        this.$firebaseRefs.artifacts.child(this.artifactKey).update({
          cx: this.cx,
          cy: this.cy
        });
      });
      // handle resize
      this.circle.on("resizing", event => {
        this.cx = this.circle.node.cx.animVal.value;
        this.cy = this.circle.node.cy.animVal.value;
        this.radius = this.circle.node.r.animVal.value;
        this.$firebaseRefs.artifacts.child(this.artifactKey).update({
          radius: this.radius,
          cx: this.cx,
          cy: this.cy,
          transform: this.circle.transform()
        });
      });
    }
  },
  methods: {
    colorBorder() {
      if (this.getBorderColorOption !== "") {
        this.circle.stroke(`#${this.getBorderColorOption}`);
        this.$firebaseRefs.artifacts
          .child(this.artifactKey)
          .update({ stroke: `#${this.getBorderColorOption}` });
      }
    },
    fillArtifact() {
      if (this.getArtifactFillOption !== "") {
        this.circle.fill(`#${this.getArtifactFillOption}`);
        this.$firebaseRefs.artifacts
          .child(this.artifactKey)
          .update({ fill: `#${this.getArtifactFillOption}` });
      }
    },
    select() {
      this.circle.fire("select");
    },
    deselect() {
      this.circle.fire("deselect");
    },
    initShape() {
      this.circle = this.draw
        .circle(this.radius)
        .fill(this.fill)
        .stroke({ width: 5 })
        .stroke("#FFC107")
        .style("cursor", "move")
        .move(this.cx, this.cy);

      if (this.transform !== undefined) {
        this.circle.transform(this.transform);
      }
      this.circle.draggable();
    }
  },
  computed: {
    ...mapGetters(["getBorderColorOption", "getArtifactFillOption"])
  }
};
</script>
<style scoped>

</style>
