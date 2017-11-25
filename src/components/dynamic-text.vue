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
import { mapActions } from "vuex";
export default {
  name: "DynamicText",
  props: {
    artifactX: {
      type: Number,
      required: true
    },
    artifactY: {
      type: Number,
      required: true
    },
    artifactText: {
      type: String,
      required: false
    },
    artifactFontFill: {
      type: String,
      required: false
    },
    artifactFontFamily: {
      type: String,
      required: false
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
        this.text.move(prop.x, prop.y);
      }
    });
  },
  data() {
    return {
      draw: "",
      text: "",
      x: this.artifactX,
      y: this.artifactY,
      artText: this.artifactText,
      fontFill: this.artifactFontFill,
      fontFamily: this.artifactFontFamily
    };
  },
  watch: {
    text: function() {
      // handle artifact select
      this.text.on("select", e => {
        this.text.selectize().resize();
      });
      // handle artifact deselect
      this.text.on("deselect", e => {
        this.text.selectize(false);
      });
      this.text.on("dragmove", event => {
        this.x = this.text.node.x.animVal[0].value;
        this.y = this.text.node.y.animVal[0].value;
        this.$firebaseRefs.artifacts
          .child(this.artifactKey)
          .update({ x: this.x, y: this.y });
      });
    }
  },
  methods: {
    select() {
      this.text.fire("select");
    },
    deselect() {
      this.text.fire("deselect");
    },
    initShape() {
      this.text = this.draw.text(this.artText);
      this.text
        .style("cursor", "move")
        .move(this.x, this.y)
        .font({ fill: this.fontFill, family: this.fontFamily });
      this.text.draggable();
    }
  }
};
</script>
<style scoped>

</style>
