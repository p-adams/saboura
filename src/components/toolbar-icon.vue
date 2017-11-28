<template>
  <div>
    <!-- might make all icons img -->
    <v-icon
      v-if="isIcon"
      @click="setToolbarOption"
      large
      class="icon"
    >
        {{ icon }}
    </v-icon>
    <img
      v-else
      @click="setToolbarOption"
      class="icon"
      :src="srcURL"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
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
    },
    size: {
      type: Number,
      default: 3
    },
    color: {
      type: String,
      default: "black"
    },
    iconSize: {
      type: Number
    }
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
    ...mapActions([
      "setToolbarOptionAndCreateArtifact",
      "setPenThicknessOption",
      "setColorOption",
      "setBorderColorOption",
      "setArtifactFillOption",
      "setFontSizeOption",
      "setFontColorOption",
      "toggleTextModalVisibility"
    ]),
    setToolbarOption() {
      if (this.title === "text") {
        this.toggleTextModalVisibility({ visibility: true });
      } else {
        // set main toolbar option
        this.setToolbarOptionAndCreateArtifact(this.title);
        this.setPenThicknessOption({ thickness: this.size });
        this.setColorOption({ color: this.color });
        this.setBorderColorOption({ border: this.color });
        this.setArtifactFillOption({ fill: this.color });
      }
    }
  },
  computed: {
    srcURL() {
      return `https://png.icons8.com/${this.icon}/win10/${this.iconSize}/${this
        .color}`;
    }
  }
};
</script>
<style scoped>
.icon {
  border: 1px solid dark;
  box-shadow: -2px 2px 2px 1px darkgray;
  cursor: pointer;
}
</style>
