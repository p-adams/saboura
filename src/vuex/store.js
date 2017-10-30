import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    mockUsers: [],
    mockWhiteboards: [],
    loggedIn: false,
    currentUser: "",
    activeWhiteboards: [],
    sandboxes: [],
    contacts: [],
    toolbarOption: ""
  },
  mutations: {
    loadMockUsers(state, users) {
      state.mockUsers.push(...users);
    },
    loadMockWhiteboards(state, boards) {
      state.mockWhiteboards.push(...boards);
    },
    login(state) {
      state.loggedIn = true;
    },
    logout(state) {
      state.loggedIn = false;
    },
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setToolbarOption(state, option) {
      state.toolbarOption = option;
    }
  },
  actions: {
    loadMockUsers: (context, payload) => {
      context.commit("loadMockUsers", payload.users);
    },
    loadMockWhiteboards: (context, payload) => {
      context.commit("loadMockWhiteboards", payload.boards);
    },
    login: context => {
      context.commit("login");
    },
    logout: context => {
      context.commit("logout");
    },
    setCurrentUser: (context, payload) => {
      context.commit("setCurrentUser", payload.user);
    },
    setToolbarOption: (context, payload) => {
      context.commit("setToolbarOption", payload);
    }
  },
  getters: {
    showMockUsers: state => state.mockUsers,
    showMockWhiteboards: state => state.mockWhiteboards,
    isLoggedIn: state => state.loggedIn,
    showCurrentUser: state => state.currentUser,
    activeWhiteboardCount: state => state.activeWhiteboards.length,
    sandboxCount: state => state.sandboxes.length,
    contactsCount: state => state.contacts.length,
    selectedTool: state => state.toolbarOption
  }
});

export default store;
