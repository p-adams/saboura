<template>
    <v-layout>
        <v-flex xs8>
        <sandbox-board></sandbox-board>
        </v-flex xs8>
        <sandbox-toolbar></sandbox-toolbar>
    </v-layout>
</template>
<script>
import SandboxBoard from "./sandbox-board";
import SandboxToolbar from "./sandbox-toolbar";
export default {
  name: "SandboxDisplay",
  components: {
    SandboxBoard,
    SandboxToolbar
  }
};
</script>

