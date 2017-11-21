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
          <v-container grid-list-xl text-xs-center>
            <v-layout row wrap>
              <v-flex>
                <ul>
                  <li
                    v-for="item in toolbarItems"
                    :key="item.title"
                  >
                  <toolbar-icon 
                    :icon="item.icon"
                    :is-icon="item.isIcon"
                    :title="item.title"
                  ></toolbar-icon>
                  </li>
                </ul>
              </v-flex>
            </v-layout>
          </v-container>
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
        { title: "text", icon: "text_fields", isIcon: true },
        { title: "flow", icon: "flow_chart", isIcon: false },
        { title: "bubble", icon: "bubble_chart", isIcon: true },
        { title: "note", icon: "note", isIcon: false },
        { title: "undo", icon: "undo", isIcon: true },
        /*
          uncomment once redo functionality is implemented
          { title: "redo", icon: "redo", isIcon: true },
        */
        { title: "save", icon: "save", isIcon: false },
        { title: "clear", icon: "empty_trash", isIcon: false }
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

