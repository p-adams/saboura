import Vue from "vue";
import Vuex from "vuex";
import remove from "lodash/remove";
import cuid from "cuid";
import { DB } from "../firebase";
import firebase from "firebase";
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
Vue.use(Vuex);

const artifact = {
  cuid: cuid(),
  type: "",
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  radius: 0,
  fill: "",
  stroke: {},
  lineCoords: {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  },
  polylinePoints: "",
  polyString: "",
  pathString: "",
  text: "",
  font: {
    fill: "",
    family: ""
  }
};

const ref = DB.ref("testWB");
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
    }
  },
  actions: {
    loadMockUsers({ commit }, payload) {
      commit("loadMockUsers", payload.users);
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
    setToolbarOption({ commit }, title) {
      // set the toolbar option
      commit("setToolbarOption", title);

      if (DRAWABLE_ARTIFACTS.indexOf(title) !== -1) {
        switch (title) {
          case "rectangle":
            artifact.type = "rectangle";
            artifact.x = 20;
            artifact.y = 20;
            (artifact.width = 200), (artifact.height = 75);
            artifact.fill = "blue";
            ref.push(artifact);
            break;
          case "circle":
            artifact.type = "circle";
            artifact.x = 100;
            artifact.y = 120;
            artifact.radius = 100;
            artifact.fill = "green";
            ref.push(artifact);
            break;
          case "ellipse":
            artifact.type = "ellipse";
            artifact.x = 40;
            artifact.y = 80;
            (artifact.width = 175), (artifact.height = 75);
            artifact.fill = "purple";
            ref.push(artifact);
            break;
          case "line":
            artifact.type = "line";
            artifact.x = 100;
            artifact.y = 120;
            artifact.lineCoords.x1 = 0;
            artifact.lineCoords.y1 = 0;
            artifact.lineCoords.x2 = 100;
            artifact.lineCoords.y2 = 200;
            artifact.stroke.width = 10;
            artifact.fill = "green";
            ref.push(artifact);
            break;
          case "polyline":
            artifact.type = "polyline";
            artifact.x = 400;
            artifact.y = 300;
            artifact.polylinePoints = "0,0 100,50 50,100";
            artifact.stroke.width = 5;
            artifact.fill = "red";
            ref.push(artifact);
            break;
          case "polygon":
            artifact.type = "polygon";
            artifact.x = 100;
            artifact.y = 120;
            artifact.polyString =
              "50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40";
            artifact.stroke.width = 10;
            artifact.fill = "green";
            ref.push(artifact);
            break;
          case "path":
            artifact.type = "path";
            artifact.x = 100;
            artifact.y = 120;
            artifact.pathString =
              "M0 0 H50 A20 20 0 1 0 100 50 v25 C50 125 0 85 0 85 z";
            artifact.stroke.width = 10;
            artifact.stroke.color = "lightgray";
            (artifact.stroke.linecap = "round"), (artifact.linejoin = "round");
            ref.push(artifact);
            break;
          case "text":
            artifact.type = "text";
            artifact.x = 300;
            artifact.y = 120;
            artifact.text = "Colorless green ideas sleep furiously";
            artifact.font.fill = "black";
            artifact.font.family = "Helvetica";
            ref.push(artifact);
            break;
          default:
            console.log("No artifact to create");
        }
      }
      undo(title);
      function undo(title) {
        if (title === "undo") {
          ref.limitToLast(1).once("child_added", snap => {
            ref.child(snap.key).remove();
          });
        }
      }
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
    drawingToolbar: state => state.drawingToolbarIsVisible
  }
});

export default store;
