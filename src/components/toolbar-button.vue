<template>
    <svg
        @click="select(text)"
        class="toolbar-button"
        width="100"
        height="30"
    >
        <rect
            x="0"
            y="0"
            width="100"
            height="30"
            fill="#C5E1A5"
        >
        </rect>
        <text
            :x="textX"
            :y="textY"
            font-size="15"
        >{{ text }}</text>
    </svg>
</template>
<script>
export default {
  name: "ToolbarButton",
  props: {
    text: {
      type: String,
      default: ""
    },
    textX: {
      type: String,
      default: ""
    },
    textY: {
      type: String,
      default: ""
    }
  },
  methods: {
    select(option) {
      this.$store.dispatch("setToolbarOption", option);
      if (option === "draw") {
        this.$store.dispatch("setDrawingToolbarVisibility", true);
      }
    }
  }
};
</script>
<style scoped>
.toolbar-button {
  cursor: pointer;
}
</style>


