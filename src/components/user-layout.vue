<template>
  <v-container :style="{border: '1px solid green'}">
      <header>
          <slot name="header"></slot>
      </header>
      <main>
          <slot></slot>
      </main>
  </v-container>
</template>
<script>
export default {
  name: 'UserLayout'
}
</script>
<style scoped>
    
</style>


