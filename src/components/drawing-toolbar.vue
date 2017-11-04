<template>
    <g>
        <rect
            width="50"
            height="300"
            :x="buttons.x"
            :y="buttons.y"
            fill="gray"
        >   
        </rect>
         <rect
            width="20"
            height="20"
            :x="buttons.x + 15"
            :y="buttons.y + 20"
            fill="white"
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
            :x="335"
            :y="70"
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
  data() {
    return {
      buttons: {
        x: 300,
        y: 60
      }
    };
  },
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
