
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
    // Log the config being used for debugging
    console.log("Attempting to initialize Firebase with config:", JSON.stringify(firebaseConfig, null, 2));

    // Check for essential config values
    if (!firebaseConfig.apiKey) {
      console.error("Firebase initialization failed: apiKey is missing.");
      throw new Error('Firebase apiKey is missing. Check your .env.local file and ensure NEXT_PUBLIC_FIREBASE_API_KEY is set.');
    }
    if (!firebaseConfig.authDomain) {
      console.error("Firebase initialization failed: authDomain is missing.");
      throw new Error('Firebase authDomain is missing. Check your .env.local file and ensure NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN is set.');
    }
    if (!firebaseConfig.projectId) {
      console.error("Firebase initialization failed: projectId is missing.");
      throw new Error('Firebase projectId is missing. Check your .env.local file and ensure NEXT_PUBLIC_FIREBASE_PROJECT_ID is set.');
    }
    // Add checks for other essential fields if necessary

    app = initializeApp(firebaseConfig);
    auth = getAuth(app); // Initialize auth
    db = getFirestore(app);
    console.log('Firebase initialized successfully (Auth & Firestore)');
  } catch (error: any) {
    console.error('Firebase initialization error caught:', error.message);
    // Log the config that caused the error
    console.error('Config used during failed initialization:', JSON.stringify(firebaseConfig, null, 2));
    // Re-throw a more specific error or the original one
    throw new Error(`Failed to initialize Firebase. Original error: ${error.message}. Check console for config details and ensure all NEXT_PUBLIC_FIREBASE_ environment variables are correctly set in .env.local and the server was restarted.`);
  }
} else {
  // If already initialized, get the existing app instance
  app = getApps()[0];
  auth = getAuth(app); // Get existing auth instance
  db = getFirestore(app);
}

export { app, auth, db }; // Export auth
