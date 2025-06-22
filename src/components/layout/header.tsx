
'use client';

import Link, { LinkProps } from 'next/link';
import { Mountain, Search as SearchIcon, LogOut, User, UserPlus as UserPlusIcon } from 'lucide-react';
import { NavLink } from './nav-link';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MenuIcon, XIcon } from 'lucide-react'; // Import icons for mobile menu
import { useAuth } from '@/context/auth-context'; // Import useAuth

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const router = useRouter();
  const { user, logout, loading } = useAuth(); // Get user and logout function

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/locations?search=${encodeURIComponent(searchQuery.trim())}`);
      // setSearchQuery(''); // Optionally clear search after submission
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await logout(); // AuthContext's logout handles Firebase signOut and cookie deletion
    router.push('/'); // Redirect to home page after logout
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-4 flex items-center space-x-2 md:mr-6">
          <Mountain className="h-6 w-6 text-primary" />
          <span className="font-bold text-primary sm:inline-block">
            Travillo
          </span>
        </Link>
        <nav className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 lg:space-x-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/locations">Locations</NavLink>
          <NavLink href="/rentals">Rentals</NavLink>
          <NavLink href="/hotels">Hotels</NavLink>
        </nav>
        <div className="ml-auto flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          {/* Search Form: Visible from sm screens upwards */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden sm:flex items-center w-full max-w-[180px] md:max-w-[240px] lg:max-w-[280px]"
          >
            <SearchIcon className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search Travillo spots..."
              className="h-9 w-full rounded-md bg-background pl-8 pr-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search Travillo spots"
            />
          </form>
          <ThemeToggleButton />
          {!loading && (
            <>
              {user ? (
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login" passHref>
                    <Button variant="ghost" size="sm">
                      <User className="mr-2 h-4 w-4" /> Login
                    </Button>
                  </Link>
                  <Link href="/signup" passHref>
                    <Button variant="default" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <UserPlusIcon className="mr-2 h-4 w-4" /> Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}

    