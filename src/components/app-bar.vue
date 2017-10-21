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
                <v-list-tile v-for="item in navDrawerItems" :key="item.title">
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
        <v-tabs dark fixed centered>
            <v-toolbar
                extended
                dark
            >
            <!--v-if="isLoggedIn" -->
                <v-toolbar-side-icon
                   @click.stop="drawerIsOpen = !drawerIsOpen"
                ></v-toolbar-side-icon>
                <v-spacer></v-spacer>
                <v-toolbar-title slot="extension" class="display-2">Saboura</v-toolbar-title>
            </v-toolbar>
            <v-tabs-bar class="cyan">
                <v-tabs-slider color="yellow"></v-tabs-slider>
                <v-tabs-item
                    v-for="(item, i) in appBarNavItems"
                    :key="i"
                    :href="'#tab-' + (i + 1)"
                >
                <span @click="onHandleRoute(item.path)">{{ item.title }}</span>
                </v-tabs-item>
            </v-tabs-bar>
        </v-tabs>
    </div>
</template>
<script>
import FormHelper from './form-helper'
export default {
  name: 'Appbar',
  data () {
      return {
            appBarNavItems: [
                {title: 'Home', path: '/'},
                {title: 'Create sandbox', path: '/whiteboard-sandbox'},
                {title: 'View sandbox', path: '/whiteboard-sandbox'},
                {title: 'Login', path: '/user-login'},
                {title: 'Register', path: '/user-registration'},
            ],
            currentUser: '',
            email: '',
            password: '',
            valid: false,
            navDrawerItems: [
                {title: 'Home', path: '/', icon: 'home'},
                {title: 'Dashboard', path: '/dashboard-page', icon: 'dashboard'},
                {title: 'Account', path: '/user-account', icon: 'account_box'},
                {title: 'Admin', path: '/user-admin', icon: 'gavel'},
            ],
            drawerIsOpen: false
      }
  },
  methods: {
      onHandleRoute (path) {
          console.log(path)
          this.$router.push({path})
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
      }
  },
  computed: {
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

