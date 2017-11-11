<template>
  <div>
    {{ selectedTool }}
    <!-- drawing area top toolbar -->
      <toolbar-menu></toolbar-menu>
    <!-- drawing area top toolbar -->
      <svg
        :class="{
          sandboxBoardDrawing: selectedTool === 'mode_edit',
          sandboxBoardNormal: selectedTool !== 'mode_edit'
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
        <adjustable-rectangle
          x-position="50"
          y-position="50"
          rectangleWidth="50"
          rectangleHeight="50"
          rectangleFillColor="green"
        ></adjustable-rectangle>
      <!-- artifact toolbar for selected artifact -->
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
               <v-icon
                @click="artifactToolbarIsVisible = false"
                large
                color="indigo"
               >close</v-icon> 
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
        
        </foreignObject>
        </g>
         <!-- artifact toolbar for selected artifact -->
      </svg>
  </div>
</template>
<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import AdjustableRectangle from "./adjustable-rectangle";
import { Draggable } from "./mixins/draggable";
import ToolbarMenu from "./toolbar-menu";
export default {
  name: "SandboxBoard",
  mixins: [Draggable],
  data() {
    return {
      width: "100%",
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
    ...mapActions(["setToolbarOption"])
  },
  directives: {
    draw: {
      componentUpdated: function(el, binding) {
        let svg;
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
        // if in drawing mode, draw on whiteboard
        if (binding.value === "mode_edit") {
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
    ...mapGetters(["selectedTool"])
  },
  components: {
    AdjustableRectangle,
    ToolbarMenu
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
  fill: none;
  stroke: #000;
  stroke-width: 3px;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.icon {
  background: "black";
  padding: 5px;
  cursor: pointer;
}
.draggable {
  cursor: move;
}
</style>

