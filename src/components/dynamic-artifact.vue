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
  name: "DynamicArtifact",
  firebase: {
    artifacts: DB.ref("testWB")
  },
  props: {
    artifactX: {
      type: Number,
      required: true
    },
    artifactY: {
      type: Number,
      required: true
    },
    artifactCx: {
      type: Number,
      required: false
    },
    artifactCy: {
      type: Number,
      required: false
    },
    artifactRx: {
      type: Number,
      required: false
    },
    artifactRy: {
      type: Number,
      required: false
    },
    artifactWidth: {
      type: Number,
      required: false
    },
    artifactHeight: {
      type: Number,
      required: false
    },
    artifactRadius: {
      type: Number,
      required: false
    },
    artifactFill: {
      type: String,
      default: "#E3F2FD"
    },
    artifactStroke: {
      type: Object,
      required: false
    },
    artifactLineCoords: {
      type: Object,
      required: false
    },
    artifactPoints: {
      type: String,
      required: false
    },
    artifactPolyString: {
      type: String,
      required: false
    },
    artifactPathString: {
      type: String,
      required: false
    },
    artifactText: {
      type: String,
      required: false
    },
    artifactFont: {
      type: Object,
      required: false
    },
    artifactKey: {
      type: String,
      required: true
    },
    artifactType: {
      type: String,
      required: true
    }
  },
  mounted() {
    this.draw = svg(this.$refs.shape).size(1000, 1000);
    this.initArtifact();
  },
  data() {
    return {
      draw: "",
      artifact: "",
      x: this.artifactX,
      y: this.artifactY,
      cx: this.artifactCx,
      cy: this.artifactCy,
      rx: this.artifactRx,
      ry: this.artifactRy,
      radius: this.artifactRadius,
      width: this.artifactWidth,
      height: this.artifactHeight,
      fill: this.artifactFill,
      stroke: this.artifactStroke,
      polyString: this.artifactPolyString,
      points: this.artifactPoints,
      line: this.artifactLineCoords,
      path: this.artifactPathString,
      text: this.artifactText,
      font: this.artifactFont
    };
  },
  watch: {
    artifact: function() {
      // handle artifact select
      this.artifact.on("select", e => {
        this.artifact.selectize().resize();
      });
      // handle artifact deselect
      this.artifact.on("deselect", e => {
        this.artifact.selectize(false);
      });
      // handle drag movement
      this.artifact.on("dragmove", event => {
        let moveX = "";
        let moveY = "";
        if (this.artifactType === "rectangle") {
          this.x = event.detail.event.target.x.animVal.value;
          this.y = event.detail.event.target.y.animVal.value;
          this.$firebaseRefs.artifacts
            .child(this.artifactKey)
            .update({ x: this.x, y: this.y });
        } else if (
          this.artifactType === "circle" ||
          this.artifactType === "ellipse"
        ) {
          this.cx = event.detail.event.target.cx.animVal.value;
          this.cy = event.detail.event.target.cy.animVal.value;
          this.$firebaseRefs.artifacts
            .child(this.artifactKey)
            .update({ cx: this.cx, cy: this.cy });
        } else if (this.artifactType === "line") {
          console.log(event.detail.event.target);
        }
      });
      // handle resize
      this.artifact.on("resizing", event => {
        if (this.artifactType === "rectangle") {
          this.width = this.artifact.node.width.animVal.value;
          this.height = this.artifact.node.height.animVal.value;
          this.$firebaseRefs.artifacts
            .child(this.artifactKey)
            .update({ width: this.width, height: this.height });
        } else if (this.artifactType === "circle") {
          this.cx = this.artifact.node.cx.animVal.value;
          this.cy = this.artifact.node.cy.animVal.value;
          this.radius = this.artifact.node.r.animVal.value;
          this.$firebaseRefs.artifacts
            .child(this.artifactKey)
            .update({ radius: this.radius, cx: this.cx, cy: this.cy });
        } else if (this.artifactType === "ellipse") {
          this.cx = this.artifact.node.cx.animVal.value;
          this.cy = this.artifact.node.cy.animVal.value;
          this.rx = this.artifact.node.rx.animVal.value;
          this.ry = this.artifact.node.ry.animVal.value;
          this.$firebaseRefs.artifacts
            .child(this.artifactKey)
            .update({ cx: this.cx, cy: this.cy, rx: this.rx, ry: this.ry });
        }
      });
    }
  },
  methods: {
    select() {
      this.artifact.fire("select");
    },
    deselect() {
      this.artifact.fire("deselect");
    },
    createDynamicRectangle() {
      this.artifact = this.draw
        .rect(this.width, this.height)
        .fill(this.fill)
        .style("cursor", "move")
        .move(this.x, this.y);
      this.artifact.draggable();
    },
    createDynamicCircle() {
      this.artifact = this.draw
        .circle(this.radius)
        .fill(this.fill)
        .style("cursor", "move")
        .move(this.cx, this.cy);
      this.artifact.draggable();
    },
    createDynamicEllipse() {
      this.artifact = this.draw
        .ellipse(this.rx, this.ry)
        .fill(this.fill)
        .style("cursor", "move")
        .move(this.cx, this.cy);
      this.artifact.draggable();
    },
    createDynamicLine() {
      this.artifact = this.draw
        .line(this.line.x1, this.line.y1, this.line.x2, this.line.y2)
        .stroke({ width: this.stroke.width })
        .fill(this.fill)
        .style("cursor", "move")
        .move(this.x, this.y);
      this.artifact.draggable();
    },
    createDynamicPolyline() {
      this.artifact = this.draw
        .polyline(this.points)
        .stroke({ width: this.stroke.width })
        .fill(this.fill)
        .style("cursor", "move")
        .move(this.x, this.y);
      this.artifact.draggable();
    },
    createDynamicPolygon() {
      this.artifact = this.draw
        .polygon(this.polyString)
        .fill("none")
        .stroke({ width: this.stroke.width })
        .fill(this.fill)
        .style("cursor", "move")
        .move(this.x, this.y);
      this.artifact.draggable();
    },
    createDynamicPath() {
      this.artifact = this.draw.path(this.path).fill("none");
      this.artifact
        .stroke({
          color: this.stroke.color,
          width: this.stroke.width,
          linecap: this.stroke.linecap,
          linejoin: this.stroke.linejoin
        })
        .style("cursor", "move")
        .move(this.x, this.y);
      this.artifact.draggable();
    },
    createDynamicText() {
      this.artifact = this.draw.text("Colorless green ideas sleep furiously");
      this.artifact
        .style("cursor", "move")
        .move(this.x, this.y)
        .font({ fill: this.font.fill, family: this.font.family });
      this.artifact.draggable();
    },
    initArtifact() {
      switch (this.artifactType) {
        case "rectangle":
          this.createDynamicRectangle();
          break;
        case "circle":
          this.createDynamicCircle();
          break;
        case "ellipse":
          this.createDynamicEllipse();
          break;
        case "line":
          this.createDynamicLine();
          break;
        case "polyline":
          this.createDynamicPolyline();
          break;
        case "polygon":
          this.createDynamicPolygon();
          break;
        case "path":
          this.createDynamicPath();
          break;
        case "text":
          this.createDynamicText();
          break;
        default:
          console.log("not a dynamic artifact");
      }
    }
  }
};
</script>
<style scoped>

</style>
