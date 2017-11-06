<template>
    <v-layout>
        <v-flex xs16>
          <drawing-area></drawing-area>
        </v-flex>
        <v-flex xs3>
          <toolbar-menu></toolbar-menu>
        </v-flex>
    </v-layout>
</template>
<script>
import DrawingArea from "./drawing-area";
import ToolbarMenu from "./toolbar-menu";
export default {
  name: "MainWhiteboard",
  components: {
    ToolbarMenu,
    DrawingArea
  }
};
</script>

