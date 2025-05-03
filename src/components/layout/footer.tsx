import Link from 'next/link';
import { Mountain } from 'lucide-react'; // Using Mountain as a placeholder logo icon

export function Footer() {
  return (
    <footer className="border-t bg-muted">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Mountain className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Your Team/Name. Discover the hidden gems of Uttarakhand.
          </p>
        </div>
        <div className="flex items-center space-x-4">
           <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
           <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
