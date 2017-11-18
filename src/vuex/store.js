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
    artifactId: "",
    artifactTool: "",
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
      // reset toolbarOption so that same button can
      // be used to push components of same type
      state.toolbarOption = "";
      // store reference to previously selected option
      // so when drawing, drawing does not occuring when dragging a shape, for example.
      state.previousToolbarOption = state.toolbarOption;
      state.toolbarOption = option;
    },
    setArtifactTool(state, option) {
      state.artifactTool = option;
    },
    setDrawingToolbarVisibility(state, visibility) {
      state.drawingToolbarIsVisible = visibility;
    },
    removeArtifactFromWhiteboard(state, option) {
      state.artifactId = option;
      console.log(`artifact id: ${state.artifactId}`);
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
    setArtifactTool({ commit }, payload) {
      commit("setArtifactTool", payload);
    },
    setDrawingToolbarVisibility({ context }, payload) {
      commit("setDrawingToolbarVisibility", payload);
    },
    removeArtifactFromWhiteboard({ commit }, payload) {
      commit("removeArtifactFromWhiteboard", payload);
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
    drawingToolbar: state => state.drawingToolbarIsVisible,
    showArtifactId: state => state.artifactId
  }
});

export default store;
