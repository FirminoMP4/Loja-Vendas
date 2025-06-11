import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBTZugfG8d210UycGaIsTUdNGDJZyua1l0",
  authDomain: "app-vendas-8c785.firebaseapp.com",
  projectId: "app-vendas-8c785",
  storageBucket: "app-vendas-8c785.firebasestorage.app",
  messagingSenderId: "838356042713",
  appId: "1:838356042713:web:5cec6a7b9fbda9eb504fc8",
  measurementId: "G-FSD8Y769KJ"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

let db;

if (!app._firestoreInitialized) {
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
    useFetchStreams: false,
  });
  app._firestoreInitialized = true;
} else {
  db = getFirestore(app);
}

export { db };
