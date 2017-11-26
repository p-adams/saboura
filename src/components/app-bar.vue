<template>
    <div>
        <v-navigation-drawer
            temporary
            v-model="drawerIsOpen"
            absolute
            persistent
            dark
            overflow>
            <v-toolbar flat class="transparent">
                <v-list>
                    <v-list-tile>
                        <h6
                            v-if="isLoggedIn"
                            class="tile"
                        >Welcome {{showCurrentUser}}!</h6>
                        <h6
                            v-else
                            class="tile"
                        ><router-link class="link" to="/user-login">Login</router-link> or <router-link to="/user-registration">register</router-link> for account</h6>
                    </v-list-tile>
                </v-list>
            </v-toolbar>
            <v-divider></v-divider>
            <v-list
                v-show="isLoggedIn"
                dense
                class="pt-0"
            >   
                <v-list-tile v-for="item in navDrawerItems" :key="item.title">
                    <v-list-tile-action>
                        <v-icon dark>{{item.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title
                            class="route"
                            @click="onHandleRoute(item.path)">
                            <p>{{item.title}}</p>
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
            <div>
                Welcome {{ showCurrentUser === "" ? "Guest" : showCurrentUser }}
            </div>
            <v-toolbar-title slot="extension" class="display-1">Saboura</v-toolbar-title>
            </v-toolbar>
            <v-tabs-bar class="black">
                <v-tabs-slider color="white"></v-tabs-slider>
                <v-tabs-item
                    :key="1"
                    :href="'#tab-1'"
                >
                    <span @click="onHandleRoute('/')">Home</span>
                </v-tabs-item>
                <v-tabs-item
                    :key="2"
                    :href="'#tab-2'"
                >
                <span @click="onHandleRoute('/about')">About</span>
                </v-tabs-item>
                <v-tabs-item
                    :key="3"
                    :href="'#tab-3'"
                >
                <span @click="onHandleRoute('/dashboard-page')">Dashboard</span>
                </v-tabs-item>
                <v-tabs-item
                    v-show="!isLoggedIn"
                    :key="4"
                    :href="'#tab-4'"
                
                >
                <span @click="onHandleRoute('/user-login')">Login</span>
                </v-tabs-item>
                <v-tabs-item
                     v-show="!isLoggedIn"
                    :key="5"
                    :href="'#tab-5'"
                >
                <span @click="onHandleRoute('/user-registration')">Register</span>
                </v-tabs-item>
            
            
                <v-tabs-item
                     v-show="isLoggedIn"
                    :key="6"
                    :href="'#tab-6'"
                >
                <span @click="handleLogout">Logout</span>
                </v-tabs-item>
            </v-tabs-bar>
        </v-tabs>
    </div>
</template>
<script>
import { DB } from "../firebase";
import firebase from "firebase";
import { mapGetters } from "vuex";
export default {
  name: "Appbar",
  data() {
    return {
      currentUser: "",
      email: "",
      password: "",
      valid: false,
      navDrawerItems: [
        { title: "Home", path: "/", icon: "home" },
        { title: "Dashboard", path: "/dashboard-page", icon: "dashboard" },
        { title: "Account", path: "/user-account", icon: "account_box" },
        { title: "Admin", path: "/user-admin", icon: "gavel" }
      ],
      drawerIsOpen: true
    };
  },
  methods: {
    onHandleRoute(path) {
      console.log(path);
      this.$router.push({ path });
    },
    handleLogout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.dispatch("logout");
          this.$router.push({ path: "/" });
          console.log("goodbye");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapGetters(["isLoggedIn", "showCurrentUser"]),
    showCurrentUser() {
      const username = this.$store.getters.showCurrentUser;
      return (
        username.charAt(0).toUpperCase() +
        username.slice(1, username.indexOf("@"))
      );
    }
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.route {
  cursor: pointer;
  height: 50px;
  margin-top: 10px;
}
h6 {
  padding: 10px;
  margin-top: 25px;
}
</style>

