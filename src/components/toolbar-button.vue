<template>
    <svg
      @click="select(text)"
      class="toolbar-button"
      width="100"
      height="30"
    >
    <g>
        <rect
          x="0"
          y="0"
          width="100"
          height="30"
          fill="#C5E1A5"
        >
        </rect>
        <text
          v-if="!isSelected"
          :x="textX"
          :y="textY"
          font-size="15"
        >{{ text }}</text>
        <foreignObject
          v-else
          height="50"
          width="50"
          x="35"
          y="3"
          >
          <v-icon class="icon">close</v-icon>
        </foreignObject>
    </g>
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
  data() {
    return {
      isSelected: false
    };
  },
  methods: {
    select(option) {
      this.isSelected = !this.isSelected;
      this.$store.dispatch("setToolbarOption", option);
      if (option === "draw") {
        this.$store.dispatch("setDrawingToolbarVisibility", true);
      }
    }
  },
  computed: {
    showToggledText() {
      return this.isSelected === false
        ? this.text
        : `<i class="fa fa-times" aria-hidden="true"></i>
`;
    }
  }
};
</script>
<style scoped>
.toolbar-button {
  cursor: pointer;
  box-shadow: 2px 2px 2px 1px black;
}
.toolbar-button:hover {
  cursor: pointer;
  box-shadow: -2px 2px 4px 2px #64b5f6;
}
.icon {
  color: black;
}
</style>


