<template>
    <v-toolbar
    absolute
    class="white teal lighten-3"
    dark
    >
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Saboura</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
        <v-dialog v-model="loginDialog" persistent>
            <v-btn flat slot="activator">login</v-btn>
            <v-card>
                <v-card-title class="headline">login</v-card-title>
                <v-card-text>
                    <v-form v-model="valid">
                        <v-text-field
                            label="username"
                            v-model="username"
                            :rules="usernameRules"
                            :counter="10"
                            required
                        ></v-text-field>
                        <v-text-field
                            label="password"
                            type="password"
                            v-model="password"
                            :counter="10"
                            required
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="teal--text darken-1"
                        flat="flat"
                        @click.native="loginDialog = false"
                    >cancel</v-btn>
                    <v-btn
                        class="teal--text darken-1"
                        flat="flat"
                        @click="handleLogin"
                    >login</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="registerDialog" persistent>
            <v-btn flat slot="activator">register</v-btn>
            <v-card>
                <v-card-title class="headline">Registration</v-card-title>
                <v-card-text>
                    registration form
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        class="teal--text darken-1"
                        flat="flat"
                        @click.native="registerDialog = false"
                    >cancel</v-btn>
                    <v-btn
                        class="teal--text darken-1"
                        flat="flat"
                        @click="handleRegistration"
                    >register</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-toolbar-items>
    </v-toolbar>
</template>
<script>
//import socket from '../socket.js'
export default {
  name: 'toolbar',
  data () {
      return {
          username: '',
          password: '',
          valid: false,
          usernameRules: [
              (v) => !!v || 'Username is required',
              (v) => v.length < 10 || 'Username must be less than 10 characters'
          ],
          loginDialog: false,
          registerDialog: false
      }
  },
  methods: {
      handleLogin () {
          this.loginDialog = false
          //socket.emit('user-login', {username: this.username, password: this.password})
          this.username = ''
          this.password = ''
      },
      handleRegistration () {
          this.registerDialog = false
      }
  }
}
</script>
