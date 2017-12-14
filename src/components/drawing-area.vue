<template>
  <div>
    <!-- drawing area top toolbar -->
      <toolbar-menu></toolbar-menu>
    <!-- drawing area top toolbar -->
      <svg
        :width="width"
        :height="height"
      >
      <!-- base drawing layer -->
        <whiteboard-base-layer :whiteboard-id="whiteboardId"></whiteboard-base-layer>
       <!-- base drawing layer -->
       <!-- render artifacts layer -->
        <artifacts-layer :whiteboard-id="whiteboardId"></artifacts-layer>
       <!-- render artifacts layer -->
      </svg>
  </div>
</template>
<script>
import WhiteboardBaseLayer from "./whiteboard-base-layer";
import ArtifactsLayer from "./artifacts-layer";
import ToolbarMenu from "./toolbar-menu";
export default {
  name: "DrawingArea",
  props: {
    whiteboardId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      width: "100%",
      height: 600
    };
  },
  components: {
    ToolbarMenu,
    WhiteboardBaseLayer,
    ArtifactsLayer
  }
};
</script>
<style scoped>
.icon {
  background: "black";
  padding: 5px;
  cursor: pointer;
}
.draggable {
  cursor: move;
}
input,
select {
  background: white;
  color: black;
  border: 1px solid dimgray;
}
.select {
  color: black;
}
button {
  margin-top: 10px;
  padding: 5px;
  border: 1px solid white;
}
</style>

