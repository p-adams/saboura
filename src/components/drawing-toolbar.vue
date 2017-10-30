<template>
    <g>
        <rect
            width="50"
            height="300"
            x="300"
            y="60"
            fill="gray"
        >   
        </rect>
        <circle
            class="close"
            cx="340"
            cy="63"
            r="10"
            fill="lightgray"
        >
        </circle>
        <text
            @click="closeDrawingToolbar"
            class="close"
            x="335"
            y="70"
            font-size="15"
            fill="black"
        >
        X
        </text>
    </g>
</template>
<script>
export default {
  name: "DrawingToolbar",
  methods: {
    closeDrawingToolbar() {
      this.$store.dispatch("setDrawingToolbarVisibility", false);
    }
  }
};
</script>
<style scoped>
.close {
  cursor: pointer;
  background: red;
}
</style>
