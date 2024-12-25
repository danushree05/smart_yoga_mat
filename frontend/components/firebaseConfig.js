
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDnwhwiYnUQMAz8oH7TVl8kJIKsCq-s8U4",
  authDomain: "sensor-data-94f83.firebaseapp.com",
  databaseURL:
    "https://sensor-data-94f83-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sensor-data-94f83",
  storageBucket: "sensor-data-94f83.appspot.com",
  messagingSenderId: "365772480761",
  appId: "1:365772480761:web:2166b16955d9be45144228",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
