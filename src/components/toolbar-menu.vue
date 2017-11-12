<template>
   <svg
        :style="{border: '5px solid lightgray'}"
        width="100%"
        height="100"
      >
        <rect
          width="100%"
          height="105"
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
        { title: "erase", icon: "eraser", isIcon: false }
      ],
      items: [
        { title: "Shapes", icon: "question_answer" },
        { title: "Lines", icon: "question_answer" },
        { title: "Drawing", icon: "question_answer" },
        { title: "Text", icon: "question_answer" },
        { title: "UML", icon: "question_answer" },
        { title: "Post-it", icon: "question_answer" },
        { title: "Index card", icon: "question_answer" }
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

