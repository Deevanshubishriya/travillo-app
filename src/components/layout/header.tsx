import Link from 'next/link';
import { Mountain } from 'lucide-react'; // Using Mountain as a placeholder logo icon
import { Button } from '@/components/ui/button';
import { NavLink } from './nav-link'; // Create this component for active state

export function Header() {
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
          <NavLink href="/locations">Locations</NavLink>
          <NavLink href="/rentals">Rentals</NavLink>
          <NavLink href="/hotels">Hotels</NavLink>
        </nav>
        {/* Optional: Add User Auth button later */}
        {/* <div className="flex flex-1 items-center justify-end space-x-4">
          <Button variant="ghost">Login</Button>
          <Button>Sign Up</Button>
        </div> */}
      </div>
    </header>
  );
}
