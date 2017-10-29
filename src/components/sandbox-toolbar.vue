<template>
  <svg
    class="sandbox-toolbar"
    @mousemove="getMousePositionOnCanvas"
    ref="sb"
    :width="svgWidth"
    :height="svgHeight"
  >
    <g>
        <rect
            class="draggable"
            @click="selectToolbar"
            ref="toolbar"
            :width="toolbarWidth"
            :height="toolbarHeight"
            :x="toolbarX"
            :y="toolbarY"
            fill="gray"
        >
        </rect>
        <foreignObject
          ref="buttons"
          width="200px"
          height="500px"
          x="20"
          y="30"
        >
          <div
            class="btn-col"
            v-for="(button, key) in toolbarButtons"
            :key="key"
            >
            <toolbar-button
              :text="button.text"
              :textX="button.x"
              :textY="button.y"
            ></toolbar-button>
          </div>
        </foreignObject>
    </g>
  </svg>
</template>
<script>
import ToolbarButton from "./toolbar-button";
export default {
  name: "SandboxToolbar",
  data() {
    return {
      svgWidth: 400,
      svgHeight: 600,
      toolbarWidth: "50%",
      toolbarHeight: "500",
      toolbarX: 20,
      toolbarY: 20,
      toolbarButtons: [
        { text: "draw", x: "50", y: "25" },
        { text: "rectangle", x: "35", y: "25" },
        { text: "circle", x: "50", y: "25" },
        { text: "ellipse", x: "45", y: "25" },
        { text: "line", x: "50", y: "25" },
        { text: "polyline", x: "40", y: "25" },
        { text: "polygon", x: "40", y: "25" },
        { text: "path", x: "50", y: "25" },
        { text: "save", x: "50", y: "25" }
      ],
      x: "",
      y: "",
      toolbarRef: ""
    };
  },
  methods: {
    select(button) {
      console.log(button);
    },
    moveToolbarHandler() {
      const xPos = this.toolbarRef.x.animVal.value;
      const yPos = this.toolbarRef.y.animVal.value;
      this.toolbarRef.setAttribute(
        "transform",
        `translate(${this.x - xPos}, ${this.y - yPos})`
      );

      this.$refs.buttons.setAttribute(
        "transform",
        `translate(${this.x - xPos}, ${this.y - yPos})`
      );
    },
    selectToolbar() {
      this.toolbarRef = this.$refs.toolbar;
      console.log(this.toolbarRef);
      this.$refs.sb.addEventListener("mousemove", this.moveToolbarHandler);
      this.$refs.sb.addEventListener("mouseup", e => {
        this.$refs.sb.removeEventListener("mousemove", this.moveToolbarHandler);
      });
    },
    getMousePositionOnCanvas(event) {
      const mousePos = this.getCoordinates(this.$refs.sb, event);
      this.x = mousePos.x;
      this.y = mousePos.y;
    },
    getCoordinates(shape, event) {
      const toolbar = shape.getBoundingClientRect();
      return {
        x: event.clientX - toolbar.left,
        y: event.clientY - toolbar.top
      };
    }
  },
  components: {
    ToolbarButton
  }
};
</script>
<style scoped>
.sandbox-toolbar {
  border: 5px solid lightgrey;
}
.draggable {
  cursor: move;
}
.btn-col {
  padding: 3px;
  margin-left: 10px;
}
</style>

