<template>
  <rect
    :x="x"
    :y="y"
    :width="width"
    :height="height"
    :fill="fill"
  ></rect>
</template>
<script>
export default {
  name: "AdjustableRectangle",
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
      rectangleHeight: this.rectangleHeight,
      fill: this.rectangleFillColor,
      coordinates: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {}
};
</script>
