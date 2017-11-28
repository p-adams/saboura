import Vue from "vue";
import Vuex from "vuex";
import { DB } from "../firebase";
import firebase from "firebase";
import { createArtifact, addToWhiteboard } from "../api/api";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    whiteboardId: "",
    userId: "",
    loggedIn: false,
    currentUser: "",
    previousToolbarOption: "",
    toolbarOption: "",
    colorOption: "",
    strokeOption: "",
    penThicknessOption: "",
    borderColorOption: "",
    artifactFillOption: "",
    fontColorOption: "",
    textModalVisibility: false,
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
    setUserId(state, payload) {
      state.userId;
    },
    setColorOption(state, option) {
      state.colorOption = option.color;
    },
    setStrokeOption(state, option) {
      state.strokeOption = option.stroke;
    },
    setPenThicknessOption(state, option) {
      state.penThicknessOption = option.thickness;
    },
    setBorderColorOption(state, option) {
      state.borderColorOption = option.border;
    },
    setArtifactFillOption(state, option) {
      state.artifactFillOption = option.fill;
    },
    setFontSizeOption(state, option) {
      state.fontSizeOption = option.fontSize;
    },
    setFontColorOption(state, option) {
      state.fontColorOption = option.fontColor;
    },
    toggleTextModalVisibility(state, option) {
      state.textModalVisibility = option.visibility;
    }
  },
  actions: {
    loadMockUsers({ commit }, payload) {
      commit("loadMockUsers", payload.users);
    },
    login({ commit, state }) {
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
      createArtifact(title, state.whiteboardId, {});
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
    },
    setBorderColorOption({ commit, state }, payload) {
      commit("setBorderColorOption", payload);
    },
    setArtifactFillOption({ commit, state }, payload) {
      commit("setArtifactFillOption", payload);
    },
    setFontSizeOption({ commit, state }, payload) {
      commit("setFontSizeOption", payload);
    },
    setFontColorOption({ commit, state }, payload) {
      commit("setFontColorOption", payload);
    },
    toggleTextModalVisibility({ commit }, payload) {
      commit("toggleTextModalVisibility", payload);
    },
    createTextArtifact({ commit, state }, payload) {
      // close modal
      commit("toggleTextModalVisibility", { visibility: false });
      // create text artifact
      createArtifact("text", state.whiteboardId, payload);
    }
  },
  getters: {
    isLoggedIn: state => state.loggedIn,
    showCurrentUser: state => state.currentUser,
    selectedTool: state => state.toolbarOption,
    drawingToolbar: state => state.drawingToolbarIsVisible,
    getColorOption: state => state.colorOption,
    getStrokeOption: state => state.strokeOption,
    getPenThicknessOption: state => state.penThicknessOption,
    getBorderColorOption: state => state.borderColorOption,
    getArtifactFillOption: state => state.artifactFillOption,
    getFontSizeOption: state => state.getArtifactFillOption,
    getFontColorOption: state => state.getArtifactFillOption,
    showTextModal: state => state.textModalVisibility
  }
});

export default store;
