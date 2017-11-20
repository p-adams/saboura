<template>
  <div>
    <!-- might make all icons img -->
    <v-icon
      v-if="isIcon"
      @click="setToolbarOptionAndCreateArtifact(title)"
      large
      class="icon"
    >
        {{ icon }}
    </v-icon>
    <img
      v-else
      @click="setToolbarOptionAndCreateArtifact(title)"
      class="icon"
      :src="srcURL"  
    />
  </div>
</template>
<script>
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
  data() {
    return {
      items: []
    };
  },
  methods: {
    ...mapActions(["setToolbarOptionAndCreateArtifact"])
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
