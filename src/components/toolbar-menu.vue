<template>
  <svg
    class="toolbar-menu"
    ref="toolbar"
    width="200"
    height="707"
  >
  <foreignObject width="300" height="707" x="0" y="0">
   <v-navigation-drawer light right>
    <v-toolbar flat>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Toolbar
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list dense class="pt-0">
      <v-list-tile v-for="item in items" :key="item.title" @click="">
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  </foreignObject>
  </svg>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ToolbarMenu",
  data() {
    return {
      items: [
        { title: "Shapes", icon: "question_answer" },
        { title: "Lines", icon: "question_answer" },
        { title: "Drawing", icon: "question_answer" },
        { title: "Text", icon: "question_answer" },
        { title: "UML", icon: "question_answer" },
        { title: "Post-it", icon: "question_answer" },
        { title: "Index card", icon: "question_answer" }
      ]
    };
  },
  computed: {
    ...mapGetters(["drawingToolbar"])
  }
};
</script>
<style scoped>
.toolbar-menu {
  border: 5px solid lightgray;
}
.draggable {
  cursor: grabbing;
}
</style>

