<template>
   <svg
        :style="{border: '5px solid lightgray'}"
        width="100%"
        height="135px"
      >
        <rect
          width="100%"
          height="135px"
          x="0"
          y="0"
          fill="black"
        >
        </rect>
        <foreignObject width="100%" height="100%">
          <ul>
            <li
              v-for="item in toolbarItems"
              :key="item.title"
            >
            <toolbar-icon 
              :icon="item.icon"
              :is-icon="item.isIcon"
            ></toolbar-icon>
            </li>
          </ul>
        </foreignObject>
        <!--
          marker settings:
            color
            width
            eraser
          zoom in/out
          color panel
          text settings:
            font size
            font width
            bold
            italic
            alignment
          redo/undo
          insert image/chart?
          save/download whiteboard state buttons
          theme stepper
        -->
      </svg>
</template>
<script>
import { mapGetters } from "vuex";
import ToolbarIcon from "./toolbar-icon";
export default {
  name: "ToolbarMenu",
  data() {
    return {
      mini: true,
      toolbarItems: [
        { title: "draw", icon: "mode_edit", isIcon: true },
        { title: "erase", icon: "eraser", isIcon: false },
        { title: "rectangle", icon: "rectangle", isIcon: false },
        { title: "circle", icon: "circle", isIcon: false },
        { title: "ellipse", icon: "ellipse", isIcon: false },
        { title: "line", icon: "line", isIcon: false },
        { title: "polyline", icon: "polyline", isIcon: false },
        { title: "polygon", icon: "polygon", isIcon: false },
        { title: "path", icon: "linear_scale", isIcon: true },
        { title: "text_fields", icon: "text_fields", isIcon: true },
        { title: "flow_chart", icon: "flow_chart", isIcon: false },
        { title: "bubble_chart", icon: "bubble_chart", isIcon: true },
        { title: "post_it", icon: "note", isIcon: false }
      ]
    };
  },
  computed: {
    ...mapGetters(["drawingToolbar"])
  },
  components: {
    ToolbarIcon
  }
};
</script>
<style scoped>
.toolbar-menu {
  border: 5px solid lightgray;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
li {
  display: inline-block;
  padding: 5px;
}
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 50px;
  background-color: white;
  color: black;
  text-align: center;
  border-radius: 6px;

  position: absolute;
  z-index: 1;
  top: -40px;
  left: 0;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>

