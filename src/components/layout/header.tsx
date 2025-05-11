
'use client';

import Link from 'next/link';
import { Mountain, Search as SearchIcon } from 'lucide-react'; // Added SearchIcon
import { NavLink } from './nav-link';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { Input } from '@/components/ui/input'; // Added Input
import { useState } from 'react'; // Added useState
import { useRouter } from 'next/navigation'; // Added useRouter for App Router

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/locations?search=${encodeURIComponent(searchQuery.trim())}`);
      // setSearchQuery(''); // Optionally clear search after submission
    }
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
              placeholder="Search Uttarakhand spots..."
              className="h-9 w-full rounded-md bg-background pl-8 pr-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search Uttarakhand spots"
            />
          </form>
          <ThemeToggleButton />
        </div>
      </div>
    </header>
  );
}
