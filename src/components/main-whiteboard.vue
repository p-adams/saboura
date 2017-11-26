<template>
  <v-container>
    <v-layout>
        <v-flex>
        <v-chip color="primary" text-color="white">{{ boardName }}</v-chip>
        <v-chip color="primary" text-color="white">{{ boardDescription }}</v-chip>
        <v-chip color="primary" text-color="white">{{ dateToday }}</v-chip>
        <v-chip color="primary" text-color="white">{{ showCurrentUser }}</v-chip>
        <drawing-area :whiteboard-id="id"></drawing-area>
          <v-navigation-drawer  stateless permanent dark right value="true">
            <whiteboard-chat :whiteboard-id="id"></whiteboard-chat>
          </v-navigation-drawer>
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
export default {
  name: "MainWhiteboard",
  props: ["id"],
  created() {
    this.$bindAsArray("wbdetails", DB.ref(`mockWhiteboards/${this.id}`));
  },
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
      boardDescription: ""
    };
  },
  methods: {
    date() {
      this.dateToday = moment().format("h:mm:ss a");
    }
  },
  computed: {
    ...mapGetters(["showCurrentUser"])
  },
  components: {
    DrawingArea,
    WhiteboardChat
  }
};
</script>

