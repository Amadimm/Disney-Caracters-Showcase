import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEwvEXXsK7YtPtINm0uNijjpvtCKgxbAg",
  authDomain: "disney-showcase.firebaseapp.com",
  projectId: "disney-showcase",
  storageBucket: "disney-showcase.appspot.com",
  messagingSenderId: "923646245832",
  appId: "1:923646245832:web:6d12c818e6f50912621efd",
  measurementId: "G-3T6B4KM899"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);



const openButton = document.querySelector("[data-open-modal]")
const closeButton = document.querySelector("[data-close-modal")
const modalLogin = document.querySelector("[data-modal]")



openButton.addEventListener("click", () => {
    modalLogin.showModal()
})

closeButton.addEventListener("click", () => {
    modalLogin.close()
})



loggin__btn.addEventListener('click', (e) => {
    e.preventDefault()
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
      
    const user = userCredential.user;
    form.reset()
      
      alert('Loged In!')
    
  })
  .catch((error) => {
    const errorCode = error.code;
      const errorMessage = error.message;
      
      alert(errorMessage)
  });

})

const user = auth.currentUser;


onAuthStateChanged(auth, (user) => {
    var notLoggedIn = document.getElementById('not-logged-in');
    var loggedIn = document.getElementById('logged-in');
  if (user) {
    // User is signed in, see docs for a list of available properties
   
      loggedIn.style.display = 'block'
notLoggedIn.style.display = 'none'
    const uid = user.uid;
  
  } else {
    // User is signed out
  
      loggedIn.style.display = 'none'
notLoggedIn.style.display = 'block'
  }
});


logout__btn.addEventListener('click', (e) => {

signOut(auth).then(() => {
  // Sign-out successful.
    alert('Signed out')
}).catch((error) => {
  // An error happened.
     const errorCode = error.code;
      const errorMessage = error.message;
      
    alert(errorMessage);
});

})

sign__btn.addEventListener('click', (e) => {
    e.preventDefault()
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    const form = document.getElementById('login_form');
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert('Signed In!')
            form.reset()


        console.log( userCredential.user)
        })

    .catch((error) => {
    const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage)
  });
})
