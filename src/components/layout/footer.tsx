
import Link from 'next/link';
import { Mountain, Mail, Phone, Linkedin, Twitter, Instagram, Youtube, Github } from 'lucide-react';
import { GoogleTranslateWidget } from '@/components/google-translate-widget';

export function Footer() {
  return (
    <footer className="border-t bg-muted text-muted-foreground py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Column 1: Travillo Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-3">
              <Mountain className="h-7 w-7 text-primary mr-2" />
              <h3 className="text-xl font-bold text-primary">Travillo</h3>
            </div>
            <p className="text-sm mb-2">
              Ready for your next adventure? Let's make it unforgettable.
            </p>
            <p className="text-sm">
              Start planning your dream trip with us and explore the world.
            </p>
          </div>

          {/* Column 2: Places */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Places To Visit</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/cultural-experiences" className="hover:text-primary transition-colors">Cultural Experiences</Link>
              <Link href="/honeymoon-places" className="hover:text-primary transition-colors">Honeymoon Places</Link>
              <Link href="/adventure-travel" className="hover:text-primary transition-colors">Adventure Travel</Link>
            </nav>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Support</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="/blogs" className="hover:text-primary transition-colors">Our Blogs</Link>
              <Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link>
              <Link href="/licensing" className="hover:text-primary transition-colors">Licensing</Link>
              <Link href="/#feedback" className="hover:text-primary transition-colors">Contact Us</Link>
              <Link href="/contributors" className="hover:text-primary transition-colors">Our Contributors</Link>
              <Link href="/sitemap" className="hover:text-primary transition-colors">SiteMap</Link>
            </nav>
          </div>

          {/* Column 4: Address & Map */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Our Address</h4>
            <div className="relative w-[200px] h-[200px] overflow-hidden rounded-md shadow-md border border-border">
              <iframe
                width="200"
                height="200"
                id="gmap_canvas_footer"
                src="https://maps.google.com/maps?q=wellington%20street%20kolkata&t=k&z=11&ie=UTF8&iwloc=&output=embed"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                title="Travillo Office Location Map"
                className="absolute top-0 left-0 w-full h-full"
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Column 5: Contact & Social */}
          <div className="lg:col-span-1"> {/* Adjusted span, or remove for auto flow */}
            <h4 className="text-lg font-semibold text-foreground mb-4">Contact Us</h4>
            <div className="flex items-center mb-2 text-sm">
              <Mail className="w-4 h-4 mr-2 text-accent flex-shrink-0" />
              <a href="mailto:tour@travillo.com" className="hover:text-primary transition-colors break-all">tour@travillo.com</a>
            </div>
            <div className="flex items-center mb-4 text-sm">
              <Phone className="w-4 h-4 mr-2 text-accent flex-shrink-0" />
              <a href="tel:+911010101010" className="hover:text-primary transition-colors">+91 1010101010</a>
            </div>
            <div className="flex space-x-4 mb-4">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" title="X (Twitter)" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
            <div className="visitor-widget">
              <a href="https://hits.sh/" target="_blank" rel="noopener noreferrer">
                <img
                  alt="Visitor count badge"
                  src="https://hits.sh/apu52.github.io/Travel_Website.svg?style=for-the-badge&label=Visitors&extraCount=786&color=526180&labelColor=9bbbff"
                  className="rounded"
                  width="170" // Example width, adjust as needed
                />
              </a>
            </div>
          </div>
        </div>

        <GoogleTranslateWidget />

        <div className="border-t border-border/50 pt-8 mt-8 text-center text-sm">
          <p>
            Copyright &copy; {new Date().getFullYear()} Team Travillo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
