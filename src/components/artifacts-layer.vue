<template>
  <svg>
    <adjustable-rectangle
        x-position="50"
        y-position="50"
        rectangleWidth="50"
        rectangleHeight="50"
        rectangleFillColor="green"
    ></adjustable-rectangle>
  </svg>
</template>
<script>
import AdjustableRectangle from "./adjustable-rectangle";
export default {
    components:{
        AdjustableRectangle,
    }
};
</script>
<style scoped>

</style>
