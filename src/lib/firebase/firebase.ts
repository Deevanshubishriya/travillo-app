
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth'; // Ensure getAuth is imported
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let app: FirebaseApp;
let auth: Auth; // Declare auth
let db: Firestore;

// Initialize Firebase only if it hasn't been initialized yet
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app); // Initialize auth
    db = getFirestore(app);
    console.log('Firebase initialized successfully (Auth & Firestore)');
  } catch (error) {
    console.error('Firebase initialization error:', error);
    // Handle initialization error (e.g., throw error, show message)
    // Depending on the app's needs, you might want to prevent further execution
    // or gracefully degrade functionality.
    throw new Error('Failed to initialize Firebase.');
  }
} else {
  // If already initialized, get the existing app instance
  app = getApps()[0];
  auth = getAuth(app); // Get existing auth instance
  db = getFirestore(app);
}

export { app, auth, db }; // Export auth
