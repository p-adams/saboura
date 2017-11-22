<template>
  <div class="about-page">
    <v-container>
      <v-layout>
        <p>About Saboura</p>
        <p>temp chat placement</p>
        <whiteboard-chat></whiteboard-chat>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
import WhiteboardChat from "./whiteboard-chat";
export default {
  name: "about",
  components: {
    WhiteboardChat
  }
};
</script>
<style scoped>
/* setting margin-top moves parent div down too! */

h1 {
  color: white;
}
</style>


