<template>
  <v-container :style="{border: '1px solid red'}">
    <user-layout>
        <h5 slot="header">User Account</h5>
        <p>some content</p>
    </user-layout>
  </v-container>
</template>
<script>
import UserLayout from './user-layout'
export default {
  name: 'UserAccount',
  components: {
      UserLayout
  }
}
</script>

