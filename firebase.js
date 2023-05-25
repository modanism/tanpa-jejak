// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getReactNativePersistence} from "firebase/auth/react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeJcwhIghh_gZ5ivEuSL_Dm4UFRguTSOI",
  authDomain: "laundry-app-5e339.firebaseapp.com",
  projectId: "laundry-app-5e339",
  storageBucket: "laundry-app-5e339.appspot.com",
  messagingSenderId: "113518919381",
  appId: "1:113518919381:web:60963bd30cf549ec0dec5c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
