import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Car, Hotel } from 'lucide-react'; // Nature-inspired icons

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        <Image
          src="https://picsum.photos/1920/1080"
          alt="Scenic view of Uttarakhand mountains"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="absolute inset-0 z-0 brightness-75"
          data-ai-hint="uttarakhand mountains landscape"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
            Discover Uttarakhand's Hidden Gems
          </h1>
          <p className="mb-8 max-w-2xl text-lg md:text-xl">
            Explore serene villages, unexplored treks, and breathtaking viewpoints beyond the usual tourist trails.
          </p>
          <Link href="/locations">
            <Button size="lg" variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
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
              description="Curated guides and stunning visuals of Uttarakhand's best-kept secrets."
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

      {/* Call to Action Section */}
       <section className="py-16 md:py-24 bg-secondary">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary">
            Ready to Unveil the Unseen?
          </h2>
          <p className="mb-8 max-w-xl mx-auto text-lg text-secondary-foreground">
            Start planning your unique Uttarakhand adventure today. Explore locations, book your ride, and find the perfect stay.
          </p>
          <Link href="/locations">
             <Button size="lg" variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
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
    <Card className="flex flex-col items-center text-center shadow-lg transition-transform duration-300 hover:scale-105">
      <CardHeader>
        <div className="mb-4 rounded-full bg-secondary p-4">
          {icon}
        </div>
        <CardTitle className="text-xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-between">
        <p className="mb-6 text-muted-foreground">{description}</p>
        <Link href={link}>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            {linkText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

