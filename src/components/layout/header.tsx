
'use client';

import Link from 'next/link';
import { Mountain, LogIn, UserPlus, LogOut } from 'lucide-react'; // Import LogIn and UserPlus
import { Button } from '@/components/ui/button';
import { NavLink } from './nav-link';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { useAuth } from '@/context/auth-context'; // Import useAuth
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export function Header() {
  const { user, logout, loading } = useAuth(); // Get user and logout from context
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      router.push('/'); // Redirect to home page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="font-bold text-primary sm:inline-block">
            Travillo
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4 lg:space-x-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/locations">Locations</NavLink>
          <NavLink href="/rentals">Rentals</NavLink>
          <NavLink href="/hotels">Hotels</NavLink>
        </nav>
         <div className="ml-auto flex items-center space-x-2 md:space-x-4">
           <ThemeToggleButton />
           {!loading && ( // Only render auth buttons when loading is false
             user ? (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-0 md:mr-2 h-4 w-4" /> <span className="hidden md:inline">Logout</span>
                </Button>
            ) : (
              <>
                <Link href="/login" passHref>
                  <Button variant="ghost" size="sm">
                     <LogIn className="mr-0 md:mr-2 h-4 w-4" /> <span className="hidden md:inline">Login</span>
                  </Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                     <UserPlus className="mr-0 md:mr-2 h-4 w-4" /> <span className="hidden md:inline">Sign Up</span>
                  </Button>
                </Link>
              </>
            )
           )}
         </div>
      </div>
    </header>
  );
}
