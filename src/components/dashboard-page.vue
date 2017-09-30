<template>
    <v-container>
        <h3>Dashboard</h3>
        <v-layout class="dashboard-layout">
            <v-flex
                class="flex"
                xs5
            >      
                <v-expansion-panel popout>
                    <v-expansion-panel-content>
                        <div slot="header">Create a whiteboard</div>
                        <v-card>
                            <v-card-text>
                                <div>
                                    <h3>Create whiteboard form</h3>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
            <v-flex
                class="flex"
                xs5
            >
               <v-expansion-panel popout>
                    <v-expansion-panel-content>
                        <div slot="header">Join a whiteboard</div>
                        <v-card>
                            <v-card-text>
                                <div>
                                    <h3>list of whiteboars</h3>
                                </div>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
  name: 'dashboard-page'
}
</script>
<style scoped>
    .dashboard-layout {
        margin-top: 60px;
    }
    h3 {
        text-align: center;
    }
    .flex {
        margin-left: 5%;
        padding: 10px;
    }
</style>

