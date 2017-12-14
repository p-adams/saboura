<template>
  <v-container>
    <v-layout
      v-if="showCurrentUser === ''"
    >
    <v-flex>
      <v-card>
        <v-card-title>Please login or register to view whiteboard</v-card-title>
      </v-card>
    </v-flex>
    </v-layout>
    <v-layout v-else>
        <v-flex>
        <v-chip color="primary" text-color="white">{{ boardName }}</v-chip>
        <v-chip color="primary" text-color="white">{{ boardDescription }}</v-chip>
        <v-chip color="primary" text-color="white">{{ dateToday }}</v-chip>
        <v-chip color="primary" text-color="white">{{ showCurrentUser }}</v-chip>
        <v-container>
          <v-layout>
            <v-flex>
              <h6>Whiteboard controls</h6>
              <span>shift + click on shape to resize, alt + click on shape to color border, command + click on shape to fill</span>
            </v-flex>
          </v-layout>
        </v-container>
        <drawing-area :whiteboard-id="id"></drawing-area>
          <v-navigation-drawer  stateless permanent dark right value="true">
            <whiteboard-chat :whiteboard-id="id"></whiteboard-chat>
          </v-navigation-drawer>
          <v-container v-if="showTextModal">
           <v-layout>
             <v-flex>
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
             </v-flex>
           </v-layout>
         </v-container>
        </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import moment from "moment";
import DrawingArea from "./drawing-area";
import WhiteboardChat from "./whiteboard-chat";
import { DB } from "../firebase";
import firebase from "firebase";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "MainWhiteboard",
  props: ["id"],
  mounted() {
    this.interval = setInterval(this.date, 1000);
    DB.ref(`mockWhiteboards/${this.id}`).on("value", snap => {
      const snapshot = snap.val();
      this.boardName = snapshot.name;
      this.boardDescription = snapshot.description;
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  data() {
    return {
      dateToday: "",
      boardName: "",
      boardDescription: "",
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
    },
    date() {
      this.dateToday = moment().format("h:mm:ss a");
    }
  },
  computed: {
    ...mapGetters(["showCurrentUser", "showTextModal"])
  },
  components: {
    DrawingArea,
    WhiteboardChat
  }
};
</script>
<style scoped>
.grey {
  border: 1px solid red;
}
</style>


