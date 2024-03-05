// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'auth-mern-dcf68.firebaseapp.com',
  projectId: 'auth-mern-dcf68',
  storageBucket: 'auth-mern-dcf68.appspot.com',
  messagingSenderId: '769099883976',
  appId: '1:769099883976:web:e416016626edba6de50cfd',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
