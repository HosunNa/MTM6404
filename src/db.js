import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCg0FEqGtNZ5GlKRlTJ7hXIZGwlSc9bnjc",
    authDomain: "contact-book-79efa.firebaseapp.com",
    projectId: "contact-book-79efa",
    storageBucket: "contact-book-79efa.appspot.com",
    messagingSenderId: "418252882287",
    appId: "1:418252882287:web:4c6d841a85393af074689a"
  };

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export default db