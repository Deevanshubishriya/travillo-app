
"use client";

import type { User as FirebaseUser } from 'firebase/auth';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { auth, db } from '@/lib/firebase/firebase'; // Import db
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'; // Firestore imports
import { useToast } from '@/hooks/use-toast';


interface AuthContextType {
  user: FirebaseUser | null; // Can be extended with profile data
  loading: boolean;
  signup: (email: string, password: string) => Promise<FirebaseUser | null>;
  login: (email: string, password: string) => Promise<FirebaseUser | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Optionally fetch user profile from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            // Combine auth data with Firestore profile data
            setUser({ ...currentUser, ...userDoc.data() } as FirebaseUser);
          } else {
            // No profile document yet, just set auth user
            setUser(currentUser);
            // You could create a profile here if it's missing and should exist
            console.log("No profile document found for user:", currentUser.uid);
          }
        } catch (error) {
            console.error("Error fetching user profile from Firestore:", error);
            setUser(currentUser); // Fallback to auth user data
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const signup = async (email: string, password: string): Promise<FirebaseUser | null> => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Create a user profile document in Firestore
      const userDocRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userDocRef, {
        email: userCredential.user.email,
        createdAt: serverTimestamp(), // Use Firestore server timestamp
        // Add any other default profile fields here (e.g., displayName if collected at signup)
      });
      toast({ title: "Signup Successful", description: "Welcome to Travillo!" });
      // The onAuthStateChanged listener will pick up the new user and their profile
      return userCredential.user;
    } catch (error: any) {
      console.error("Signup failed:", error.code, error.message);
      let friendlyMessage = "An unknown error occurred during signup.";
      if (error.code === 'auth/email-already-in-use') {
        friendlyMessage = "This email address is already in use. Please try a different email or log in.";
      } else if (error.code === 'auth/weak-password') {
        friendlyMessage = "The password is too weak. Please choose a stronger password (at least 6 characters).";
      } else if (error.message) {
        friendlyMessage = error.message; // Fallback to Firebase's message if it's something else
      }
      toast({ title: "Signup Failed", description: friendlyMessage, variant: "destructive" });
      throw error; // Re-throw to be caught by the calling page
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<FirebaseUser | null> => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Login Successful", description: "Welcome back!" });
      // The onAuthStateChanged listener will pick up the user and their profile
      return userCredential.user;
    } catch (error: any) {
      console.error("Login failed:", error.code, error.message);
      let friendlyMessage = "Login failed. Please try again.";
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        friendlyMessage = "Invalid email or password. Please check your credentials and try again.";
      } else if (error.code === 'auth/user-disabled') {
        friendlyMessage = "This account has been disabled. Please contact support.";
      } else if (error.message) {
        // For other errors, Firebase's message might be useful but can be technical.
        // You can decide to show error.message or a more generic one.
        friendlyMessage = "An unexpected error occurred. Please try again later.";
      }
      toast({
        title: "Login Failed",
        description: friendlyMessage,
        variant: "destructive"
      });
      throw error; // Re-throw to be caught by the calling page if needed elsewhere
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      // User state will be set to null by onAuthStateChanged
    } catch (error: any) {
      console.error("Logout failed:", error);
      toast({ title: "Logout Failed", description: error.message || "An error occurred during logout.", variant: "destructive" });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Children are rendered immediately, loading state managed internally or by consumer */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
