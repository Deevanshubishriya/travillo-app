import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Car, Hotel, Camera } from 'lucide-react'; // Added Camera icon
import { ClientImage } from '@/components/client-image'; // Using ClientImage for consistency
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Import Carousel components

export default function Home() {
  const galleryImages = [
    { src: 'https://picsum.photos/seed/himalayas/600/400', alt: 'Snow-capped Himalayan peaks', hint: 'himalayas snow mountains' },
    { src: 'https://picsum.photos/seed/rishikesh/600/400', alt: 'Ganga river flowing through Rishikesh', hint: 'rishikesh ganges river city' },
    { src: 'https://picsum.photos/seed/valleyofflowers/600/400', alt: 'Valley of Flowers national park', hint: 'valley flowers nature park' },
    { src: 'https://picsum.photos/seed/auli/600/400', alt: 'Ski resort in Auli during winter', hint: 'auli ski resort snow winter' },
    { src: 'https://picsum.photos/seed/nainital/600/400', alt: 'Naini Lake in Nainital with boats', hint: 'nainital lake boats hill station' },
    { src: 'https://picsum.photos/seed/kedarnath/600/400', alt: 'Kedarnath Temple surrounded by mountains', hint: 'kedarnath temple spiritual mountains' },
     { src: 'https://picsum.photos/seed/mussoorie/600/400', alt: 'View from Mussoorie hill station', hint: 'mussoorie hill station viewpoint' },
     { src: 'https://picsum.photos/seed/uttarakhand_culture/600/400', alt: 'Traditional Uttarakhand folk dance', hint: 'uttarakhand culture folk dance' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full">
        {/* Use ClientImage for Hero as well */}
        <ClientImage
          src="https://picsum.photos/1920/1080?random=hero"
          alt="Scenic view of Uttarakhand mountains"
          layout="fill"
          objectFit="cover"
          quality={80}
          className="absolute inset-0 z-0 brightness-75"
          data-ai-hint="uttarakhand mountains landscape panoramic"
          priority // Prioritize loading hero image
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl drop-shadow-md">
            Discover Uttarakhand's Hidden Gems
          </h1>
          <p className="mb-8 max-w-2xl text-lg md:text-xl drop-shadow">
            Explore serene villages, unexplored treks, and breathtaking viewpoints beyond the usual tourist trails.
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

      {/* Gallery Section - Replaced grid with Carousel */}
      <section id="gallery" className="py-16 md:py-24 bg-muted/50">
        <div className="container">
           <h2 className="mb-12 text-center text-3xl font-bold text-primary flex items-center justify-center gap-3">
             <Camera className="h-8 w-8 text-accent"/> Glimpses of Uttarakhand
          </h2>
           <Carousel
             opts={{
               align: "start",
               loop: true, // Enable looping
             }}
             className="w-full max-w-4xl mx-auto" // Adjusted max-width and centering
           >
             <CarouselContent>
               {galleryImages.map((image, index) => (
                 <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3"> {/* Adjust basis for different screen sizes */}
                   <div className="p-1"> {/* Add padding around item if needed */}
                     <Card className="overflow-hidden shadow-md">
                       <CardContent className="flex aspect-square items-center justify-center p-0"> {/* Use Card for structure and aspect ratio */}
                         <div className="relative w-full h-full">
                           <ClientImage
                             src={image.src}
                             alt={image.alt}
                             layout="fill"
                             objectFit="cover"
                             quality={75}
                             data-ai-hint={image.hint}
                             className="transition-opacity duration-300"
                           />
                            {/* Optional: Add overlay or caption on hover */}
                            {/* <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                              <p className="text-white text-xs">{image.alt}</p>
                            </div> */}
                         </div>
                       </CardContent>
                     </Card>
                   </div>
                 </CarouselItem>
               ))}
             </CarouselContent>
             <CarouselPrevious className="left-[-50px] sm:left-[-60px]" /> {/* Adjust button position */}
             <CarouselNext className="right-[-50px] sm:right-[-60px]" /> {/* Adjust button position */}
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
