<template>
  <form-helper title="login">
    <transition name="fade">
      <v-card-text v-if="showLoginFailure">     
          <v-alert error value="true">
              {{loginWarning}}
          </v-alert>
      </v-card-text>
    </transition>
    <div slot="elements">
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
    </div>
    <div slot="buttons">
      <v-btn
        flat="flat"
        @click="cancel"
      >cancel</v-btn>
      <v-btn
        flat="flat"
        @click="handleLogin"
      >login</v-btn>
    </div>
  </form-helper>
</template>
<script>
import {DB} from '../firebase'
import firebase from 'firebase'
import FormHelper from './form-helper'
export default {
  name: 'UserLogin',
  data () {
    return {
      email: '',
      password: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length > 6 || 'password must contain more than 6 characters'
      ],
      attemptedLogin: false,
      loginWarning: ''
    }
  },
  methods: {
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
      handleLoginErrorAlert () {
        setTimeout(() => {
            this.attemptedLogin = false
        }, 2000)
      },
      cancel () {
        this.$router.push({path: '/'})
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
    showLoginFailure () {
          return this.attemptedLogin === true && this.isLoggedIn === false
    },
  },
  components: {
      FormHelper
  }
}
</script>
