
import Link from 'next/link';
import { Mountain, Mail, Phone, Linkedin, Twitter, Instagram, Youtube, Github, Users } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted text-muted-foreground py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Travillo Info */}
          <div className="lg:col-span-1">
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

          {/* Column 2: Founders */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-accent" /> Founders
            </h4>
            <div className="flex flex-col space-y-1 text-sm">
              <p>Deevanshu Bishriya</p>
              <p>Ayush Kumar Verma</p>
              <p>Himanshu Singh</p>
              <p>Priyanshu Tiwari</p>
            </div>
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

          {/* Column 4: Contact & Social */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold text-foreground mb-4">Contact Us</h4>
            <div className="flex items-center mb-2 text-sm">
              <Mail className="w-4 h-4 mr-2 text-accent flex-shrink-0" />
              <a href="mailto:tour@travillo.com" className="hover:text-primary transition-colors break-all">tour@travillo.com</a>
            </div>
            <div className="flex items-center mb-4 text-sm">
              <Phone className="w-4 h-4 mr-2 text-accent flex-shrink-0" />
              <a href="tel:+918126243347" className="hover:text-primary transition-colors">+918126243347</a>
            </div>
            <div className="flex space-x-4 mb-4">
              <a href="#" title="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" title="X (Twitter)" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" title="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" title="YouTube" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" title="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
            <div className="visitor-widget">
              <a href="https://hits.sh/" target="_blank" rel="noopener noreferrer">
                <img
                  alt="Visitor count badge"
                  src="https://hits.sh/apu52.github.io/Travel_Website.svg?style=for-the-badge&label=Visitors&extraCount=786&color=526180&labelColor=9bbbff"
                  className="rounded"
                  width="170"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 mt-8 text-center text-sm">
          <p>
            Copyright &copy; {new Date().getFullYear()} Team Travillo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
