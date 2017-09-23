<template>
    <div class="whiteboard-app">
        <drawing-board></drawing-board>
    </div>
</template>
<script>
import DrawingBoard from './DrawingBoard'
export default {
  name: 'whiteboard-app',
  components: {
      DrawingBoard
  }
}
</script>
<style scoped>
    .whiteboard-app {
        margin-top: 60px;
    }
</style>
