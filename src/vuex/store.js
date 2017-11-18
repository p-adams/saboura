import Vue from "vue";
import Vuex from "vuex";
import remove from "lodash/remove";
import cuid from "cuid";
import { fetchArtifacts, saveArtifact } from "../api/whiteboard";
Vue.use(Vuex);

const DRAWABLE_ARTIFACTS = [
  "rectangle",
  "circle",
  "ellipse",
  "line",
  "polyline",
  "polygon",
  "path",
  "text"
];

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
    loadMockWhiteboard(state, DbArtifacts) {
      state.rectangles = [];
      for (let artifact in DbArtifacts) {
        let artifacts = DbArtifacts[artifact];
        switch (artifacts.type) {
          case "rectangle":
            state.rectangles.push({
              id: artifact,
              x: artifacts.x,
              y: artifacts.y,
              width: artifacts.width,
              height: artifacts.height,
              fill: artifacts.fill
            });
            break;
          default:
            console.log("No artifact to create");
        }
      }
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
    loadMockWhiteboard({ commit, state }) {
      fetchArtifacts().then(artifacts => {
        commit("loadMockWhiteboard", artifacts);
      });
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
      if (DRAWABLE_ARTIFACTS.indexOf(payload) !== -1) {
        switch (payload) {
          case "rectangle":
            // create default rectangle
            const rect = {
              type: "rectangle",
              x: 200,
              y: 100,
              width: 200,
              height: 75,
              fill: "orange"
            };
            // store it in the database
            saveArtifact(rect).then(artifacts => {
              // update artifacts arrays
              commit("loadMockWhiteboard", artifacts);
            });
            break;
          default:
            console.log("No artifact to create");
        }
      }
      // commit("addArtifactToWhiteboard");
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
