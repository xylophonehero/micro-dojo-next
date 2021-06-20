import firebase from "firebase";
import "firebase/auth"
import "firebase/database"

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebase.app`,
  databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}-default-rtdb.europe-west1.firebasedatabase.app/`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

function initFirebase()
{
  if (!firebase.apps.length)
  {
    firebase.initializeApp(config)
  }
}

initFirebase()

export { firebase }