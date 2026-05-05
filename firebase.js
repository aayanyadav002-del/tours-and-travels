
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { 
    getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, signOut, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { 
    getFirestore, collection, addDoc 
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// 🔑 YOUR CONFIG (REPLACE)
const firebaseConfig = {
  apiKey: "AIzaSyDj0nKzzm5s-dHnPko1mCqjBQ-kRL-yG1A",
  authDomain: "art-gallery-54a36.firebaseapp.com",
  projectId: "art-gallery-54a36"
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// SIGNUP
function signup(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if(!email || !password){
        alert("Please enter email and password");
        return;
    }

    if(password.length < 6){
        alert("Password must be at least 6 characters");
        return;
    }

    // continue firebase signup...
}

// LOGIN
window.login = async function(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch(e){
        alert(e.message);
    }
}

// LOGOUT
window.logout = function(){
    signOut(auth);
}

// BOOKING SAVE
window.bookTrip = async function(){
    const user = auth.currentUser;
    if(!user){
        alert("Login first!");
        return;
    }

    const name = document.getElementById("name").value;
    const tour = document.getElementById("tour").value;

    await addDoc(collection(db, "bookings"), {
        user: user.email,
        name,
        tour,
        time: new Date()
    });

    alert("Booking saved 🎉");
}

// AUTH STATE UI SWITCH
window.initAuthUI = function(){
    const authBox = document.getElementById("auth");
    const bookingBox = document.getElementById("booking");

    onAuthStateChanged(auth, user => {
        if(!authBox || !bookingBox) return;

        if(user){
            authBox.style.display = "none";
            bookingBox.style.display = "block";
        } else {
            authBox.style.display = "block";
            bookingBox.style.display = "none";
        }
    });
}
