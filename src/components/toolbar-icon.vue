<template>
  <div>
    <!-- might make all icons img -->
    <v-icon
      v-if="isIcon"
      @click="selectTool(icon)"
      large
      class="icon"
    >
        {{ icon }}
    </v-icon>
    <img
      v-else
      @click="selectTool(icon)"
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
    }
  },
  methods: {
    ...mapActions(["setToolbarOption"]),
    selectTool(icon) {
      this.setToolbarOption(icon);
    }
  },
  computed: {
    srcURL() {
      // .png should be 38px
      return `./static/${this.icon}.png`;
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
