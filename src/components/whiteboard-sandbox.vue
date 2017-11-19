<template>
  <v-container>
        <v-layout
          v-if="sandboxMenu"
          class="sandbox-menu"
        >
          <v-flex xs3>
            <h6>Create in the sandbox, Not signed in? No problem, your creation is saved in local storage.</h6>
          </v-flex>
          <v-flex
              class="flex"
              xs5
          >
          <v-card>
              <v-btn @click="createSandbox">
                create a new sandbox
              </v-btn>
               <v-btn @click="loadSandbox">
                open saved sandbox
              </v-btn>   
          </v-card>
          </v-flex>
        </v-layout>
        <v-layout v-else>
          <v-flex xs12>
            <main-whiteboard></main-whiteboard>
          </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import MainWhiteboard from "./main-whiteboard";
export default {
  name: "WhiteboardSandbox",
  data() {
    return {
      sandboxMenu: true
    };
  },
  methods: {
    createSandbox() {
      this.sandboxMenu = false;
    },
    loadSandbox() {
      this.sandboxMenu = false;
    }
  },
  components: {
    MainWhiteboard
  }
};
</script>


