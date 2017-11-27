<template>
 <!-- nest svg tag to prevent draw/erase from overlapping with whiteboard artifacts -->
    <svg 
        :class="{
            boardDrawing: selectedTool === 'draw',
            boardErasing: selectedTool === 'erase',
            normal: selectedTool !== 'draw'
        }"
        :width="width"
        :height="height"
        v-draw="selectedTool"
    >
        <rect
        @dblclick="setToolbarOption('shape')"
        :width="rectWidth"
        :height="rectHeight"
        :x="rectX"
        :y="rectY"
        fill="white"
        >
        </rect>
        <path
          v-for="(path, key) in paths"
          :key="key"
          :d="path.path"
          :style="path.style"
        >
        </path>
    </svg>
 <!-- nest svg tag to prevent draw/erase from overlapping with whiteboard artifacts -->
</template>
<script>
import * as d3 from "d3";
import { DB } from "../firebase";
import firebase from "firebase";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "WhiteboardBaseLayer",
  props: {
    whiteboardId: {
      type: String,
      required: true
    }
  },
  created() {
    return this.$bindAsArray(
      "drawing",
      DB.ref(`mockWhiteboards/${this.whiteboardId}/artifacts`)
    );
  },
  mounted() {
    DB.ref(`mockWhiteboards/${this.whiteboardId}/artifacts`)
      .child("paths")
      .on("value", snapshot => {
        // console.log(snapshot.val());
        const prop = snapshot.val();
        for (let i in prop) {
          this.paths.push({ path: prop[i].path, style: prop[i].style });
        }
      });
  },
  data() {
    return {
      width: "100%",
      height: 600,
      rectWidth: "100%",
      rectHeight: "100%",
      rectX: 0,
      rectY: 0,
      paths: []
    };
  },
  methods: {
    ...mapActions(["setToolbarOption"])
  },
  directives: {
    draw: {
      componentUpdated: (el, binding, vnode) => {
        const vm = vnode.context;
        let svg;
        let activeLine;
        let drawProps = {
          stroke: "",
          strokeWidth: ""
        };

        let className;
        const renderPath = d3.svg
          .line()
          .x(function(d) {
            return d[0];
          })
          .y(function(d) {
            return d[1];
          })
          .tension(0)
          .interpolate("cardinal");

        function dragstarted() {
          activeLine = svg
            .append("path")
            .datum([])
            .style("fill", "none")
            .style("stroke", drawProps.stroke)
            .style("stroke-width", drawProps.strokeWidth);
          activeLine.datum().push(d3.mouse(this));
        }
        function dragged() {
          activeLine.datum().push(d3.mouse(this));
          activeLine.attr("d", renderPath);
        }
        function dragended() {
          vm.$firebaseRefs.drawing.child("paths").push({
            path: activeLine[0][0].attributes.d.value,
            style: activeLine[0][0].attributes.style.value
          });
          activeLine = null;
        }
        // if in drawing mode, draw on whiteboard
        if (binding.value === "draw") {
          drawProps.stroke = "black";
          drawProps.strokeWidth = 3;
          svg = d3.select(el).call(
            d3.behavior
              .drag()
              .on("dragstart", dragstarted)
              .on("drag", dragged)
              .on("dragend", dragended)
          );
        } else if (binding.value === "erase") {
          drawProps.stroke = "white";
          drawProps.strokeWidth = 16;
          svg = d3.select(el).call(
            d3.behavior
              .drag()
              .on("dragstart", dragstarted)
              .on("drag", dragged)
              .on("dragend", dragended)
          );
        } else {
          // if other toolbar option selected, remove draw behavior
          svg = d3.select(el).call(
            d3.behavior
              .drag()
              .on("dragstart", null)
              .on("drag", null)
              .on("dragend", null)
          );
        }
      }
    }
  },
  computed: {
    ...mapGetters(["selectedTool", "getColorOption", "getPenThicknessOption"])
  }
};
</script>
<style scoped>
.boardDrawing {
  border: 5px solid lightgrey;
  cursor: crosshair;
}
.boardErasing {
  border: 5px solid lightgrey;
  cursor: url(https://png.icons8.com/rectangular/win10/16/000000), auto;
}
.normal {
  border: 5px solid lightgrey;
}
</style>
