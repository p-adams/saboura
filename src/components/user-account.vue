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
         <v-divider></v-divider>
        <v-list-tile>
            <v-list-tile-content>
                <v-list-tile-title>
                    Active whiteboards: {{ activeWhiteboardCount }}
                </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
            <v-list-tile-content>
                <v-list-tile-title>
                    Sandboxes: {{ sandboxCount }}
                </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile>
            <v-list-tile-content>
                <v-list-tile-title>
                    Contacts: {{ contactsCount }}
                </v-list-tile-title>
            </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
    </user-layout>
  </v-container>
</template>
<script>
import UserLayout from './user-layout'
import { mapGetters } from 'vuex'
export default {
  name: 'UserAccount',
  computed: {
      ...mapGetters([
          'showCurrentUser',
          'activeWhiteboardCount',
          'sandboxCount',
          'contactsCount'
      ])
  },
  components: {
      UserLayout
  }
}
</script>

