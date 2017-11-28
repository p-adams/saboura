<template>
  <v-container>
    <user-layout>
       <span slot="header">User Account</span>
        <v-list-tile>
            <v-list-tile-content>
                <v-list-tile-title>
                    Email: {{ showCurrentUser }}
                </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
    </user-layout>
  </v-container>
</template>
<script>
import UserLayout from "./user-layout";
import { DB } from "../firebase";
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  name: "UserAccount",
  mounted() {
    this.activeWhiteboards();
  },
  methods: {
    activeWhiteboards() {
      DB.ref("mockWhiteBoards").value(snap => {
        console.log(snap.val());
      });
    }
  },
  computed: {
    ...mapGetters([
      "showCurrentUser",
      "activeWhiteboardCount",
      "sandboxCount",
      "contactsCount"
    ])
  },
  components: {
    UserLayout
  }
};
</script>

