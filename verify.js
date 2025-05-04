const firebaseConfig = {
  apiKey: "AIzaSyCnOIOdlGEr27-YC4oeIINBTZ6j9tNfROY",
  authDomain: "veerangana-a8a70.firebaseapp.com",
  projectId: "veerangana-a8a70",
  storageBucket: "veerangana-a8a70.firebasestorage.app",
  messagingSenderId: "50583172701",
  appId: "1:50583172701:web:f9ffc33cf6da25680effb4",
  measurementId: "G-Y76VL9WJZ0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let recaptchaVerifier;

window.onload = function () {
  recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
    size: "invisible",
  });
  recaptchaVerifier.render();
};


function sendOTP() {
  let number = document.getElementById("phoneNumber").value.trim();

  if (!number) {
    alert("Please enter your phone number.");
    return;
  }

  // Add +91 prefix if not present
  if (!number.startsWith("+")) {
    number = "+91" + number;
  }

  if (!recaptchaVerifier) {
    recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
      size: "invisible"
    });
  }

  auth.signInWithPhoneNumber(number, recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      document.getElementById("otp-section").style.display = "block";
      alert("OTP sent to your phone.");
    })
    .catch((error) => {
      console.error("Error during OTP sending:", error.message);
      alert("Failed to send OTP. Please try again.");
    });
}

function verifyOTP() {
  const otp = document.getElementById("otp").value;

  if (!otp) {
    alert("Please enter the OTP.");
    return;
  }

  window.confirmationResult.confirm(otp)
    .then((result) => {
      const user = result.user;
      const phoneNumber = user.phoneNumber;

      db.collection("users").doc(phoneNumber).get()
        .then((doc) => {
          if (doc.exists) {
            window.location.href = "index.html";
          } else {
            // Redirect to user.html with phone number in query
            window.location.href = `user.html?phone=${encodeURIComponent(phoneNumber)}`;
          }
        })
        .catch((error) => {
          console.error("Error checking user registration:", error.message);
          alert("An error occurred. Please try again.");
        });
    })
    .catch((error) => {
      console.error("Error during OTP verification:", error.message);
      alert("Invalid OTP. Please try again.");
    });
}







//   firebase.initializeApp(firebaseConfig);
//   const auth = firebase.auth();
// const db = firebase.firestore();


//   // Render reCAPTCHA
//   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
//     size: 'normal',
//     callback: function(response) {
//       console.log('reCAPTCHA solved');
//     }
//   });

//   function sendOTP() {
//     let number = document.getElementById("phoneNumber").value;
  
//     // Add +91 if you're only testing in India (customise for other countries as needed)
//     if (!number.startsWith("+")) {
//       number = "+91" + number;
//     }
  
//     const appVerifier = window.recaptchaVerifier;
  
//     firebase.auth().signInWithPhoneNumber(number, appVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         document.getElementById("otp-section").style.display = "block";
//         alert("OTP sent!");
//       }).catch((error) => {
//         alert(error.message);
//       });
//   }

//   function verifyOTP() {
//     const otp = document.getElementById("otp").value;
//     confirmationResult.confirm(otp)
//       .then((result) => {
//         const user = result.user;
//         alert("Phone number verified!");
//         console.log(user);
//         window.location.href = "user.html"; // Redirect to user.html after successful verification
//       }).catch((error) => {
//         alert("Incorrect OTP");
//       });
//   }