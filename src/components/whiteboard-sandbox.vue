<template>
  <v-container>
        <h6>Create in the sandbox, Not signed in? No problem, your creation is saved in local storage.</h6>
        <v-layout
          v-if="sandboxMenu"
          class="sandbox-menu"
        >
          <v-flex
              class="flex"
              xs5
          >
          <v-card>
            <v-card-content>
              <v-btn @click="createSandbox">
                create a new sandbox
              </v-btn>
            </v-card-content>
          </v-card>
          </v-flex>
          <v-flex
              class="flex"
              xs5
          >
          <v-card>
            <v-card-content>
              <v-btn>
                open saved sandbox
              </v-btn>
            </v-card-content>
          </v-card>
          </v-flex>
        </v-layout>
        <v-layout v-else>
          <v-flex xs12>
            <sandbox-display></sandbox-display>
          </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import SandboxDisplay from "./sandbox-display";
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
      this.initBoard();
    },
    initBoard() {
      console.log("initializing board...");
    }
  },
  components: {
    SandboxDisplay
  }
};
</script>


