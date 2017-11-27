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
                <!-- main toolbar -->
               
                      <ul>
                        <li
                          v-for="item in mainToolbarItems"
                          :key="item.title"
                        >
                        <toolbar-icon 
                          :icon="item.icon"
                          :is-icon="item.isIcon"
                          :title="item.title"
                          :icon-size="item.iconSize"

                          :color="item.color"
                        ></toolbar-icon>
                        </li>
                      </ul>
                       <!-- drawing toolbar -->
                       <ul>
                        <li
                          v-for="item in penToolbarItems"
                          :key="item.icon"
                        >
                        <toolbar-icon
                          :icon="item.icon"
                          :is-icon="item.isIcon"
                          :icon-size="item.iconSize"
                          :size="item.size"
                          :color="item.color"
                        >
                        </toolbar-icon>
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
      mainToolbarItems: [
        { title: "draw", icon: "mode_edit", isIcon: true },
        {
          title: "erase",
          icon: "eraser",
          isIcon: false,
          iconSize: 36,
          color: "ffffff"
        },
        {
          title: "rectangle",
          icon: "rectangle",
          isIcon: false,
          iconSize: 36,
          color: "ffffff"
        },
        {
          title: "circle",
          icon: "circle",
          isIcon: false,
          iconSize: 36,
          color: "ffffff"
        },
        {
          title: "ellipse",
          icon: "ellipse",
          isIcon: false,
          iconSize: 36,
          color: "ffffff"
        },
        {
          title: "line",
          icon: "line",
          isIcon: false,
          iconSize: 36,
          color: "ffffff"
        },
        { title: "text", icon: "text_fields", isIcon: true },
        {
          title: "flow",
          icon: "flow_chart",
          isIcon: false,
          iconSize: 36,
          color: "ffffff"
        },
        { title: "bubble", icon: "bubble_chart", isIcon: true },
        {
          title: "note",
          icon: "note",
          isIcon: false,
          iconSize: 36,
          color: "ffffff"
        },
        { title: "undo", icon: "undo", isIcon: true },
        /*
          uncomment once redo functionality is implemented
          { title: "redo", icon: "redo", isIcon: true },
        */
        {
          title: "clear",
          icon: "empty_trash",
          isIcon: false,
          iconSize: 36,
          color: "ffffff"
        }
      ],
      penToolbarItems: [
        {
          title: "pen8",
          icon: "new_moon",
          isIcon: false,
          iconSize: 8,
          size: 2,
          color: "ffffff"
        },
        {
          title: "pen10",
          icon: "new_moon",
          isIcon: false,
          iconSize: 10,
          size: 5,
          color: "ffffff"
        },
        {
          title: "pen12",
          icon: "new_moon",
          isIcon: false,
          iconSize: 12,
          size: 8,
          color: "ffffff"
        },
        {
          title: "color1",
          icon: "rectangle",
          isIcon: false,
          iconSize: 36,
          color: "000000"
        },
        {
          title: "color2",
          icon: "rectangle",
          isIcon: false,
          iconSize: 36,
          color: "616161"
        },
        {
          title: "color3",
          icon: "rectangle",
          isIcon: false,
          iconSize: 36,
          color: "ffcc80"
        },
        {
          title: "color4",
          icon: "rectangle",
          isIcon: false,
          iconSize: 36,
          color: "EF5350"
        },
        {
          title: "color5",
          icon: "rectangle",
          isIcon: false,
          iconSize: 36,
          color: "66BB6A"
        },
        {
          title: "color6",
          icon: "rectangle",
          isIcon: false,
          iconSize: 36,
          color: "29B6F6"
        },
        {
          title: "color7",
          icon: "rectangle",
          isIcon: false,
          iconSize: 36,
          color: "B39DDB"
        }
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

