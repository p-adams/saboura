<template>
  <v-container>
        <v-layout>
          <v-flex>
            <v-container
              v-if="sandboxMenu"
              class="sandbox-menu">
              <v-layout>
                <v-flex>
                  <v-card>
                    <v-container>
                      <v-layout>
                        <v-flex>
                          <v-card-title>Create in the sandbox. You must create an account to save your progress.</v-card-title>
                          <v-card-content>
                          <v-btn @click="createSandbox">
                          create a new sandbox
                          </v-btn>
                          <v-btn @click="loadSandbox">
                          open saved sandbox
                          </v-btn>   
                          </v-card-content>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container> 
            <v-container v-else>
              <v-layout>
              <v-flex xs12>
                <main-whiteboard></main-whiteboard>
              </v-flex>
              </v-layout>
            </v-container>
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
<style scoped>

</style>


