<template>
    <div class="whiteboard-app">
        <temp-drawing-board></temp-drawing-board>
    </div>
</template>
<script>
import TempDrawingBoard from "./temp-drawing-board";
export default {
  name: "WhiteboardApp",
  components: {
    TempDrawingBoard
  }
};
</script>
<style scoped>
.whiteboard-app {
  margin-top: 60px;
}
</style>
