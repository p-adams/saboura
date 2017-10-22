<template>
  <v-card>
      <v-card-title class="headline">{{ title }}</v-card-title>
      <slot name="transition"></slot>
      <v-card-text>
        <v-form>
            <slot name="elements"></slot>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="buttons"></slot>
      </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name:'FormHelper',
  props: {
      title: {
          type: String,
          default: ''
      }
  }
}
</script>

