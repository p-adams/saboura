<template>
  <div>
      <svg
        :class="{
          sandboxBoardDrawing: selectedTool === 'draw',
          sandboxBoardNormal: selectedTool !== 'draw'
        }"
        :width="width"
        :height="height"
        v-draw="selectedTool"
      >
        <rect
            :width="rectWidth"
            :height="rectHeight"
            :x="rectX"
            :y="rectY"
            fill="white"
        >
        </rect>
      </svg>
  </div>
</template>
<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";
export default {
  name: "SandboxBoard",
  data() {
    return {
      width: 750,
      height: 600,
      rectWidth: "100%",
      rectHeight: "100%",
      rectX: 0,
      rectY: 0,
      drawing: {
        activeLine: "",
        renderPath: "",
        svg: ""
      }
    };
  },
  methods: {},
  directives: {
    draw: (el, bindings) => {
      if (bindings.value === "draw") {
        let activeLine;
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
        const svg = d3.select(el).call(
          d3.behavior
            .drag()
            .on("dragstart", dragstarted)
            .on("drag", dragged)
            .on("dragend", dragended)
        );
        function dragstarted() {
          activeLine = svg
            .append("path")
            .datum([])
            .attr("class", "sandboxBoardDrawing");
          activeLine.datum().push(d3.mouse(this));
        }
        function dragged() {
          activeLine.datum().push(d3.mouse(this));
          activeLine.attr("d", renderPath);
        }
        function dragended() {
          activeLine = null;
        }
      }
    }
  },
  computed: {
    ...mapGetters(["selectedTool"])
  }
};
</script>
<style scoped>
.sandboxBoardDrawing {
  border: 5px solid lightgrey;
  fill: none;
  stroke: #000;
  stroke-width: 3px;
  stroke-linejoin: round;
  stroke-linecap: round;
  cursor: crosshair;
}
.sandboxBoardNormal {
  border: 5px solid lightgrey;
}
</style>

