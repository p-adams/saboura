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
      type: String,
      required: true
    },
    yPosition: {
      type: String,
      required: true
    },
    rectangleWidth: {
      type: String,
      require: true
    },
    rectangleHeight: {
      type: String,
      required: true
    },
    rectangleFillColor: {
      type: String,
      required: false
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
