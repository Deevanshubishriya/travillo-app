
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Car, Hotel, MessageSquare, Route } from 'lucide-react'; // Added Route
import { ClientImage } from '@/components/client-image';
import { FeedbackForm } from '@/components/feedback-form';
import { ItineraryPlanner } from '@/components/itinerary-planner';
import FlipsterGallery from '@/components/flipster-gallery'; // Import the new gallery

export default function Home() {
  // Old galleryImages array is removed as FlipsterGallery manages its own images

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <ClientImage
          src="https://picsum.photos/1920/1080?random=hero"
          alt="Scenic view of travel destinations"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="absolute inset-0 z-0 brightness-75"
          data-ai-hint="travel landscape scenic view panoramic"
          priority
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl drop-shadow-md">
            Discover Hidden Gems with Travillo
          </h1>
          <p className="mb-8 max-w-2xl text-lg md:text-xl drop-shadow">
            Explore serene destinations, unexplored routes, and breathtaking viewpoints beyond the usual tourist trails.
          </p>
          <Link href="/locations">
            <Button size="lg" variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
              Start Exploring
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary">
            Your Gateway to Authentic Journeys
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <FeatureCard
              icon={<MapPin className="h-10 w-10 text-accent" />}
              title="Hidden Location Showcase"
              description="Curated guides and stunning visuals of the world's best-kept travel secrets."
              link="/locations"
              linkText="Find Locations"
            />
            <FeatureCard
              icon={<Car className="h-10 w-10 text-accent" />}
              title="Easy Transportation"
              description="Find and book reliable vehicle rentals to reach even the most remote destinations."
              link="/rentals"
              linkText="Book Rentals"
            />
            <FeatureCard
              icon={<Hotel className="h-10 w-10 text-accent" />}
              title="Nearby Hotel Stays"
              description="Conveniently discover and choose the best hotels near your chosen hidden spots."
              link="/hotels"
              linkText="Find Hotels"
            />
          </div>
        </div>
      </section>

      {/* New Flipster Gallery Section */}
      <FlipsterGallery />

      {/* Itinerary Planner Section */}
      <section id="itinerary-planner" className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl mx-auto">
          <h2 className="mb-4 text-center text-3xl font-bold text-primary flex items-center justify-center gap-3">
            <Route className="h-8 w-8 text-accent"/> Plan Your Uttarakhand Itinerary
          </h2>
          <p className="mb-10 text-center text-lg text-muted-foreground">
            Let our AI help you craft the perfect trip!
          </p>
          <ItineraryPlanner />
        </div>
      </section>

      {/* Feedback Section */}
       <section id="feedback" className="py-16 md:py-24 bg-muted/50">
          <div className="container max-w-3xl mx-auto">
             <h2 className="mb-4 text-center text-3xl font-bold text-primary flex items-center justify-center gap-3">
                <MessageSquare className="h-8 w-8 text-accent"/> Share Your Feedback
            </h2>
             <p className="mb-10 text-center text-lg text-muted-foreground">
               We&apos;d love to hear about your experience or suggestions for Travillo!
            </p>
             <FeedbackForm />
          </div>
       </section>

      {/* Call to Action Section */}
       <section className="py-16 md:py-24 bg-secondary">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary">
            Ready to Unveil the Unseen?
          </h2>
          <p className="mb-8 max-w-xl mx-auto text-lg text-secondary-foreground">
            Start planning your unique adventure today with Travillo. Explore locations, book your ride, and find the perfect stay.
          </p>
          <Link href="/locations">
             <Button size="lg" variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
              Explore Now
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

function FeatureCard({ icon, title, description, link, linkText }: FeatureCardProps) {
  return (
    <Card className="flex flex-col items-center text-center shadow-lg transition-transform duration-300 hover:scale-105 bg-card">
      <CardHeader className="pt-6">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-secondary p-4 inline-block">
             {icon}
          </div>
        </div>
        <CardTitle className="text-xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-between px-6 pb-6">
        <p className="mb-6 text-muted-foreground">{description}</p>
        <Link href={link} className="mt-auto">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto">
            {linkText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
