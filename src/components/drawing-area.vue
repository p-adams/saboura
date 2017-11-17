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
        <whiteboard-base-layer></whiteboard-base-layer>
       <!-- base drawing layer -->
       <!-- render artifacts layer -->
        <artifacts-layer></artifacts-layer>
       <!-- render artifacts layer -->
      <!-- artifact toolbar for selected artifact -->
       <g v-show="artifactToolbarIsVisible">
        <rect
            :x="x"
            :y="y"
            width="100"
            height="180"
            fill="#E8EAF6"
          >   
        </rect>
        <rect
          class="draggable"
          @mousedown="handleMouseDown"
          @mouseup="handleMouseUp"
          :x="x + 20"
          :y="y + 5"
          width="60"
          height="20"
          fill="#FF7043"
        >   
        </rect>
        <foreignObject
          width="100"
          height="180"
          :x="x"
          :y="y + 30"
          >
          <v-container>
            <v-layout justify-space-around>
              <v-flex>
                <v-icon
                  large
                  @click="setArtifactTool('content_copy')"
                >content_copy</v-icon>
              </v-flex>
              <v-flex> 
               <v-icon
                @click="artifactToolbarIsVisible = false"
                large
                color="indigo"
               >close</v-icon> 
              </v-flex>
            </v-layout>
            <v-layout justify-space-around>
              <v-flex>
                <v-icon
                  large
                  @click="setArtifactTool('delete')"
                  >delete</v-icon>
              </v-flex>
              <v-flex>
                <v-icon
                  large
                  @click="setArtifactTool('format_shapes')"
                  >format_shapes</v-icon>
                </v-flex>
            </v-layout>
          </v-container>
        
        </foreignObject>
        </g>
         <!-- artifact toolbar for selected artifact -->
      </svg>
  </div>
</template>
<script>
import WhiteboardBaseLayer from "./whiteboard-base-layer";
import ArtifactsLayer from "./artifacts-layer";
import ToolbarMenu from "./toolbar-menu";
import { Draggable } from "./mixins/draggable";
import { mapActions } from "vuex";
export default {
  name: "SandboxBoard",
  mixins: [Draggable],
  data() {
    return {
      width: "100%",
      height: 600,
      x: 0,
      y: 0,
      artifactToolbarIsVisible: true
    };
  },
  methods: {
    ...mapActions(["setArtifactTool"])
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
</style>

