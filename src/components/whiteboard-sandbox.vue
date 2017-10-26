<template>
  <v-container>
        <h5>Create in the sandbox, your creation is saved in local storage.</h5>
        <v-layout class="sandbox-menu">
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
    </v-container>
</template>
<script>
// makes use of local storage
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
  }
};
</script>


