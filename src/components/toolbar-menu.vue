<template>
   <svg
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
          <toolbar-icon icon="mode_edit"></toolbar-icon>
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
</style>

