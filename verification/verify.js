const firebaseConfig = {
    apiKey: "AIzaSyCnOIOdlGEr27-YC4oeIINBTZ6j9tNfROY",
    authDomain: "veerangana-a8a70.firebaseapp.com",
    projectId: "veerangana-a8a70",
    storageBucket: "veerangana-a8a70.firebasestorage.app",
    messagingSenderId: "50583172701",
    appId: "1:50583172701:web:f9ffc33cf6da25680effb4",
    measurementId: "G-Y76VL9WJZ0"
  };


  firebase.initializeApp(firebaseConfig);

  // Render reCAPTCHA
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
    size: 'normal',
    callback: function(response) {
      console.log('reCAPTCHA solved');
    }
  });

  function sendOTP() {
    let number = document.getElementById("phoneNumber").value;
  
    // Add +91 if you're only testing in India (customise for other countries as needed)
    if (!number.startsWith("+")) {
      number = "+91" + number;
    }
  
    const appVerifier = window.recaptchaVerifier;
  
    firebase.auth().signInWithPhoneNumber(number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        document.getElementById("otp-section").style.display = "block";
        alert("OTP sent!");
      }).catch((error) => {
        alert(error.message);
      });
  }

  function verifyOTP() {
    const otp = document.getElementById("otp").value;
    confirmationResult.confirm(otp)
      .then((result) => {
        const user = result.user;
        alert("Phone number verified!");
        console.log(user);
        window.location.href = "user.html"; // Redirect to user.html after successful verification
      }).catch((error) => {
        alert("Incorrect OTP");
      });
  }