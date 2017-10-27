<template>
  <div>
      <svg
        class="sandbox-board"
        :width="width"
        :height="height"
      >
        <rect
            :width="rectWidth"
            :height="rectHeight"
            :x="recX"
            :y="recY"
            fill="white"
        >

        </rect>
      </svg>
  </div>
</template>
<script>
export default {
  name: "SandboxBoard",
  data() {
    return {
      width: 750,
      height: 600,
      rectWidth: "100%",
      rectHeight: "100%",
      rectX: 0,
      rectY: 0
    };
  }
};
</script>
<style scoped>
.sandbox-board {
  border: 1px solid red;
}
</style>

