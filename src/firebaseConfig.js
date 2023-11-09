import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCjljHXHWzXJw-gOEtMt_HBpuJuaqdwzzk",
    authDomain: "typing-speed-test-a1510.firebaseapp.com",
    projectId: "typing-speed-test-a1510",
    storageBucket: "typing-speed-test-a1510.appspot.com",
    messagingSenderId: "542799161023",
    appId: "1:542799161023:web:5f5e843573a8ceaa49480a",
    measurementId: "G-VLTS35RVC5"
};

const app = firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()
const db = app.firestore()

export { auth, db }