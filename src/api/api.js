import cuid from "cuid";
import { DB } from "../firebase";
import firebase from "firebase";
const artifacts = DB.ref("testWB");

const DRAWABLE_ARTIFACTS = ["rectangle", "circle", "ellipse", "line", "text"];

function createArtifact(title) {
  if (DRAWABLE_ARTIFACTS.indexOf(title) !== -1) {
    switch (title) {
      case "rectangle":
        artifacts.push({
          cuid: cuid(),
          type: "rectangle",
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

export { createArtifact };
