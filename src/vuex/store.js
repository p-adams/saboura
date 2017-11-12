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
    previousToolbarOption: "",
    toolbarOption: "",
    drawingToolbarIsVisible: false
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
      // store reference to previously selected option
      // so when drawing, drawing does not occuring when dragging a shape, for example.
      state.previousToolbarOption = state.toolbarOption;
      state.toolbarOption = option;
    },
    setDrawingToolbarVisibility(state, visibility) {
      state.drawingToolbarIsVisible = visibility;
    }
  },
  actions: {
    loadMockUsers({ commit }, payload) {
      commit("loadMockUsers", payload.users);
    },
    loadMockWhiteboards({ commit }, payload) {
      commit("loadMockWhiteboards", payload.boards);
    },
    login({ commit }) {
      commit("login");
    },
    logout({ commit }) {
      commit("logout");
    },
    setCurrentUser({ commit }, payload) {
      commit("setCurrentUser", payload.user);
    },
    restorePreviousToolbarOption({ commit, state }) {
      commit("setToolbarOption", state.previousToolbarOption);
    },
    setToolbarOption({ commit }, payload) {
      commit("setToolbarOption", payload);
    },
    setDrawingToolbarVisibility({ context }, payload) {
      commit("setDrawingToolbarVisibility", payload);
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
    selectedTool: state => state.toolbarOption,
    drawingToolbar: state => state.drawingToolbarIsVisible
  }
});

export default store;
