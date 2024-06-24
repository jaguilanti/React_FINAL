// firebase/config.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: "AIzaSyDyhX3KKRrLWIRVGjpjsHY_hihK7CZiX5Q",
  authDomain: "ecommerce-sorella.firebaseapp.com",
  projectId: "ecommerce-sorella",
  storageBucket: "ecommerce-sorella.appspot.com",
  messagingSenderId: "597738665270",
  appId: "1:597738665270:web:b539080ed7756e47c72f97"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializa Firestore
const auth = getAuth(app); // Inicializa el módulo de autenticación

export { db, auth };