import Firebase from 'firebase'
const App = Firebase.initializeApp({
    apiKey: "AIzaSyCW4b65pAsHeVTCxBh3IXIwHTwEwKA--MQ",
    authDomain: "saboura-8f54e.firebaseapp.com",
    databaseURL: "https://saboura-8f54e.firebaseio.com",
    projectId: "saboura-8f54e",
    storageBucket: "",
    messagingSenderId: "1017347661418"
  })
  export const DB = App.database()
