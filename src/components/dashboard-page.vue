<template>
    <v-container>
        <h3 class="wall">Dashboard</h3>
        <!-- only if logged in/registered-->
        <v-layout v-if="!isLoggedIn">
            <v-flex>
                <v-card>
                    <v-card-title>Please login or register to view dashboard</v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout
            class="dashboard-layout"
            v-else
        >
            <v-flex
                class="flex"
                xs5
            >      
                <v-expansion-panel popout dark>
                    <v-expansion-panel-content>
                        <div slot="header">
                            <h5>Create a whiteboard</h5>
                        </div>
                        <v-card class="black">
                            <v-card-text>
                                <div>
                                    <v-alert info dismissible>
                                        Whiteboard created
                                    </v-alert>
                                </div>
                                <div>
                                    <v-form>
                                        <v-alert
                                            v-if="creationSuccess"
                                            v-model="success"
                                            success
                                            dismissible
                                        >
                                            Whiteboard created
                                        </v-alert>
                                        <v-text-field
                                        label="Whiteboard name"
                                        v-model="boardName"
                                        :counter="10"
                                        required
                                        ></v-text-field>
                                        <v-text-field
                                        label="Whiteboard description"
                                        v-model="boardDescription"
                                        :counter="75"
                                        required
                                        ></v-text-field>
                                        <v-btn
                                            @click="createWhiteboard"
                                            primary
                                            dark
                                        >Create whiteboard</v-btn>
                                    </v-form>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
            <v-flex
                class="flex"
                xs5
            >
               <v-expansion-panel popout dark>
                    <v-expansion-panel-content>
                        <div slot="header">
                            <h5>Join a whiteboard</h5>
                        </div>
                        <v-card class="black">
                            <v-card-text>
                                <div v-if="whiteboards.length === 0">
                                    <h6>no whiteboards to join</h6>
                                </div>
                                <div v-else>
                                    <v-list two-line>
                                    <v-list-tile
                                            class="tile-style"
                                            v-for="(whiteboard, key) in whiteboards"
                                            :key="key">
                                            
                                        <v-list-tile-content class="tile-content">
                                            <v-list-tile-title class="tile-title">
                                                <span
                                                    :style="{color: 'black', cursor: 'pointer'}"
                                                    @click="loadWhiteboard(whiteboard['.key'])"
                                                >{{ whiteboard.name }}</span>
                                            </v-list-tile-title>
                                            <v-list-tile-sub-title>
                                                    <div class="board-description">
                                                    <p>{{ whiteboard.description }}</p>
                                                    <div>
                                                        <!-- <span>({{participantsCount(whiteboard.boardData.participants)}}) user(s) currently in {{whiteboard.name}}</span> -->
                                                    </div>
                                                </div>
                                            </v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    </v-list>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
import { DB } from "../firebase";
import firebase from "firebase";
import cuid from "cuid";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "DashboardPage",
  firebase: {
    whiteboards: DB.ref("mockWhiteboards")
  },
  created() {
    console.log("created");
    // this.loadMockWhiteboards();
  },
  data() {
    return {
      boardName: "",
      boardDescription: "",
      creationSuccess: false,
      success: true
    };
  },
  methods: {
    ...mapActions(["setWhiteboardId"]),
    loadWhiteboard(id) {
      this.$router.push({ path: `/whiteboard/${id}` });
      this.setWhiteboardId({ id });
    },
    loadMockWhiteboards() {
      // create test DB
      let newWB = this.$firebaseRefs.whiteboards.push({
        name: "testWB",
        description: "a test whiteboard"
      });

      this.$firebaseRefs.whiteboards
        .child(newWB.key)
        .child("collaborators")
        .push({ name: "John Smith" });

      this.$firebaseRefs.whiteboards
        .child(newWB.key)
        .child("artifacts")
        .push({
          cuid: cuid(),
          type: "rectangle",
          transform: "",
          x: 20,
          y: 20,
          width: 200,
          height: 75,
          fill: "blue"
        });
    },
    createWhiteboard() {
      const newWB = this.$firebaseRefs.whiteboards.push({
        name: this.boardName,
        description: this.boardDescription
      });

      console.log("create whiteboard", newWB);
    },
    participantsCount(participants) {
      let count = 0;
      for (let p in participants) count++;
      return count;
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "showCurrentUser"])
  }
};
</script>
<style scoped>
.dashboard-layout {
  margin-top: 60px;
}
h3 {
  text-align: center;
}
.flex {
  margin-left: 5%;
  padding: 10px;
}
.tile-style {
  margin-top: 10px;
  padding: 10px;

  background: #424242;
  height: 100px;
}
.board-description {
  margin-top: 5px;
  color: darkgray;
}
.tile-title {
  margin-top: 15px;
}
.tile-content {
  padding: 0;
  height: 175px;
}
</style>

