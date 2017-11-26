<template>
  <v-container>
    <v-layout>
        <v-flex> 
        <drawing-area :whiteboard-id="id"></drawing-area>
        <v-card class="d-inline-block pa-5">
          <v-navigation-drawer  stateless permanent dark right value="true">
            <whiteboard-chat :whiteboard-id="id"></whiteboard-chat>
          </v-navigation-drawer>
        </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import DrawingArea from "./drawing-area";
import WhiteboardChat from "./whiteboard-chat";
export default {
  name: "MainWhiteboard",
  props: ["id"],
  components: {
    DrawingArea,
    WhiteboardChat
  }
};
</script>

