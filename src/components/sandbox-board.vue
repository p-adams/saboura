<template>
  <div>
      <svg
        class="sandbox-board"
        :width="width"
        :height="height"
        v-draw
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
    draw: el => {
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
          .attr("class", "sandbox-board");
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
};
</script>
<style scoped>
.sandbox-board {
  border: 5px solid lightgrey;
  fill: none;
  stroke: #000;
  stroke-width: 3px;
  stroke-linejoin: round;
  stroke-linecap: round;
}
</style>

