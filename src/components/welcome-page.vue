<template>
  <div class="welcome-page">
    <v-container grid-list-xl text-xs-center>
      <v-layout>
        <v-flex>
            <h6 class="tagline">Our collaborative, interactive whiteboards make sharing ideas with colleagues a breeze</h6>
            <v-icon x-large>picture_in_picture</v-icon>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "WelcomePage"
};
</script>
<style scoped>
.welcome-page {
  margin-top: 60px;
}
h3 {
  color: white;
  text-align: center;
}
.footer {
  text-align: center;
  position: fixed;
  bottom: 0;
}
</style>
