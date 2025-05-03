
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mountain, LogIn, UserPlus, LogOut } from 'lucide-react'; // Using Mountain as a placeholder logo icon
import { Button } from '@/components/ui/button';
import { NavLink } from './nav-link'; // Create this component for active state
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase/firebase';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading until auth state is known
  const { toast } = useToast();
   const router = useRouter();


  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false); // Auth state is now known
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
     try {
      await signOut(auth);
       toast({ title: 'Logged Out', description: 'You have been successfully logged out.' });
       router.push('/'); // Redirect to home after logout
     } catch (error) {
       console.error('Logout Error:', error);
       toast({ title: 'Logout Failed', description: 'Could not log out. Please try again.', variant: 'destructive' });
     }
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="font-bold text-primary sm:inline-block">
            Uttarakhand Unveiled
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4 lg:space-x-6">
          <NavLink href="/">Home</NavLink>
          {/* Conditionally render links based on auth state if needed */}
          {user && (
            <>
              <NavLink href="/locations">Locations</NavLink>
              <NavLink href="/rentals">Rentals</NavLink>
              <NavLink href="/hotels">Hotels</NavLink>
            </>
           )}
            {!user && !isLoading && ( // Show message if not logged in and not loading
              <span className="text-sm text-muted-foreground hidden md:inline-block">
                Please login to explore features.
              </span>
            )}

        </nav>
        {/* Authentication Buttons */}
        <div className="flex items-center space-x-2">
          {isLoading ? (
             <Button variant="ghost" size="sm" disabled>Loading...</Button>
          ) : user ? (
            // Show user info and logout button if logged in
            <>
             {/* Optionally display user email or name */}
             {/* <span className="text-sm text-muted-foreground hidden md:inline-block">{user.email}</span> */}
             <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
             </Button>
            </>
          ) : (
            // Show Login and Sign Up buttons if not logged in
            <>
              <Button variant="ghost" size="sm" asChild>
                 <Link href="/login">
                   <LogIn className="mr-2 h-4 w-4" />
                   Login
                 </Link>
              </Button>
              <Button size="sm" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/signup">
                   <UserPlus className="mr-2 h-4 w-4" />
                   Sign Up
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
