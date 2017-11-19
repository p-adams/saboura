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
      this.setToolbarOption(title);
      if (DRAWABLE_ARTIFACTS.indexOf(title) !== -1) {
        switch (title) {
          case "rectangle":
            // create default rectangle
            const rect = {
              type: "rectangle",
              x: 200,
              y: 100,
              width: 200,
              height: 75,
              fill: "orange"
            };
            this.$firebaseRefs.artifacts.push(rect);
            break;
          default:
            console.log("No artifact to create");
        }
      }
    }
  },
  computed: {
    srcURL() {
      // .png should be 38px
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
