<template>
  <v-container
        class="container"
        grid-list-xl
        text-xs-center>
      <v-layout
        row
        wrap>
        <v-flex
            xs10
            offset-xs1>
            <v-card dark>
                <header>
                    <slot name="header"></slot>
                </header>
                <main>
                    <slot></slot>
                </main>
            </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>
<script>
export default {
  name: 'UserLayout'
}
</script>
<style scoped>
    .container {
        border: 1px solid green;
        color: darkgray;
    }
</style>


