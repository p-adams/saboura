<template>
 <!-- nest svg tag to prevent draw/erase from overlapping with whiteboard artifacts -->
    <svg 
        :class="{
            boardDrawing: selectedTool === 'draw' || selectedTool === undefined,
            boardErasing: selectedTool === 'erase',
            normal: selectedTool !== 'draw'
        }"
        :width="width"
        :height="height"
        v-draw="{
          selectedTool,
          getPenThicknessOption,
          getColorOption
        }"
    >
        <rect
        :width="rectWidth"
        :height="rectHeight"
        :x="rectX"
        :y="rectY"
        fill="white"
        >
        </rect>
        <path
          v-for="(path, key) in paths"
          :key="key"
          :d="path.path"
          :style="path.style"
        >
        </path>
    </svg>
 <!-- nest svg tag to prevent draw/erase from overlapping with whiteboard artifacts -->
</template>
<script>
import { Draw } from "./directives/draw";
import { DB } from "../firebase";
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  name: "WhiteboardBaseLayer",
  props: {
    whiteboardId: {
      type: String,
      required: true
    }
  },
  created() {
    return this.$bindAsArray(
      "drawing",
      DB.ref(`mockWhiteboards/${this.whiteboardId}/artifacts`)
    );
  },
  mounted() {
    DB.ref(`mockWhiteboards/${this.whiteboardId}/artifacts`)
      .child("paths")
      .on("value", snapshot => {
        const prop = snapshot.val();
        for (let i in prop) {
          this.paths.push({ path: prop[i].path, style: prop[i].style });
        }
      });
  },
  data() {
    return {
      width: "100%",
      height: 600,
      rectWidth: "100%",
      rectHeight: "100%",
      rectX: 0,
      rectY: 0,
      paths: []
    };
  },
  directives: {
    Draw
  },
  computed: {
    ...mapGetters(["selectedTool", "getColorOption", "getPenThicknessOption"])
  }
};
</script>
<style scoped>
.boardDrawing {
  border: 5px solid lightgrey;
  cursor: crosshair;
}
.boardErasing {
  border: 5px solid lightgrey;
  cursor: url(https://png.icons8.com/rectangular/win10/16/000000), auto;
}
.normal {
  border: 5px solid lightgrey;
}
</style>
