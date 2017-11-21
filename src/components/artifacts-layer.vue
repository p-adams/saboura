<template>
  <svg>
    <g>
      <template v-for="(artifact, key) in artifacts">
        <dynamic-rectangle
          v-if="artifact.type === 'rectangle'"
          :key="key"
          :artifact-key="artifact['.key']"
          :artifact-x="artifact.x"
          :artifact-y="artifact.y"
          :artifact-width="artifact.width"
          :artifact-height="artifact.height"
          :artifact-fill="artifact.fill"
        ></dynamic-rectangle>
        <dynamic-circle
          v-else-if="artifact.type === 'circle'"
          :key="key"
          :artifact-key="artifact['.key']"
          :artifact-cx="artifact.cx"
          :artifact-cy="artifact.cy"
          :artifact-radius="artifact.radius"
          :artifact-fill="artifact.fill"
          
        ></dynamic-circle>
        <dynamic-ellipse
          v-else-if="artifact.type === 'ellipse'"
          :key="key"
          :artifact-key="artifact['.key']"
          :artifact-cx="artifact.cx"
          :artifact-cy="artifact.cy"
          :artifact-rx="artifact.rx"
          :artifact-ry="artifact.ry"
          :artifact-fill="artifact.fill"
        ></dynamic-ellipse>
        <dynamic-line
         v-else-if="artifact.type === 'line'"
          :key="key"
          :artifact-key="artifact['.key']"
          :artifact-x="artifact.x"
          :artifact-y="artifact.y"
          :artifact-x1="artifact.x1"
          :artifact-x2="artifact.x2"
          :artifact-y1="artifact.y1"
          :artifact-y2="artifact.y2"
          :artifact-fill="artifact.fill"
          :artifact-stroke-width="artifact.strokeWidth"
          ></dynamic-line>
        <dynamic-polyline
          :key="key"
          :artifact-key="artifact['.key']"
        ></dynamic-polyline>


        <!--<dynamic-polyline
          :key="key"
        ></dynamic-polyline>
        <dynamic-polygon
          :key="key"
        ></dynamic-polygon>-->

        <!-- <dynamic-line></dynamic-line>
        <dynamic-polyline></dynamic-polyline>
        <dynamic-polygon></dynamic-polygon>
        <dynamic-path></dynamic-path>
        <dynamic-text></dynamic-text> -->
        <!--<dynamic-artifact
          :key="idx"
          :artifact-type="artifact.type"
          :artifact-key="artifact['.key']"
          :artifact-x="artifact.x"
          :artifact-y="artifact.y"
          :artifact-cx="artifact.cx"
          :artifact-cy="artifact.cy"
          :artifact-rx="artifact.rx"
          :artifact-ry="artifact.ry"
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
        ></dynamic-artifact> -->
      </template>
    </g>
  </svg>
</template>
<script>
import { DB } from "../firebase";
import firebase from "firebase";
import DynamicArtifact from "./dynamic-artifact";
import dynamicRectangle from "./dynamic-rectangle";
import dynamicCircle from "./dynamic-circle";
import dynamicEllipse from "./dynamic-ellipse";
import dynamicLine from "./dynamic-line";
import dynamicPolyline from "./dynamic-polyline";
import dynamicPolygon from "./dynamic-polygon";
import dynamicPath from "./dynamic-path";
import dynamicText from "./dynamic-text";
export default {
  name: "ArtifactsLayer",
  firebase: {
    artifacts: DB.ref("testWB")
  },
  components: {
    DynamicArtifact,
    dynamicRectangle,
    dynamicCircle,
    dynamicEllipse,
    dynamicLine,
    dynamicPolyline,
    dynamicPolygon,
    dynamicPath,
    dynamicText
  }
};
</script>
<style scoped>

</style>
