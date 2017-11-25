<template>
    <v-container>
        <h3>Dashboard</h3>
        <v-layout class="dashboard-layout">
            <v-flex
                class="flex"
                xs5
            >      
                <v-expansion-panel popout light>
                    <v-expansion-panel-content>
                        <div slot="header">
                            <h5>Create a whiteboard</h5>
                        </div>
                        <v-card>
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
               <v-expansion-panel popout light>
                    <v-expansion-panel-content>
                        <div slot="header">
                            <h5>Join a whiteboard</h5>
                        </div>
                        <v-card>
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
                                                <a href="#">{{ whiteboard.name }}</a>
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
export default {
  name: "DashboardPage",
  firebase: {
    whiteboards: DB.ref("mockWhiteboards")
  },
  created() {
    console.log("created");
    // this.loadWhiteboards();
  },
  data() {
    return {
      whiteboards: [],
      boardName: "",
      boardDescription: "",
      creationSuccess: false,
      success: true
    };
  },
  methods: {
    loadWhiteboards() {
      this.$firebaseRefs.whiteboards.child("testWB").set({
        cuid: cuid(),
        name: "testWB",
        description: "a test whiteboard"
      });

      this.$firebaseRefs.whiteboards
        .child("testWB")
        .child("collaborators")
        .push({ name: "John Smith" });

      this.$firebaseRefs.whiteboards
        .child("testWB")
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
      alert("create whiteboard");
    },
    participantsCount(participants) {
      let count = 0;
      for (let p in participants) count++;
      return count;
    }
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
  border: 1px solid lightgray;
  background: white;
  height: 175px;
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

