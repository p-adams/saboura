<template>
  <svg>
    <!--<template v-for="(shape, key) in artifacts">
      <component :key="key" :is="shape"></component>
    </template>-->
    <g>
      <dynamic-rectangle
        v-for="(rect, key) in storedRectangles"
        :key="key"
        :id="rect.id"
        :rect-x="rect.x"
        :rect-y="rect.y"
        :rect-width="rect.width"
        :rect-height="rect.height"
        :rect-fill="rect.fill"
      ></dynamic-rectangle>
    </g>
  </svg>
</template>
<script>
import DynamicRectangle from "./dynamic-rectangle";
import { mapGetters } from "vuex";
export default {
  name: "ArtifactsLayer",
  data() {
    return {
      shapes: []
    };
  },
  computed: {
    ...mapGetters(["storedRectangles"])
  },
  components: {
    DynamicRectangle
  }
};
</script>
<style scoped>

</style>
