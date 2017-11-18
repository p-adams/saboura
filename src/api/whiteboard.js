import { DB } from "../firebase";

function fetchArtifacts() {
  return DB.ref("WhiteBoards")
    .once("value")
    .then(snapshot => snapshot.val().testWB);
}

function saveArtifact(artifact) {
  DB.ref("WhiteBoards")
    .child("testWB")
    .push()
    .set({
      type: artifact.type,
      x: artifact.x,
      y: artifact.y,
      width: artifact.width,
      height: artifact.height,
      fill: artifact.fill
    });
  return fetchArtifacts();
}

function removeArtifact() {}

export { fetchArtifacts, saveArtifact };
