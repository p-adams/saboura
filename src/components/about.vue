<template>
  <div class="about-page">
    <v-container grid-list-xl text-xs-center>
      <v-layout>
        <v-flex>
          <h5>About Saboura</h5>
            <p>Saboura is a responsive web application for software development teams. Saboura uses a real-time database
              for seamless interactive collaboration sessions. Authenticated users can create new whiteboards or join an existing whiteboard.
              Apart from being able to express one's ideas on the whiteboard, Saboura features a real-time chat so that teams can communicate with one another.
            </p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "about"
};
</script>
<style scoped>
/* setting margin-top moves parent div down too! */
p {
  text-align: justify;
  text-justify: inter-word;
}
h1 {
  color: white;
}
</style>


