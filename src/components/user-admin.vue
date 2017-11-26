<template>
  <v-container>
    <user-layout>
        <span slot="header">User Admin</span>
        <template v-for="(task, index) in adminTask">
            <v-list-tile :key="index">
                <v-list-tile-content>
                    <v-list-tile-title
                        class="admin-item"
                        @click="getAdminTask(task.title)"
                    >
                        {{ task.title }}
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            <v-divider :key="index"></v-divider>
        </template>
    </user-layout>
  </v-container>
</template>
<script>
import UserLayout from "./user-layout";
export default {
  name: "UserAdmin",
  data() {
    return {
      adminTask: [{ title: "whiteboards" }, { title: "contacts" }]
    };
  },
  methods: {
    getAdminTask(task) {
      console.log(`task ${task}`);
    }
  },
  components: {
    UserLayout
  }
};
</script>
<style scoped>
.admin-item {
  cursor: pointer;
}
</style>

