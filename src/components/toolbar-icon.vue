<template>
  <div>
    <!-- might make all icons img -->
    <v-icon
      v-if="isIcon"
      @click="createdNewArtifact(title)"
      large
      class="icon"
    >
        {{ icon }}
    </v-icon>
    <img
      v-else
      @click="createdNewArtifact(title)"
      class="icon"
      :src="srcURL"  
    />
  </div>
</template>
<script>
import { DB } from "../firebase";
import firebase from "firebase";
import { mapActions } from "vuex";
const DRAWABLE_ARTIFACTS = [
  "rectangle",
  "circle",
  "ellipse",
  "line",
  "polyline",
  "polygon",
  "path",
  "text"
];
export default {
  name: "ToolbarIcon",
  props: {
    icon: {
      type: String
    },
    isIcon: {
      type: Boolean
    },
    title: {
      type: String
    }
  },
  firebase: {
    artifacts: DB.ref("testWB")
  },
  methods: {
    ...mapActions(["setToolbarOption"]),
    createdNewArtifact(title) {
      const artifact = {
        type: "",
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        radius: 0,
        fill: "",
        stroke: {},
        lineCoords: {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 0
        },
        polylinePoints: "",
        polyString: "",
        pathString: "",
        text: "",
        font: {
          fill: "",
          family: ""
        }
      };
      this.setToolbarOption(title);
      if (DRAWABLE_ARTIFACTS.indexOf(title) !== -1) {
        switch (title) {
          case "rectangle":
            artifact.type = "rectangle";
            artifact.x = 20;
            artifact.y = 20;
            (artifact.width = 200), (artifact.height = 75);
            artifact.fill = "blue";
            this.$firebaseRefs.artifacts.push(artifact);
            break;
          case "circle":
            artifact.type = "circle";
            artifact.x = 100;
            artifact.y = 120;
            artifact.radius = 100;
            artifact.fill = "green";
            this.$firebaseRefs.artifacts.push(artifact);
            break;
          case "ellipse":
            artifact.type = "ellipse";
            artifact.x = 40;
            artifact.y = 80;
            (artifact.width = 175), (artifact.height = 75);
            artifact.fill = "purple";
            this.$firebaseRefs.artifacts.push(artifact);
            break;
          case "line":
            artifact.type = "line";
            artifact.x = 100;
            artifact.y = 120;
            artifact.lineCoords.x1 = 0;
            artifact.lineCoords.y1 = 0;
            artifact.lineCoords.x2 = 100;
            artifact.lineCoords.y2 = 200;
            artifact.stroke.width = 10;
            artifact.fill = "green";
            this.$firebaseRefs.artifacts.push(artifact);
            break;
          case "polyline":
            artifact.type = "polyline";
            artifact.x = 400;
            artifact.y = 300;
            artifact.polylinePoints = "0,0 100,50 50,100";
            artifact.stroke.width = 5;
            artifact.fill = "red";
            this.$firebaseRefs.artifacts.push(artifact);
            break;
          case "polygon":
            artifact.type = "polygon";
            artifact.x = 100;
            artifact.y = 120;
            artifact.polyString =
              "50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40";
            artifact.stroke.width = 10;
            artifact.fill = "green";
            this.$firebaseRefs.artifacts.push(artifact);
            break;
          case "path":
            artifact.type = "path";
            artifact.x = 100;
            artifact.y = 120;
            artifact.pathString =
              "M0 0 H50 A20 20 0 1 0 100 50 v25 C50 125 0 85 0 85 z";
            artifact.stroke.width = 10;
            artifact.stroke.color = "lightgray";
            (artifact.stroke.linecap = "round"), (artifact.linejoin = "round");
            this.$firebaseRefs.artifacts.push(artifact);
            break;
          case "text":
            artifact.type = "text";
            artifact.x = 300;
            artifact.y = 120;
            artifact.text = "Colorless green ideas sleep furiously";
            artifact.font.fill = "black";
            artifact.font.family = "Helvetica";
            this.$firebaseRefs.artifacts.push(artifact);
            break;
          default:
            console.log("No artifact to create");
        }
      }
    }
  },
  computed: {
    srcURL() {
      return `https://png.icons8.com/${this.icon}/win10/36/ffffff`;
    }
  }
};
</script>
<style scoped>
.icon {
  border: 1px solid white;
  cursor: pointer;
}
</style>
