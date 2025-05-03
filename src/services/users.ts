
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/firebase'; // Import Firestore instance

/**
 * Represents the basic data structure for a user profile in Firestore.
 */
export interface UserProfile {
  email: string;
  createdAt?: any; // Use serverTimestamp for creation time
  // Add other profile fields as needed (e.g., name, preferences)
}

/**
 * Creates or updates a user profile document in Firestore.
 *
 * @param uid The user's unique ID from Firebase Authentication.
 * @param data The user profile data to store.
 * @returns A promise that resolves when the profile is successfully created/updated.
 */
export async function createUserProfile(uid: string, data: UserProfile): Promise<void> {
  const userDocRef = doc(db, 'users', uid); // Get a reference to the document path 'users/{uid}'
  try {
    // Use setDoc with merge: true to create or update the document
    // Add a server timestamp for when the user was created
    await setDoc(userDocRef, {
      ...data,
      createdAt: serverTimestamp(), // Automatically set the creation time on the server
    }, { merge: true }); // Merge ensures we don't overwrite existing fields if updating
    console.log(`User profile created/updated for UID: ${uid}`);
  } catch (error) {
    console.error('Error creating/updating user profile:', error);
    // Re-throw the error to be handled by the caller (e.g., in the signup form)
    throw new Error('Could not create user profile.');
  }
}

// Add other user-related Firestore functions here (e.g., getUserProfile, updateUserProfile)
