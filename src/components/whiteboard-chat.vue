<template>
  <v-container>
    <v-layout>
      <v-flex>
       <v-card>
        <v-toolbar>
          <v-toolbar-title>Chat</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-side-icon class="hidden-md-and-up"></v-toolbar-side-icon>
        </v-toolbar>
        <!-- list whiteboard collaborators -->
        <v-container>
          <v-layout>
            <v-flex>
              <v-card>
              <v-card-title>Collaborators</v-card-title>
              <v-container>
                <v-layout>
                  <v-flex>
                    <v-list>
                      <template v-for="(collaborator, index) in collaborators">
                        <v-list-tile :key="collaborator.name">
                          <v-list-tile-content>
                            <v-list-tile-title
                              :style="{cursor: 'pointer'}"
                              @click="selectCollaborator(collaborator.name)"
                              v-html="collaborator.name"
                            ></v-list-tile-title>
                          </v-list-tile-content>
                          <v-list-tile-action>
                            <v-icon
                              :style="{cursor: 'pointer'}"
                              :color="collaborator.active ? 'teal' : 'grey'">chat_bubble</v-icon>
                          </v-list-tile-action>
                        </v-list-tile>
                        <v-divider
                          v-if="index + 1 < collaborators.length"
                          :key="collaborator.name"
                        ></v-divider>
                      </template>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-container>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>

      <!-- chat area  -->
        <v-container>
          <v-layout>
            <v-flex>
              <v-card>
                <v-card-title>Messages</v-card-title>

                <!-- show chat messages -->
                <v-container>
                  <v-layout>
                    <v-flex>
                    </v-flex>
                  </v-layout>
                </v-container>


                <!-- type message in text field -->
                <v-container>
                  <v-layout>
                    <v-flex>
                      <v-text-field
                        autofocus
                        @keypress.enter="sendMessage"
                        v-model="message"
                        placeholder="type message"
                        :counter="75"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>



              </v-card>
            </v-flex>
        </v-layout>
        </v-container>
       </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "WhiteboardChat",
  data() {
    return {
      message: "",
      collaborators: [
        { active: true, name: "John Smith" },
        { active: false, name: "Mary Peters" }
      ]
    };
  },
  methods: {
    selectCollaborator(collaborator) {
      console.log(collaborator);
    },
    sendMessage() {
      console.log(this.message);
      // not clearing text area
      this.message = " ";
    }
  }
};
</script>
<style scoped>

</style>

