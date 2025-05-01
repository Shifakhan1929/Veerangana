import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZTGmq-P72tAotIMKH-kGwkh3cWOY9kls",
  authDomain: "veerangna-16b99.firebaseapp.com",
  projectId: "veerangna-16b99",
  storageBucket: "veerangna-16b99.firebasestorage.app",
  messagingSenderId: "65344501342",
  appId: "1:65344501342:web:cb2d0699549311b033a6cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Inputs
const email = document.getElementById('email');
const password = document.getElementById('password');

// Submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event){
  event.preventDefault();

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Account created successfully!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error: " + errorMessage);
    });
});
