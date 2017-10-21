<template>
    <div>
        <v-navigation-drawer
            v-model="drawerIsOpen"
            absolute
            persistent
            dark
            overflow>
            <v-toolbar flat class="transparent">
               <v-list>
                   <v-list-tile>
                       <h6 class="tile"
                        >Welcome {{showCurrentUser}}!</h6>
                   </v-list-tile>
               </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list dense class="pt-0">   
                <v-list-tile v-for="item in navItems" :key="item.title">
                    <v-list-tile-action>
                        <v-icon dark>{{item.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title
                            class="route"
                            @click="onHandleRoute(item.path)">
                            <h6>{{item.title}}</h6>
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
        absolute
        dark
        >
        <v-toolbar-side-icon
                v-if="isLoggedIn"
                @click.stop="drawerIsOpen = !drawerIsOpen"
        ></v-toolbar-side-icon>
        <v-toolbar-title>Saboura</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="!isLoggedIn">
            <v-dialog v-model="loginDialog" persistent>
                <v-btn flat slot="activator">login</v-btn>
                <v-card>
                    <v-card-title class="headline">login</v-card-title>
                        <transition name="fade">
                            <v-card-text v-if="showLoginFailure">     
                                <v-alert error value="true">
                                    {{loginWarning}}
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
                            flat="flat"
                            @click.native="loginDialog = false"
                        >cancel</v-btn>
                        <v-btn
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
                    <transition name="fade">
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
    </div>
</template>
<script>
import {DB} from '../firebase'
import firebase from 'firebase'
export default {
  name: 'Appbar',
  data () {
      return {
            currentUser: '',
            email: '',
            password: '',
            valid: false,
            navItems: [
                {title: 'Home', path: '/', icon: 'home'},
                {title: 'Dashboard', path: '/dashboard-page', icon: 'dashboard'},
                {title: 'Account', path: '/user-account', icon: 'account_box'},
                {title: 'Admin', path: '/user-admin', icon: 'gavel'},
            ],
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
            attemptedLogin: false,
            registrationWarning: '',
            loginWarning: '',
            drawerIsOpen: false
      }
  },
  methods: {
      onHandleRoute (path) {
          this.$router.push({path})
      },
      setCurrentUser () {
          this.$store.dispatch('setCurrentUser', {user: firebase.auth().currentUser.email})
      },
      handleLogin () {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(result => {
                this.$store.dispatch('login')
                this.attemptedLogin = true
                this.setCurrentUser()
                this.loginDialog = false
                this.handleLoginErrorAlert()
                this.clearInputs()
            })
            .catch(err =>  {
                const errCode = err.code 
                const errMsg = err.message 
                console.log(errCode)
                this.attemptedLogin = true
                this.loginWarning = this.email === '' || this.password === '' ? 'please enter email and password' : 'user account not found'
                this.handleLoginErrorAlert()
                this.clearInputs()
            })
      },
      handleRegistration () {
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
                this.setCurrentUser()
                this.attemptedRegistration = true
                this.registerDialog = false
                this.clearInputs()
            })
            .catch(err =>  {
                const errCode = err.code 
                const errMsg = err.message 
                console.log(errCode)
                this.attemptedRegistration = true
                this.registrationWarning = this.email === '' || this.password === '' ? 'please enter email and password':'email already in use'
                this.handleRegistrationErrorAlert()
                this.clearInputs()
            })
      },
      handleRegistrationErrorAlert () {
          setTimeout(() => {
              this.attemptedRegistration = false
          }, 2000)
      },
      handleLoginErrorAlert () {
          setTimeout(() => {
              this.attemptedLogin = false
          }, 2000)
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
      },
      showLoginFailure () {
          return this.attemptedLogin === true && this.isLoggedIn === false
      },
      showCurrentUser () {
          const username = this.$store.getters.showCurrentUser
          return username.charAt(0).toUpperCase() + username.slice(1, username.indexOf('@'))
      }
  }
}
</script>
<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0
    }
    .tile {
        color: teal;
    }
    .route {
        cursor: pointer;
        height: 50px;
        margin-top: 10px;
    }
</style>

