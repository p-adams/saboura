<template>
  <svg>
    <g>
      <template v-for="(artifact, key) in artifacts">
        <dynamic-rectangle
          v-if="artifact.type === 'rectangle'"
          :key="key"
          :artifact-key="artifact['.key']"
          :whiteboard-id="whiteboardId"
          :artifact-x="artifact.x"
          :artifact-y="artifact.y"
          :artifact-transform="artifact.transform"
          :artifact-width="artifact.width"
          :artifact-height="artifact.height"
          :artifact-fill="artifact.fill"
        ></dynamic-rectangle>
        <dynamic-circle
          v-else-if="artifact.type === 'circle'"
          :key="key"
          :artifact-key="artifact['.key']"
          :whiteboard-id="whiteboardId"
          :artifact-cx="artifact.cx"
          :artifact-cy="artifact.cy"
          :artifact-transform="artifact.transform"
          :artifact-radius="artifact.radius"
          :artifact-fill="artifact.fill"
          
        ></dynamic-circle>
        <dynamic-ellipse
          v-else-if="artifact.type === 'ellipse'"
          :key="key"
          :artifact-key="artifact['.key']"
          :whiteboard-id="whiteboardId"
          :artifact-cx="artifact.cx"
          :artifact-cy="artifact.cy"
          :artifact-rx="artifact.rx"
          :artifact-ry="artifact.ry"
          :artifact-transform="artifact.transform"
          :artifact-fill="artifact.fill"
        ></dynamic-ellipse>
        <dynamic-line
          v-else-if="artifact.type === 'line'"
          :key="key"
          :artifact-key="artifact['.key']"
          :whiteboard-id="whiteboardId"
          :artifact-x="artifact.x"
          :artifact-y="artifact.y"
          :artifact-x1="artifact.x1"
          :artifact-x2="artifact.x2"
          :artifact-y1="artifact.y1"
          :artifact-y2="artifact.y2"
          :artifact-transform="artifact.transform"
          :artifact-fill="artifact.fill"
          :artifact-stroke-width="artifact.strokeWidth"
          ></dynamic-line>
        <dynamic-text
          v-else
          :key="key"
          :artifact-key="artifact['.key']"
          :whiteboard-id="whiteboardId"
          :artifact-x="artifact.x"
          :artifact-y="artifact.y"
          :artifact-text="artifact.text"
          :artifact-font-fill="artifact.fill"
          :artifact-font-family="artifact.family"
        ></dynamic-text>
      </template>
    </g>
  </svg>
</template>
<script>
import { DB } from "../firebase";
import firebase from "firebase";
import dynamicRectangle from "./dynamic-rectangle";
import dynamicCircle from "./dynamic-circle";
import dynamicEllipse from "./dynamic-ellipse";
import dynamicLine from "./dynamic-line";
import dynamicText from "./dynamic-text";
export default {
  name: "ArtifactsLayer",
  props: {
    whiteboardId: {
      type: String,
      required: false
    }
  },
  created() {
    this.$bindAsArray(
      "artifacts",
      DB.ref(`mockWhiteboards/${this.whiteboardId}/artifacts`)
    );
  },
  components: {
    dynamicRectangle,
    dynamicCircle,
    dynamicEllipse,
    dynamicLine,
    dynamicText
  }
};
</script>
<style scoped>

</style>
