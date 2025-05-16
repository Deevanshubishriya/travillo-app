
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Car, Hotel, MessageSquare, Route, Camera } from 'lucide-react'; // Added Camera
import { ClientImage } from '@/components/client-image';
import { FeedbackForm } from '@/components/feedback-form';
import { ItineraryPlanner } from '@/components/itinerary-planner';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Import ShadCN Carousel

export default function Home() {
  const galleryImages = [
    { src: 'https://picsum.photos/seed/himalayan_peaks_gallery/600/400', alt: 'Snow-capped Himalayan peaks', dataAiHint: 'himalayan peaks mountain region' },
    { src: 'https://picsum.photos/seed/ganga_rishikesh_gallery/600/400', alt: 'Ganga river flowing through Rishikesh', dataAiHint: 'rishikesh river forest region' },
    { src: 'https://picsum.photos/seed/uttarakhand_roadtrip_gallery/600/400', alt: 'Scenic mountain road trip in Uttarakhand', dataAiHint: 'mountain roadtrip uttarakhand region' },
    { src: 'https://picsum.photos/seed/kedarnath_temple_gallery/600/400', alt: 'Kedarnath Temple surrounded by mountains', dataAiHint: 'kedarnath temple mountain region' },
    { src: 'https://picsum.photos/seed/nainital_lake_boats_gallery/600/400', alt: 'Naini Lake in Nainital with boats', dataAiHint: 'nainital lake forest region' },
    { src: 'https://picsum.photos/seed/uttarakhand_waterfall_gallery/600/400', alt: 'A beautiful waterfall in Uttarakhand', dataAiHint: 'waterfall forest region uttarakhand' },
    { src: 'https://picsum.photos/seed/pahadi_village_culture_gallery/600/400', alt: 'Traditional Pahadi village life', dataAiHint: 'pahadi village mountain region' },
    { src: 'https://picsum.photos/seed/bageshwar_temple_gallery/600/400', alt: 'Ancient temple architecture in Uttarakhand', dataAiHint: 'ancient temple forest region' },
  ];

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

      {/* New ShadCN Carousel Gallery Section */}
      <section id="gallery" className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary flex items-center justify-center gap-3">
            <Camera className="h-8 w-8 text-accent"/> Glimpses of Our Destinations
          </h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden shadow-md">
                      <CardContent className="flex aspect-square items-center justify-center p-0">
                        <div className="relative w-full h-full">
                          <ClientImage
                            src={image.src}
                            alt={image.alt}
                            layout="fill"
                            objectFit="cover"
                            quality={75}
                            data-ai-hint={image.dataAiHint}
                            className="transition-opacity duration-300"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-[-50px] sm:left-[-60px]" /> {/* Adjust positioning for larger screens */}
            <CarouselNext className="right-[-50px] sm:right-[-60px]" /> {/* Adjust positioning for larger screens */}
          </Carousel>
          <div className="mt-12 text-center">
            <Link href="/locations">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Explore More Locations
              </Button>
            </Link>
          </div>
        </div>
      </section>

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
