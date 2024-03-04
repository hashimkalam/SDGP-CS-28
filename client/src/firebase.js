// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAYoYxxDNXD816DzAxtiwd2hUx20nZzumI",
  authDomain: "sdgp-2cea0.firebaseapp.com",
  projectId: "sdgp-2cea0",
  storageBucket: "sdgp-2cea0.appspot.com",
  messagingSenderId: "576913009227",
  appId: "1:576913009227:web:22e512bcba15481cb1fbce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const storage = getStorage(app);