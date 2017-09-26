<template>
    <v-toolbar
    absolute
    class="white teal lighten-3"
    dark
    >
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Saboura</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items v-if="!isLoggedIn">
        <v-dialog v-model="loginDialog" persistent>
            <v-btn flat slot="activator">login</v-btn>
            <v-card>
                <v-card-title class="headline">login</v-card-title>
                <v-card-text>
                    <v-form v-model="valid">
                        <v-text-field
                            label="E-mail"
                            v-model="email"
                            :rules="emailRules"
                            :counter="20"
                            required
                        ></v-text-field>
                        <v-text-field
                            label="password"
                            type="password"
                            v-model="password"
                             :rules="passwordRules"
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
                <!-- allow warning to fade out on its own -->
                <transition>
                    <v-card-text v-show="showRegistrationFailure">     
                        <v-alert error value="true">
                        {{registrationWarning}}
                        </v-alert>
                    </v-card-text>
                </transition>
                <v-card-text>
                    <v-form v-model="valid">
                        <v-text-field
                            label="E-mail"
                            v-model="email"
                            :rules="emailRules"
                            :counter="20"
                            required
                        ></v-text-field>
                        <v-text-field
                            label="password"
                            type="password"
                            v-model="password"
                            :rules="passwordRules"
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
    <v-toolbar-items v-else>
        <v-btn @click="handleLogout" flat>logout</v-btn>
    </v-toolbar-items>
    </v-toolbar>
</template>
<script>
import {DB} from '../firebase'
import firebase from 'firebase'
export default {
  name: 'toolbar',
  data () {
      return {
          email: '',
          password: '',
          valid: false,
          emailRules: [
              (v) => !!v || 'E-mail is required',
              (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
          ],
          passwordRules: [
              (v) => !!v || 'Password is required',
              (v) => v.length > 6 || 'password must contain more than 6 characters'
          ],
          loginDialog: false,
          registerDialog: false,
          attemptedRegistration: false,
          badRegistrationAlert: false,
          registrationWarning: ''
      }
  },
  methods: {
      handleLogin () {
          this.loginDialog = false
          firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(result => {
                this.$store.dispatch('login')
                this.registerDialog = false
                this.clearInputs()
            })
            .catch(err =>  {
                const errCode = err.code 
                const errMsg = err.message 
                console.log(errCode)
                this.clearInputs()
            })
      },
      handleRegistration () {
          this.attemptedRegistration = true
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(result => {
                DB.ref('Users').push({
                    uid: result.uid,
                    username: this.email,
                    hasPen: false,
                    boards: ['mockWB']
                })
                this.$store.dispatch('login')
                this.registerDialog = false
                this.clearInputs()
            })
            .catch(err =>  {
                const errCode = err.code 
                const errMsg = err.message 
                console.log(errCode)
                this.registrationWarning = 'email already in use'
                this.clearInputs()
            })
      },
      handleRegistrationError () {

      },
      handleLogout () {
          firebase
            .auth()
            .signOut()
            .then(() => {
                this.$store.dispatch('logout')
                console.log('goodbye')
            }).catch(err => {
                console.log(err)
            })
      },
      clearInputs () {
        this.email = ''
        this.password = ''
      }
  },
  computed: {
      isLoggedIn () {
          return this.$store.getters.isLoggedIn
      },
      showRegistrationFailure () {
          return this.attemptedRegistration === true && this.isLoggedIn === false
      }
  }
}
</script>
