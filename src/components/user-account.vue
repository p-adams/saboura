<template>
  <v-container>
    <user-layout>
        <h5 slot="header">User Account</h5>
        <div>
            some content
        </div>
    </user-layout>
  </v-container>
</template>
<script>
import UserLayout from './user-layout'
export default {
  name: 'UserAccount',
  data () {
      return {
          userProfileCreated: false
      }
  },
  components: {
      UserLayout
  }
}
</script>

