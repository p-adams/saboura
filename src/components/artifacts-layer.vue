<template>
  <svg>
    <!--<template v-for="(shape, key) in artifacts">
      <component :key="key" :is="shape"></component>
    </template>-->
    <g>
      <dynamic-rectangle
        v-for="(rect, key) in artifacts"
        :key="key"
        :item-key="rect['.key']"
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
import { DB } from "../firebase";
import firebase from "firebase";
import DynamicRectangle from "./dynamic-rectangle";
export default {
  name: "ArtifactsLayer",
  firebase: {
    artifacts: DB.ref("testWB")
  },
  data() {
    return {
      shapes: []
    };
  },
  components: {
    DynamicRectangle
  }
};
</script>
<style scoped>

</style>
