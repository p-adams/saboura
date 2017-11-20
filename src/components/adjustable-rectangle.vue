<template>
  <rect
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
    :x="x"
    :y="y"
    :width="width"
    :height="height"
    :fill="fill"
  ></rect>
</template>
<script>
import { Draggable } from "./mixins/draggable";
export default {
  name: "AdjustableRectangle",
  mixins: [Draggable],
  props: {
    xPosition: {
      type: Number,
      required: true
    },
    yPosition: {
      type: Number,
      required: true
    },
    rectangleWidth: {
      type: Number,
      require: true
    },
    rectangleHeight: {
      type: Number,
      required: true
    },
    rectangleFillColor: {
      type: String,
      default: "green"
    }
  },
  data() {
    return {
      x: this.xPosition,
      y: this.yPosition,
      width: this.rectangleWidth,
      height: this.rectangleHeight,
      fill: this.rectangleFillColor
    };
  }
};
</script>
<style scoped>
rect {
  cursor: move;
}
</style>

