<template>
  <svg>
    <g>
      <template v-for="(artifact, idx) in artifacts">
        <dynamic-artifact
          :key="idx"
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
      </template>
    </g>
  </svg>
</template>
<script>
import { DB } from "../firebase";
import firebase from "firebase";
import DynamicArtifact from "./dynamic-artifact";
import AdjustableRectangle from "./adjustable-rectangle";
export default {
  name: "ArtifactsLayer",
  firebase: {
    artifacts: DB.ref("testWB")
  },
  components: {
    DynamicArtifact,
    AdjustableRectangle
  }
};
</script>
<style scoped>

</style>
