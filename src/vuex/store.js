import Vue from "vue";
import Vuex from "vuex";
import { createArtifact, addToWhiteboard } from "../api/api";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    whiteboardId: "",
    loggedIn: false,
    currentUser: "",
    previousToolbarOption: "",
    toolbarOption: "",
    colorOption: "",
    strokeOption: "",
    penThicknessOption: "",
    drawingToolbarIsVisible: false
  },
  mutations: {
    loadMockUsers(state, users) {
      state.mockUsers.push(...users);
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
      state.toolbarOption = "";
      // store reference to previously selected option
      // so when drawing, drawing does not occuring when dragging a shape, for example.
      state.previousToolbarOption = state.toolbarOption;
      state.toolbarOption = option;
    },
    setDrawingToolbarVisibility(state, visibility) {
      state.drawingToolbarIsVisible = visibility;
    },
    setWhiteboardId(state, options) {
      state.whiteboardId = options.id;
    },
    setColorOption(state, option) {
      state.colorOption = option.color;
    },
    setStrokeOption(state, option) {
      state.strokeOption = option.stroke;
    },
    setPenThicknessOption(state, option) {
      state.penThicknessOption = option.thickness;
    }
  },
  actions: {
    loadMockUsers({ commit }, payload) {
      commit("loadMockUsers", payload.users);
    },
    login({ commit }) {
      commit("login");
    },
    logout({ commit, state }) {
      commit("logout");
    },
    setCurrentUser({ commit }, payload) {
      commit("setCurrentUser", payload.user);
    },
    restorePreviousToolbarOption({ commit, state }) {
      commit("setToolbarOption", state.previousToolbarOption);
    },
    setToolbarOptionAndCreateArtifact({ commit, state }, title) {
      // set the toolbar option
      commit("setToolbarOption", title);
      // create artifact
      createArtifact(title, state.whiteboardId);
    },
    setDrawingToolbarVisibility({ context }, payload) {
      commit("setDrawingToolbarVisibility", payload);
    },
    setWhiteboardId({ commit, state }, payload) {
      commit("setWhiteboardId", payload);
      addToWhiteboard(state.whiteboardId, state.currentUser);
    },
    setColorOption({ commit, state }, payload) {
      commit("setColorOption", payload);
    },
    setStrokeOption({ commit, state }, payload) {
      commit("setStrokeOption", payload);
    },
    setPenThicknessOption({ commit, state }, payload) {
      commit("setPenThicknessOption", payload);
    }
  },
  getters: {
    isLoggedIn: state => state.loggedIn,
    showCurrentUser: state => state.currentUser,
    selectedTool: state => state.toolbarOption,
    drawingToolbar: state => state.drawingToolbarIsVisible,
    getColorOption: state => state.colorOption,
    getStrokeOption: state => state.strokeOption,
    getPenThicknessOption: state => state.penThicknessOption
  }
});

export default store;
