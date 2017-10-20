<template>
  <v-container
    class="container"
    grid-list-xl
  >
    <v-layout
    row
    wrap>
    <v-flex
        xs10
        offset-xs1>
        <v-card dark>
            <v-toolbar light>
                <v-toolbar-title>
                    <slot name="header"></slot>
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-list>
                <slot></slot>
            </v-list>
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


