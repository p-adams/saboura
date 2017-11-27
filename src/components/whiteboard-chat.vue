<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex>
       <v-card>
         <v-container>
           <v-layout>
             <v-flex xs>
          <!-- top toolbar -->
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
                <v-card-title>Collaborators: {{showCollabs.length}}</v-card-title>
                <v-container
                  style="max-height: 200px"
                  class="scroll-y"
                  id="scroll-target"
                >
                  <v-layout
                    column
                    v-scroll="{
                      target: '#scroll-target',
                      callback: this.onScroll
                    }"
                    style="height: 1500px"
                  >
                    <v-flex>
                      <v-list>
                        <template v-for="(collaborator, index) in showCollabs">
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
            <v-flex xs12>
              <v-card>

                <v-card-title>Messages</v-card-title>

                <!-- show chat messages -->
                <v-container
                  style="max-height: 400px"
                  class="scroll-y"
                  id="scroll-target"
                >
                  <v-layout
                    column
                    v-scroll="{
                      target: '#scroll-target',
                      callback: this.onScroll
                    }"
                    style="height: 2000px"
                  >
                    <v-flex >
                      <v-list>
                        <template v-for="(message, index) in messages">
                          <v-list-tile :key="index">
                            <v-list-tile-content>
                              <span :style="{fontSize: '10px'}">{{ message.author }} said: {{ message.body }}</span>
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
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card>
            </v-flex>
        </v-layout>
        </v-container>

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
import uniqBy from "lodash/uniqBy";
export default {
  name: "WhiteboardChat",
  props: {
    whiteboardId: {
      type: String,
      required: true
    }
  },
  created() {
    this.$bindAsArray(
      "collaborators",
      DB.ref(`mockWhiteboards/${this.whiteboardId}/collaborators`)
    );
    this.$bindAsArray(
      "messages",
      DB.ref(`mockWhiteboards/${this.whiteboardId}/messages`)
    );
  },
  data() {
    return {
      message: ""
    };
  },
  methods: {
    onScroll() {},
    generateMockMessages() {
      DB.ref(`mockWhiteboards/${this.whiteboardId}/messages`).push({
        body: "Hi",
        author: "John",
        time: moment().format("h:mm:ss a")
      });
    },
    selectCollaborator(collaborator) {
      console.log(collaborator);
    },
    sendMessage() {
      const author =
        this.showCurrentUser === "" ? "Guest" : this.showCurrentUser;
      this.$firebaseRefs.messages.push({
        body: this.message,
        author: author,
        time: moment().format("h:mm:ss a")
      });
      this.message = " ";
    }
  },
  computed: {
    ...mapGetters(["showCurrentUser"]),
    showCollabs() {
      return uniqBy(this.collaborators, "name");
    }
  }
};
</script>
<style scoped>
input {
  border: 1px solid lightblue;
  border-radius: 4px;
  height: 35px;
  width: 175px;
  font-size: 16px;
  color: black;
  background: white;
}
</style>

