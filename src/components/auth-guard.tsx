
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { Loader2 } from 'lucide-react'; // For loading state indication

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * A component that guards routes requiring authentication.
 * It checks the Firebase auth state and redirects to the login page if the user is not authenticated.
 * Shows a loading indicator while checking the auth state.
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        // If user is not logged in after checking, redirect to login
        router.push('/login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]); // Dependency array includes router

  if (loading) {
    // Show a loading spinner or message while checking authentication state
    return (
      <div className="flex min-h-[calc(100vh-11rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-3 text-muted-foreground">Verifying access...</span>
      </div>
    );
  }

  if (!user) {
    // Although redirection happens in useEffect, this prevents rendering children momentarily before redirect
    // You could also return null or a "Redirecting..." message
     return (
       <div className="flex min-h-[calc(100vh-11rem)] items-center justify-center">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
         <span className="ml-3 text-muted-foreground">Redirecting to login...</span>
       </div>
     );
  }

  // If user is authenticated, render the children components
  return <>{children}</>;
}
