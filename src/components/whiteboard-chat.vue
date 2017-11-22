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
              <!-- add overflow/scroll -->
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
                 <!-- add overflow/scroll -->
                <v-container>
                  <v-layout>
                    <v-flex>
                      <v-list>
                        <template v-for="(message, index) in messages">
                          <v-list-tile :key="index">
                            <v-list-tile-content>
                              <span>{{ message.author }} ({{ message.time }}) said : {{ message.body }}</span>
                            </v-list-tile-content>
                           </v-list-tile>
                          <v-divider
                            v-if="index + 1 < messages.length"
                            :key="index"
                          ></v-divider>
                        </template>
                      </v-list>
                    </v-flex>
                  </v-layout>
                </v-container>


                <!-- type message in text field -->
                <v-container>
                  <v-layout>
                    <v-flex>
                      <input
                        autofocus
                        @keypress.enter="sendMessage"
                        v-model="message"
                        placeholder="type message"
                      ></input>
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
import moment from "moment";
import { DB } from "../firebase";
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  name: "WhiteboardChat",
  firebase: {
    messages: DB.ref("testMessages"),
    collaborators: DB.ref("testCollaborators")
  },
  created() {},
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
    generateMockMessages() {
      this.$firebaseRefs.messages.push({
        body: "Hi",
        author: "John",
        time: moment().format("h:mm:ss a")
      });
    },
    generateMockCollaborators() {
      this.$firebaseRefs.collaborators.push({
        active: true,
        name: "John Smith"
      });
      this.$firebaseRefs.collaborators.push({
        active: false,
        name: "Mary Smith"
      });
    },
    selectCollaborator(collaborator) {
      console.log(collaborator);
    },
    sendMessage() {
      this.$firebaseRefs.messages.push({
        body: this.message,
        author: "Guest",
        time: moment().format("h:mm:ss a")
      });
      this.message = " ";
    }
  },
  computed: {
    ...mapGetters(["showCurrentUser"])
  }
};
</script>
<style scoped>
input {
  border: 1px solid lightb;
  border-radius: 4px;
  height: 35px;
  width: 500px;
  font-size: 16px;
  padding: 5px;
  color: black;
  background: white;
}
</style>

