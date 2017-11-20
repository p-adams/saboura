<template>
  <svg>
    <g>
      <dynamic-artifact
        v-for="(artifact, key) in artifacts"
        :key="key"
        :artifact-type="artifact.type"
        :artifact-key="artifact['.key']"
        :artifact-x="artifact.x"
        :artifact-y="artifact.y"
        :artifact-width="artifact.width"
        :artifact-height="artifact.height"
        :artifact-radius="artifact.radius"
        :artifact-fill="artifact.fill"
        :artifact-stroke="artifact.stroke"
        :artifact-line-coords="artifact.lineCoords"
        :artifact-points="artifact.polylinePoints"
        :artifact-poly-string="artifact.polyString"
        :artifact-path-string="artifact.pathString"
        :artifact-text="artifact.text"
        :artifact-font="artifact.font"
      ></dynamic-artifact>
    </g>
  </svg>
</template>
<script>
import { DB } from "../firebase";
import firebase from "firebase";
import DynamicRectangle from "./dynamic-rectangle";
import DynamicArtifact from "./dynamic-artifact";
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
    DynamicRectangle,
    DynamicArtifact
  }
};
</script>
<style scoped>

</style>
