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

function createArtifact(title) {
  if (DRAWABLE_ARTIFACTS.indexOf(title) !== -1) {
    switch (title) {
      case "rectangle":
        artifact.type = "rectangle";
        artifact.x = 20;
        artifact.y = 20;
        (artifact.width = 200), (artifact.height = 75);
        artifact.fill = "blue";
        artifacts.push(artifact);
        break;
      case "circle":
        artifact.type = "circle";
        artifact.x = 100;
        artifact.y = 120;
        artifact.radius = 100;
        artifact.fill = "green";
        artifacts.push(artifact);
        break;
      case "ellipse":
        artifact.type = "ellipse";
        artifact.x = 40;
        artifact.y = 80;
        (artifact.width = 175), (artifact.height = 75);
        artifact.fill = "purple";
        artifacts.push(artifact);
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
        artifacts.push(artifact);
        break;
      case "polyline":
        artifact.type = "polyline";
        artifact.x = 400;
        artifact.y = 300;
        artifact.polylinePoints = "0,0 100,50 50,100";
        artifact.stroke.width = 5;
        artifact.fill = "red";
        artifacts.push(artifact);
        break;
      case "polygon":
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
