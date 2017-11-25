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
        <whiteboard-base-layer></whiteboard-base-layer>
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
  name: "SandboxBoard",
  props: {
    whiteboardId: {
      type: String,
      required: true
    }
  },
  created() {
    console.log("need to pass down", this.whiteboardId);
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
</style>

