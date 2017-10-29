<template>
    <svg
        @click="select(text)"
        class="toolbar-button"
        width="150"
        height="40"
    >
        <rect
            x="0"
            y="0"
            width="175"
            height="50"
            fill="#C5E1A5"
        >
        </rect>
        <text
            :x="textX"
            :y="textY"
            font-size="18"
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
    }
  }
};
</script>
<style scoped>
.toolbar-button {
  cursor: pointer;
}
</style>


