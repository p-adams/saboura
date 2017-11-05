<template>
  <svg
    class="sandbox-toolbar"
    ref="toolbar"
    :width="svgWidth"
    :height="svgHeight"
  >
    <g>
        <rect
            class="draggable"
            @mousedown="handleMouseDown"
            @mouseup="handleMouseUp"
            :width="toolbarWidth"
            :height="toolbarHeight"
            :x="x"
            :y="y"
            fill="gray"
        >
        </rect>
        <!-- toolbar for drawing on white -->
        <drawing-toolbar v-show="drawingToolbar"></drawing-toolbar>
        <!-- custom toolbar buttons -->
        <foreignObject
          width="120px"
          height="330px"
          :x="x + 50"
          :y="y + 50"
        >
          <toolbar-button
            v-for="(button, key) in toolbarButtons"
            :key="key"
            class="toolbar-button"
            :text="button.text"
            :textX="button.x"
            :textY="button.y"
          ></toolbar-button>
        </foreignObject>
    </g>
  </svg>
</template>
<script>
import ToolbarButton from "./toolbar-button";
import DrawingToolbar from "./drawing-toolbar";
import { mapGetters } from "vuex";
export default {
  name: "ToolbarMenu",
  data() {
    return {
      svgWidth: 400,
      svgHeight: 600,
      toolbarWidth: "200",
      toolbarHeight: "425",
      toolbarX: 20,
      toolbarY: 20,
      toolbarButtons: [
        { text: "draw", x: "30", y: "20" },
        { text: "rectangle", x: "20", y: "20" },
        { text: "circle", x: "30", y: "20" },
        { text: "ellipse", x: "28", y: "20" },
        { text: "line", x: "32", y: "20" },
        { text: "polyline", x: "22", y: "20" },
        { text: "polygon", x: "22", y: "20" },
        { text: "path", x: "30", y: "20" },
        { text: "save", x: "30", y: "20" }
      ],
      x: 50,
      y: 50,
      coords: {
        x: "",
        y: ""
      }
    };
  },
  methods: {
    select(button) {
      console.log(button);
    },
    handleMouseMove(e) {
      const xDiff = this.coords.x - e.pageX;
      const yDiff = this.coords.y - e.pageY;

      this.coords.x = e.pageX;
      this.coords.y = e.pageY;

      this.x = this.x - xDiff;
      this.y = this.y - yDiff;
    },
    handleMouseDown(e) {
      this.coords = {
        x: e.pageX,
        y: e.pageY
      };
      this.$refs.toolbar.addEventListener("mousemove", this.handleMouseMove);
    },
    handleMouseUp() {
      this.$refs.toolbar.removeEventListener("mousemove", this.handleMouseMove);
      this.coords = {};
    }
  },
  computed: {
    ...mapGetters(["drawingToolbar"])
  },
  components: {
    ToolbarButton,
    DrawingToolbar
  }
};
</script>
<style scoped>
.sandbox-toolbar {
  border: 5px solid white;
}
.draggable {
  cursor: grabbing;
}
</style>

