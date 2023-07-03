// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCBrqEdImZgIYyI4rV2XWRsC5UAmNTYktI',
  authDomain: 'react-cursos-4a992.firebaseapp.com',
  projectId: 'react-cursos-4a992',
  storageBucket: 'react-cursos-4a992.appspot.com',
  messagingSenderId: '764636383598',
  appId: '1:764636383598:web:b3c3484240f36b4654d97f',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
