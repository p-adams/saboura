<template>
  <div class="welcome-page">
      <h6>Our collaborative, interactive whiteboards make sharing ideas with colleagues a breeze</h6>
      some cool animation here
      <h6>Just want to play around on the whiteboard? Enter the <router-link to="/whiteboard-sandbox">sandbox</router-link></h6>
  </div>
</template>
<script>
export default {
  
}
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
