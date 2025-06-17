
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
import { deleteCookie } from 'cookies-next'; // Import for deleting cookie

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
    console.log("AuthContext: useEffect mounting, setting up onAuthStateChanged.");
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log("AuthContext: onAuthStateChanged fired. currentUser:", currentUser ? currentUser.uid : null);
      if (currentUser) {
        // Optionally fetch user profile from Firestore
        const userDocRef = doc(db, "users", currentUser.uid);
        try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            // Combine auth data with Firestore profile data
            setUser({ ...currentUser, ...userDoc.data() } as FirebaseUser);
            console.log("AuthContext: User profile found and merged for user:", currentUser.uid);
          } else {
            // No profile document yet, just set auth user
            setUser(currentUser);
            console.log("AuthContext: No profile document found for user, using auth data for:", currentUser.uid);
          }
        } catch (error) {
            console.error("AuthContext: Error fetching user profile from Firestore:", error);
            setUser(currentUser); // Fallback to auth user data
        }
      } else {
        setUser(null);
        console.log("AuthContext: No current user, user set to null.");
      }
      setLoading(false);
      console.log("AuthContext: setLoading(false) called. Current user state:", user ? user.uid : null);
    });

    return () => {
      console.log("AuthContext: useEffect unmounting, unsubscribing from onAuthStateChanged.");
      unsubscribe();
    };
  }, []); // The dependency array is empty, so this effect runs once on mount and cleans up on unmount.

  const signup = async (email: string, password: string): Promise<FirebaseUser | null> => {
    setLoading(true);
    console.log("AuthContext: signup attempt for email:", email);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Create a user profile document in Firestore
      const userDocRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userDocRef, {
        email: userCredential.user.email,
        createdAt: serverTimestamp(), // Use Firestore server timestamp
        // Add any other default profile fields here (e.g., displayName if collected at signup)
      });
      console.log("AuthContext: Signup successful, user profile created for:", userCredential.user.uid);
      toast({ title: "Signup Successful", description: "Welcome to Travillo!" });
      // The onAuthStateChanged listener will pick up the new user and their profile
      return userCredential.user;
    } catch (error: any) {
      console.error("AuthContext: Signup failed:", error.code, error.message);
      let friendlyMessage = "An unknown error occurred during signup.";
      if (error.code === 'auth/email-already-in-use') {
        friendlyMessage = "This email address is already in use. Please try a different email or log in.";
      } else if (error.code === 'auth/weak-password') {
        friendlyMessage = "The password is too weak. Please choose a stronger password (at least 6 characters).";
      } else if (error.code === 'auth/api-key-not-valid') {
        friendlyMessage = "Firebase API Key is not valid. Please check your environment configuration.";
      } else if (error.message) {
        friendlyMessage = error.message; // Fallback to Firebase's message if it's something else
      }
      toast({ title: "Signup Failed", description: friendlyMessage, variant: "destructive" });
      throw error; // Re-throw to be caught by the calling page
    } finally {
      setLoading(false);
      console.log("AuthContext: signup setLoading(false) called.");
    }
  };

  const login = async (email: string, password: string): Promise<FirebaseUser | null> => {
    setLoading(true);
    console.log("AuthContext: login attempt for email:", email);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("AuthContext: Login successful for:", userCredential.user.uid);
      toast({ title: "Login Successful", description: "Welcome back!" });
      // The onAuthStateChanged listener will pick up the user and their profile
      return userCredential.user;
    } catch (error: any) {
      console.error("AuthContext: Login failed:", error.code, error.message);
      let friendlyMessage = "Login failed. Please try again.";
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        friendlyMessage = "Invalid email or password. Please check your credentials and try again.";
      } else if (error.code === 'auth/user-disabled') {
        friendlyMessage = "This account has been disabled. Please contact support.";
      } else if (error.code === 'auth/api-key-not-valid') {
        friendlyMessage = "Firebase API Key is not valid. Please check your environment configuration.";
      } else if (error.message) {
        // For other errors, Firebase's message might be useful but can be technical.
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
      console.log("AuthContext: login setLoading(false) called.");
    }
  };

  const logout = async () => {
    setLoading(true);
    console.log("AuthContext: logout attempt.");
    try {
      await signOut(auth);
      deleteCookie('travillo-session', { path: '/' }); // Also delete cookie here for robustness
      console.log("AuthContext: Logout successful.");
      toast({ title: "Logged Out", description: "You have been successfully logged out." });
      // User state will be set to null by onAuthStateChanged
    } catch (error: any) {
      console.error("AuthContext: Logout failed:", error);
      toast({ title: "Logout Failed", description: error.message || "An error occurred during logout.", variant: "destructive" });
      throw error;
    } finally {
      setLoading(false);
      console.log("AuthContext: logout setLoading(false) called.");
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

