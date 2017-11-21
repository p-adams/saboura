import cuid from "cuid";
import { DB } from "../firebase";
import firebase from "firebase";
const artifacts = DB.ref("testWB");

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

let artifact = {
  cuid: cuid(),
  type: "",
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,
  rx: 0,
  ry: 0,
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
          polylinePoints: "0,0 100,50 50,100",
          strokeWidth: 5,
          fill: "red"
        });
        break;
      /* case "polygon":
        artifact.type = "polygon";
        artifact.x = 100;
        artifact.y = 120;
        artifact.polyString = "50,0 60,40 100,50 60,60 50,100 40,60 0,50 40,40";
        artifact.stroke.width = 10;
        artifact.fill = "green";
        artifacts.push(artifact);
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
        artifacts.push(artifact);
        break;
      case "text":
        artifact.type = "text";
        artifact.x = 300;
        artifact.y = 120;
        artifact.text = "Colorless green ideas sleep furiously";
        artifact.font.fill = "black";
        artifact.font.family = "Helvetica";
        artifacts.push(artifact);
        break;*/
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
