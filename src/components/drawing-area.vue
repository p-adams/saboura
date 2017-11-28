<template>
  <div>
    <!-- drawing area top toolbar -->
      <toolbar-menu></toolbar-menu>
    <!-- drawing area top toolbar -->
      <svg
        :width="width"
        :height="height"
      >
      <!-- base drawing layer -->
        <whiteboard-base-layer :whiteboard-id="whiteboardId"></whiteboard-base-layer>
       <!-- base drawing layer -->
       <!-- render artifacts layer -->
        <artifacts-layer :whiteboard-id="whiteboardId"></artifacts-layer>
       <!-- render artifacts layer -->
       <foreignObject width="200" height="800" x="25" y="20">
         <v-container
          v-if="showTextModal"
          class="grey"
          >
           <v-layout>
             <v-flex>
               <div class="graph"></div>
              <v-form v-if="showTextModal" :style="{width: '175px'}">
                <v-text-field
                  v-model="text"
                  placeholder="text"
                >
                </v-text-field>
                <v-select
                  class="select"
                  v-model="fontSize"
                  v-bind:items="items"
                  label="Select"
                  single-line
                  bottom
                >
                </v-select>
                <v-btn
                  flat
                  small
                  @click="toggleTextModalVisibility({visibility: false})"
                >cancel</v-btn>
                <v-btn
                  flat
                  small
                  @click="getTextInput"
                >set text</v-btn>
              </v-form>
             </v-flex>
           </v-layout>
         </v-container>
       </foreignObject>
      </svg>
  </div>
</template>
<script>
import WhiteboardBaseLayer from "./whiteboard-base-layer";
import ArtifactsLayer from "./artifacts-layer";
import ToolbarMenu from "./toolbar-menu";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "DrawingArea",
  props: {
    whiteboardId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialog: false,
      width: "100%",
      height: 600,
      text: "",
      fontSize: "",
      items: [{ text: 12 }, { text: 18 }, { text: 24 }]
    };
  },
  methods: {
    ...mapActions(["toggleTextModalVisibility", "createTextArtifact"]),
    getTextInput() {
      this.createTextArtifact({
        text: this.text,
        fontSize: this.fontSize.text
      });
      this.text = "";
    }
  },
  computed: {
    ...mapGetters(["showTextModal"])
  },
  components: {
    ToolbarMenu,
    WhiteboardBaseLayer,
    ArtifactsLayer
  }
};
</script>
<style scoped>
.icon {
  background: "black";
  padding: 5px;
  cursor: pointer;
}
.draggable {
  cursor: move;
}
input,
select {
  background: white;
  color: black;
  border: 1px solid dimgray;
}
.select {
  color: black;
}
button {
  margin-top: 10px;
  padding: 5px;
  border: 1px solid white;
}
</style>

