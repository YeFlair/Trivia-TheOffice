import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: "AIzaSyBGvjEaoOjAZ1oHUmRLAoRfotvu11FxZ-4",
  authDomain: "theoffice-trivia.firebaseapp.com",
  projectId: "theoffice-trivia",
  storageBucket: "theoffice-trivia.appspot.com",
  messagingSenderId: "200324244737",
  appId: "1:200324244737:web:62083f8427a51f86c8a700",
  databaseURL: "https://theoffice-trivia-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
