<template>
    <v-layout>
        <v-flex xs8>
        <drawing-area></drawing-area>
        </v-flex xs8>
        <toolbar-menu></toolbar-menu>
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

