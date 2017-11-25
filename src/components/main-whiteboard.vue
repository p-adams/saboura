<template>
    <v-layout>
        <v-flex xs16>
          <drawing-area :whiteboard-id="id"></drawing-area>
        </v-flex>
    </v-layout>
</template>
<script>
import DrawingArea from "./drawing-area";
export default {
  name: "MainWhiteboard",
  props: ["id"],
  created() {
    console.log("loading route", this.id);
  },
  components: {
    DrawingArea
  }
};
</script>

