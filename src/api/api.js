import cuid from "cuid";
import { DB } from "../firebase";
import firebase from "firebase";

const DRAWABLE_ARTIFACTS = ["rectangle", "circle", "ellipse", "line", "text"];

function addToWhiteboard(id, userName) {
  const collaborators = DB.ref(`mockWhiteboards/${id}/collaborators`);
  collaborators.push({ name: userName });
}

function createArtifact(title, whiteboardId) {
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
          fill: "none"
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
          fill: "none"
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
          fill: "none"
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
          fill: "#FF5722"
        });
        break;
      case "text":
        artifacts.push({
          cuid: cuid(),
          type: "text",
          x: 300,
          y: 120,
          text: "Colorless green ideas sleep furiously",
          fill: "#424242",
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
