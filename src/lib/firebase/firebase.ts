
import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
// Removed getAuth import
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';

let app: FirebaseApp;
// Removed auth variable
let db: Firestore;

// Initialize Firebase only if it hasn't been initialized yet
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    // Removed auth initialization
    db = getFirestore(app);
    console.log('Firebase initialized successfully (Firestore only)');
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
  // Removed auth retrieval
  db = getFirestore(app);
}

// Removed auth export
export { app, db };
