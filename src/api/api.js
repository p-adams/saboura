import cuid from "cuid";
import { DB } from "../firebase";
import firebase from "firebase";

const DRAWABLE_ARTIFACTS = ["rectangle", "circle", "ellipse", "line", "text"];

function addToWhiteboard(id, userName) {
  const collaborators = DB.ref(`mockWhiteboards/${id}/collaborators`);
  collaborators.on("value", snap => {
    // if there are no collaborators on the whiteboard
    // add the user by username
    if (snap.val() === null) {
      collaborators.push({ name: userName });
    } else {
      // otherwise, check to see is user already exists on that
      // whiteboard
      const sn = snap.val();
      for (let s in sn) {
        if (sn[s].name !== userName) {
          collaborators.push({ name: userName });
        }
      }
    }
  });
}

function createArtifact(title, whiteboardId) {
  console.log("create artifact", whiteboardId);
  const artifacts = DB.ref(`mockWhiteboards/${whiteboardId}/artifacts`);
  if (DRAWABLE_ARTIFACTS.indexOf(title) !== -1) {
    switch (title) {
      case "rectangle":
        artifacts.push({
          cuid: cuid(),
          type: "rectangle",
          transform: "",
          x: 20,
          y: 20,
          width: 200,
          height: 75,
          fill: "blue"
        });
        break;
      case "circle":
        artifacts.push({
          cuid: cuid(),
          type: "circle",
          transform: "",
          cx: 100,
          cy: 120,
          radius: 100,
          fill: "green"
        });
        break;
      case "ellipse":
        artifacts.push({
          cuid: cuid(),
          type: "ellipse",
          transform: "",
          cx: 40,
          cy: 80,
          rx: 175,
          ry: 75,
          fill: "purple"
        });
        break;
      case "line":
        artifacts.push({
          cuid: cuid(),
          type: "line",
          transform: "",
          x: 100,
          y: 120,
          x1: 0,
          y1: 0,
          x2: 100,
          y2: 200,
          strokeWidth: 10,
          fill: "green"
        });
        break;
      case "polyline":
        artifacts.push({
          cuid: cuid(),
          type: "polyline",
          transform: "",
          x: 400,
          y: 300,
          polylinePoints: [0, 0, 100, 50, 50, 100],
          strokeWidth: 5,
          fill: "red"
        });
        break;
      case "text":
        artifacts.push({
          cuid: cuid(),
          type: "text",
          x: 300,
          y: 120,
          text: "Colorless green ideas sleep furiously",
          fill: "black",
          family: "Helvetica"
        });
        break;
      default:
        console.log("No artifact to create");
    }
  }
  undo(title);
  function undo(title) {
    if (title === "undo") {
      artifacts.limitToLast(1).once("child_added", snap => {
        artifacts.child(snap.key).remove();
      });
    }
  }
}

export { createArtifact, addToWhiteboard };
