import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth} from  "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDSNrKyJX7j9xCzhOs8mLk-ygR2Ch8FUbM",
    authDomain: "tiktok-49d46.firebaseapp.com",
    projectId: "tiktok-49d46",
    storageBucket: "tiktok-49d46.appspot.com",
    messagingSenderId: "775959411099",
    appId: "1:775959411099:web:630f532152545a66ddc93e",
    measurementId: "G-G5N0M2QCH7"
  };

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;