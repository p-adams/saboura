<template>
  <v-icon
    @click="selectTool(icon)"
    large
    class="icon"
  >
      {{ icon }}
  </v-icon>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "ToolbarIcon",
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  methods: {
    ...mapActions(["setToolbarOption"]),
    selectTool(icon) {
      this.setToolbarOption(icon);
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
