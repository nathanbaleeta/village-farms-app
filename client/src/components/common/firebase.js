import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAbettfLwAuQxRP6F-kwdt9GXheVBW1MfY",
  authDomain: "village-farms.firebaseapp.com",
  databaseURL: "https://village-farms.firebaseio.com",
  projectId: "village-farms",
  storageBucket: "village-farms.appspot.com",
  messagingSenderId: "489974596621"
};
firebase.initializeApp(config);
export default firebase;
