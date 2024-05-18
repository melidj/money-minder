import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyClKNT-TeE9ZLNXMaViIFNC9IlU3Qw5FxM",
  authDomain: "money-minder-e2efc.firebaseapp.com",
  projectId: "money-minder-e2efc",
  storageBucket: "money-minder-e2efc.appspot.com",
  messagingSenderId: "296032219937",
  appId: "1:296032219937:web:a678066b946fabca864460"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app);

//firebase login 
//firebase init
//firebase deploy

