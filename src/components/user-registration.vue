<template>
    <form-helper title="registration">
          <transition name="fade">
            <v-card-text v-show="showRegistrationFailure">     
                <v-alert error value="true">
                {{registrationWarning}}
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
                  class="teal--text darken-1"
                  flat="flat"
                  @click="cancel"
              >cancel</v-btn>
              <v-btn
                  class="teal--text darken-1"
                  flat="flat"
                  @click="handleRegistration"
              >register</v-btn>
          </div>
    </form-helper>
  
</template>
<script>
import {DB} from '../firebase'
import firebase from 'firebase'
import FormHelper from './form-helper'
export default {
  name: 'UserRegistration',
  data () {
      return {
          email: '',
          password: '',
          attemptedRegistration: false,
          registrationWarning: '',
          emailRules: [
            (v) => !!v || 'E-mail is required',
            (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
          ],
          passwordRules: [
            (v) => !!v || 'Password is required',
            (v) => v.length > 6 || 'password must contain more than 6 characters'
          ],
      }
  },
  methods: {
    setCurrentUser () {
        this.$store.dispatch('setCurrentUser', {user: firebase.auth().currentUser.email})
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
    showRegistrationFailure () {
        return this.attemptedRegistration === true && this.isLoggedIn === false
    },
  },
  components: {
      FormHelper
  }
}
</script>
