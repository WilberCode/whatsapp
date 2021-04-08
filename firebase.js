import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyB8ZnOCnTj--TK4SREeM4OzuRqVzPy_lRQ",
    authDomain: "whatsapp-c2aa1.firebaseapp.com",
    projectId: "whatsapp-c2aa1",
    storageBucket: "whatsapp-c2aa1.appspot.com",
    messagingSenderId: "60782057331",
    appId: "1:60782057331:web:7dbb345ce3c6f6c95f5706"
  };

  const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig) 
  : firebase.app();

  const db = app.firestore();
  const auth = app.auth();
  const provider =  new firebase.auth.GoogleAuthProvider();

  export {db, auth, provider};