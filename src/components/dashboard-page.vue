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
                                    <v-form>
                                        <v-text-field
                                        label="Whiteboard name"
                                        :counter="10"
                                        required
                                        ></v-text-field>
                                        <v-text-field
                                        label="Whiteboard description"
                                        :counter="75"
                                        required
                                        ></v-text-field>
                                        <v-btn
                                            primary
                                            dark>Create whiteboard</v-btn>
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
                                    <v-list-tile
                                            v-for="whiteboard in whiteboards"
                                            :key="whiteboard.index">
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{whiteboard.name}}</v-list-tile-title>
                                            <v-list-tile-sub-title>
                                                {{whiteboard.boardData.participants}}
                                            </v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
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
import {DB} from '../firebase'
import firebase from 'firebase'
export default {
  name: 'dashboard-page',
  created () {
      console.log('created')
      this.loadWhiteboards()
  },
  data () {
      return {
          whiteboards: []
      }
  },
  methods: {
      loadWhiteboards () {
          DB.ref('WhiteBoards').on('value', snapshot => {
              console.log(snapshot.val())
              Object.keys(snapshot.val()).forEach(key => {
                  console.log(snapshot.val()[key])
                  this.whiteboards.push({name: key, boardData: snapshot.val()[key]})
              })
          })
      }
  }
}
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
</style>

