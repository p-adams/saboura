import Vue from "vue";
import Vuex from "vuex";
import remove from "lodash/remove";
import cuid from "cuid";
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
    rectangles: [],
    circles: [],
    ellipses: [],
    lines: [],
    polylines: [],
    polygons: [],
    paths: [],
    texts: [],
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
      state.toolbarOption = "";
      // store reference to previously selected option
      // so when drawing, drawing does not occuring when dragging a shape, for example.
      state.previousToolbarOption = state.toolbarOption;
      state.toolbarOption = option;
    },
    createShape(state) {
      switch (state.toolbarOption) {
        case "rectangle":
          state.rectangles.push({
            id: cuid(),
            x: 20,
            y: 40,
            width: 200,
            height: 100,
            fill: "#f06"
          });
          break;
        /*case "circle":
          this.shapes.push(() => import("./dynamic-circle"));
          break;
        case "ellipse":
          this.shapes.push(() => import("./dynamic-ellipse"));
          break;
        case "line":
          this.shapes.push(() => import("./dynamic-line"));
          break;
        case "polyline":
          this.shapes.push(() => import("./dynamic-polyline"));
          break;
        case "polygon":
          this.shapes.push(() => import("./dynamic-polygon"));
          break;
        case "path":
          this.shapes.push(() => import("./dynamic-path"));
          break;
        case "text":
          this.shapes.push(() => import("./dynamic-text"));
          break;*/
        default:
          console.log("no shape to create");
      }
    },
    setArtifactTool(state, option) {
      state.artifactTool = option;
    },
    setDrawingToolbarVisibility(state, visibility) {
      state.drawingToolbarIsVisible = visibility;
    },
    removeArtifactFromWhiteboard(state, option) {
      switch (option.shape) {
        case "rectangle":
          remove(state.rectangles, rectangle => rectangle.id === option.id);
          break;
        default:
          console.log("shape does not exist");
      }
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
      commit("createShape");
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
    storedRectangles: state => state.rectangles
  }
});

export default store;
