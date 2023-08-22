import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCvrggarlcUK9s_pHdZ1FZ3NGdut5Ivflo',
  authDomain: 'intentions-b068f.firebaseapp.com',
  projectId: 'intentions-b068f',
  storageBucket: 'intentions-b068f.appspot.com',
  messagingSenderId: '287925510546',
  appId: '1:287925510546:web:0ee0f69ae0f7618bd8a14b',
  measurementId: 'G-4F73SX9NWV',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth();
export { auth };

//init firestore service
const db = getFirestore();
export default db;
