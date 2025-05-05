// Firebase SDK Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCnOIOdlGEr27-YC4oeIINBTZ6j9tNfROY",
    authDomain: "veerangana-a8a70.firebaseapp.com",
    projectId: "veerangana-a8a70",
    storageBucket: "veerangana-a8a70.firebasestorage.app",
    messagingSenderId: "50583172701",
    appId: "1:50583172701:web:f9ffc33cf6da25680effb4",
    measurementId: "G-Y76VL9WJZ0"
  };

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

window.handleLocation = async (isAgreed) => {
  if (!isAgreed) {
    alert("You chose not to share location.");
    return;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const userId = "user_" + Date.now(); // replace with actual auth UID if needed

      try {
        await setDoc(doc(db, "users", userId), {
          latitude,
          longitude,
          timestamp: new Date().toISOString()
        });
        alert("Location stored in Firestore!");
      } catch (error) {
        console.error("Error writing document: ", error);
        alert("Failed to store location.");
      }
    }, (err) => {
      alert("Location permission denied or error occurred.");
    });
  } else {
    alert("Geolocation not supported by your browser.");
  }
};