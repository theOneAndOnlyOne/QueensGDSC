// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD61WL16VDcLiNB1MMOVLNkabfph0ohXS8",
    authDomain: "carbide-buckeye-322806.firebaseapp.com",
    projectId: "carbide-buckeye-322806",
    storageBucket: "carbide-buckeye-322806.appspot.com",
    messagingSenderId: "619386825522",
    appId: "1:619386825522:web:b4a73b8d79f0c682fdc52b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
