import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { Capacitor } from '@capacitor/core';
import { initializeApp as initializeAppCapacitor } from '@capacitor-firebase/app';
import { getFirestore as getFirestoreCapacitor } from '@capacitor-firebase/firestore';
import { getAuth as getAuthCapacitor } from '@capacitor-firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

let app, auth, db, firestore;

if (Capacitor.isNativePlatform()) {
    // Use Capacitor plugins for native platforms
    initializeAppCapacitor(firebaseConfig);
    auth = getAuthCapacitor();
    firestore = getFirestoreCapacitor();
    // Use web SDK for Realtime Database
    app = initializeApp(firebaseConfig);
    db = getDatabase(app);
} else {
    // Use web SDK for web platform
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getDatabase(app);
    firestore = getFirestore(app);
}

export { auth, db, firestore };