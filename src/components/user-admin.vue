<template>
  <v-container>
    <user-layout>
        <h5 slot="header">User Admin</h5>
        <p>some content</p>
    </user-layout>
  </v-container>
</template>
<script>
import UserLayout from './user-layout'
export default {
  name: 'UserAdmin',
  components: {
      UserLayout
  }
}
</script>

