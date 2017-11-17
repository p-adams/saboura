<template>
  <svg>
    <adjustable-rectangle
        x-position="50"
        y-position="50"
        rectangleWidth="50"
        rectangleHeight="50"
        rectangleFillColor="green"
    ></adjustable-rectangle>
    <dynamic-shape></dynamic-shape>
  </svg>
</template>
<script>
import AdjustableRectangle from "./adjustable-rectangle";
import DynamicShape from "./dynamic-shape";
export default {
  components: {
    AdjustableRectangle,
    DynamicShape
  }
};
</script>
<style scoped>

</style>
