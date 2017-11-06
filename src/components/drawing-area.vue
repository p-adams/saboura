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
        <adjustable-rectangle
          x-position="50"
          y-position="50"
          rectangleWidth="50"
          rectangleHeight="50"
          rectangleFillColor="green"
        ></adjustable-rectangle>
      <!-- start: artifact toolbar for selected artifact -->
       <g v-show="artifactToolbarIsVisible">
        <rect
            :x="x"
            :y="y"
            width="100"
            height="180"
            fill="#E8EAF6"
          >   
        </rect>
        <rect
          class="draggable"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
          :x="x + 20"
          :y="y + 5"
          width="60"
          height="20"
          fill="#FF7043"
        >   
        </rect>
        <foreignObject
          width="100"
          height="180"
          :x="x"
          :y="y + 30"
          >
          <v-container>
            <v-layout justify-space-around>
              <v-flex>
                <v-icon
                  large
                  @click="selectArtifactTool('content_copy')"
                >content_copy</v-icon>
              </v-flex>
              <v-flex>
                <v-tooltip right>
                <v-icon
                  large
                  @click="selectArtifactTool('pan_tool')"
                >pan_tool</v-icon>
                </v-tooltip>
              </v-flex>
            </v-layout>
            <v-layout justify-space-around>
              <v-flex>
                <v-icon
                  large
                  @click="selectArtifactTool('delete')"
                  >delete</v-icon>
              </v-flex>
              <v-flex>
                <v-icon
                  large
                  @click="selectArtifactTool('format_shapes')"
                  >format_shapes</v-icon>
                </v-flex>
            </v-layout>
          </v-container>
           <v-btn
            @click="artifactToolbarIsVisible = false"
            class="close-button"
            small
            outline
            color="indigo"
           >close</v-btn>
        </foreignObject>
        </g>
         <!-- end: artifact toolbar for selected artifact -->
      </svg>
  </div>
</template>
<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";
import AdjustableRectangle from "./adjustable-rectangle";
import { Draggable } from "./mixins/draggable";
export default {
  name: "SandboxBoard",
  mixins: [Draggable],
  data() {
    return {
      width: 900,
      height: 600,
      rectWidth: "100%",
      rectHeight: "100%",
      rectX: 0,
      rectY: 0,
      x: 0,
      y: 0,
      drawing: {
        activeLine: "",
        renderPath: "",
        svg: ""
      },
      artifactToolbarIsVisible: true
    };
  },
  methods: {
    selectArtifactTool(option) {
      console.log(option);
    }
  },
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
  },
  components: {
    AdjustableRectangle
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
.icon {
  background: "black";
  padding: 5px;
  cursor: pointer;
}
.draggable {
  cursor: move;
}
.close-button {
  margin-top: -10px;
  margin-left: 5px;
}
</style>

