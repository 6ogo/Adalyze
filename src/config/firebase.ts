import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDHVxwzqnGJXZVxGKGGnR8VF9Ij8vBq5Zw",
  authDomain: "adalyze-marketing.firebaseapp.com",
  projectId: "adalyze-marketing",
  storageBucket: "adalyze-marketing.appspot.com",
  messagingSenderId: "1049491948915",
  appId: "1:1049491948915:web:62najl3om2tjjda27tpn6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);