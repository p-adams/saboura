import Vue from "vue";
import Vuex from "vuex";
import remove from "lodash/remove";
import cuid from "cuid";
import {
  fetchArtifacts,
  saveArtifact,
  removeArtifact
} from "../api/whiteboard";
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
    removeRectangle(state, id) {
      console.log(`remove ${id}`);
      // remove(state.rectangles, rectangle => rectangle.id === option.id);
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
      // set the toolbar option
      commit("setToolbarOption", payload);
      // check to see that selected artifact is a drawable artifact
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
    },
    removeArtifactFromWhiteboard({ commit }, payload) {
      // remove the artifact from the database by ID
      removeArtifact(payload.id).then(artifacts => {
        // remove artifact from whiteboard
        switch (payload.artifact) {
          case "rectangle":
            console.log("I make it here");
            commit("removeRectangle", payload.id);
            break;
          default:
            console.log("Shape does not exist on whiteboard");
        }
        // update artifacts arrays
        // commit("loadMockWhiteboard", artifacts);
      });
    },
    setArtifactTool({ commit }, payload) {
      commit("setArtifactTool", payload);
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
    drawingToolbar: state => state.drawingToolbarIsVisible,
    storedRectangles: state => state.rectangles
  }
});

export default store;
