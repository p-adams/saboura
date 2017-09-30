<template>
  <v-layout>
      <v-flex xs12 sm6 offset-sm3>
          <h2>Dashboard</h2>
          <v-card light>
              <v-card-title primary-title>
                  <div>
                      <h3 class="headline mb-0">Create a whiteboard</h3>
                  </div>
              </v-card-title>
          </v-card>
      </v-flex>
       <v-flex xs12 sm6 offset-sm3>
          <v-card light>
              <v-card-title primary-title>
                  <div>
                      <h3 class="headline mb-0">Join a whiteboard</h3>
                  </div>
              </v-card-title>
          </v-card>
      </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'dashboard-page'
}
</script>
<style scoped>

</style>

