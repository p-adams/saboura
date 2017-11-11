<template>
    <v-layout>
        <v-flex xs16>
          <drawing-area></drawing-area>
        </v-flex>
    </v-layout>
</template>
<script>
import DrawingArea from "./drawing-area";
export default {
  name: "MainWhiteboard",
  components: {
    DrawingArea
  }
};
</script>

