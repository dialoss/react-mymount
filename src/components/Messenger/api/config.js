import {initializeApp} from "firebase/app";
import {getAuth, signInWithCustomToken} from "firebase/auth";
import {doc, getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import store from "store";
import {actions} from "../store/reducers";

export const firebaseConfig = {
    serviceAccountId: 'firebase-adminsdk-8e42m@mymount-d1cad.iam.gserviceaccount.com',
    apiKey: "AIzaSyBIRILz5CGXc_VnbnTXsS1ctwGAUQISN9k",
    authDomain: "mymount-d1cad.firebaseapp.com",
    projectId: "mymount-d1cad",
    storageBucket: "mymount-d1cad.appspot.com",
    messagingSenderId: "552748272683",
    appId: "1:552748272683:web:00316f5db5feb7a29e6e6e",
}

export const adminEmail = "redshock75@gmail.com";
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);

export let base = null;
export let appName = null;

export function login(token) {
    signInWithCustomToken(auth, token);
}

export function setAppName(name) {
    base = doc(db, 'apps', name);
    appName = name;
}