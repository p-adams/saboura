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
  name: "DynamicRectangle",
  props: {
    artifactX: {
      type: Number,
      required: true
    },
    artifactY: {
      type: Number,
      required: true
    },
    artifactTransform: {
      required: true
    },
    artifactWidth: {
      type: Number,
      required: false
    },
    artifactHeight: {
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
    this.draw = svg(this.$refs.shape).size(2000, 1000);
    this.initArtifact();
    DB.ref(
      `mockWhiteboards/${this.whiteboardId}/artifacts/${this.artifactKey}`
    ).on("value", snapshot => {
      if (snapshot.val()) {
        let prop = snapshot.val();
        this.rect.width(prop.width);
        this.rect.height(prop.height);
        this.rect.stroke(prop.stroke);
        this.rect.fill(prop.fill);
        this.rect.move(prop.x, prop.y);
        this.rect.transform(prop.transform);
      }
    });
  },
  data() {
    return {
      draw: "",
      rect: "",
      x: this.artifactX,
      y: this.artifactY,
      width: this.artifactWidth,
      height: this.artifactHeight,
      fill: this.artifactFill,
      transform: this.artifactTransform
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
      this.rect.on("dragmove", event => {
        const x = event.detail.event.target.x.animVal.value;
        const y = event.detail.event.target.y.animVal.value;
        this.$firebaseRefs.artifacts.child(this.artifactKey).update({ x, y });
      });
      this.rect.on("resizing", event => {
        this.width = this.rect.node.width.animVal.value;
        this.height = this.rect.node.height.animVal.value;
        this.$firebaseRefs.artifacts.child(this.artifactKey).update({
          width: this.width,
          height: this.height,
          transform: this.rect.transform()
        });
      });
    }
  },
  methods: {
    colorBorder() {
      if (this.getBorderColorOption !== "") {
        this.rect.stroke(`#${this.getBorderColorOption}`);
        this.$firebaseRefs.artifacts
          .child(this.artifactKey)
          .update({ stroke: `#${this.getBorderColorOption}` });
      }
    },
    fillArtifact() {
      if (this.getArtifactFillOption !== "") {
        this.rect.fill(`#${this.getArtifactFillOption}`);
        this.$firebaseRefs.artifacts
          .child(this.artifactKey)
          .update({ fill: `#${this.getArtifactFillOption}` });
      }
    },
    select() {
      this.rect.fire("select");
    },
    deselect() {
      this.rect.fire("deselect");
    },
    // handle initial rendering
    initArtifact() {
      this.rect = this.draw
        .rect(this.width, this.height)
        .fill("none")
        .stroke({ width: 5 })
        .stroke("#5C6BC0")
        .style("cursor", "move")
        .move(this.x, this.y);
      if (this.transform !== undefined) {
        this.rect.transform(this.transform);
      }
      this.rect.draggable();
    }
  },
  computed: {
    ...mapGetters(["getBorderColorOption", "getArtifactFillOption"])
  }
};
</script>
<style scoped>

</style>
