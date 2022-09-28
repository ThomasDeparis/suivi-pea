// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBBF2_RYBQxLSW1g3zLuWk53QvNePHlIeM',
  authDomain: 'suivi-pea.firebaseapp.com',
  projectId: 'suivi-pea',
  storageBucket: 'suivi-pea.appspot.com',
  messagingSenderId: '56906001453',
  appId: '1:56906001453:web:33968a876c5c388be6dca4',
  measurementId: 'G-W13F1PRJGH'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
export { auth, db }
