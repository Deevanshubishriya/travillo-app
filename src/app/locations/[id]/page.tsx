import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, MapPin, Car, Hotel } from 'lucide-react';

// Mock data function (replace with actual data fetching)
async function getLocationDetails(id: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
  const locations = [
    { id: '1', name: 'Khirsu Village', description: 'A serene hill station offering panoramic views of the Himalayas. Perfect for a peaceful getaway, surrounded by oak and deodar forests. Enjoy nature walks and bird watching.', imageUrl: 'https://picsum.photos/800/500?random=1', dataAiHint: 'himalayan village serene landscape' },
    { id: '2', name: 'Chopta Tungnath Trek', description: 'Known as "Mini Switzerland", offering breathtaking meadows and the highest Shiva temple in the world. A moderate trek suitable for most fitness levels.', imageUrl: 'https://picsum.photos/800/500?random=2', dataAiHint: 'mountain trek meadow temple' },
    // Add other locations if needed for testing
  ];
  const location = locations.find(loc => loc.id === id);
  if (!location) {
    // Handle not found case appropriately in a real app
    return { id: 'not-found', name: 'Location Not Found', description: 'The requested location could not be found.', imageUrl: 'https://picsum.photos/800/500?grayscale', dataAiHint: 'placeholder image error' };
  }
  return location;
}

export default async function LocationDetailPage({ params }: { params: { id: string } }) {
  const location = await getLocationDetails(params.id);

  if (location.id === 'not-found') {
    return (
        <div className="container py-12 md:py-16 text-center">
            <h1 className="text-3xl font-bold text-destructive mb-4">{location.name}</h1>
            <p className="text-lg text-muted-foreground mb-8">{location.description}</p>
             <Link href="/locations">
                 <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Locations
                 </Button>
            </Link>
        </div>
    )
  }


  return (
    <div className="container py-12 md:py-16">
      <div className="mb-8">
        <Link href="/locations">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Locations
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image Section */}
        <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
          <Image
            src={location.imageUrl}
            alt={location.name}
            layout="fill"
            objectFit="cover"
            quality={85}
            data-ai-hint={location.dataAiHint}
          />
        </div>

        {/* Details Section */}
        <div>
          <h1 className="mb-4 text-4xl font-bold text-primary flex items-center">
             <MapPin className="h-8 w-8 mr-3 text-accent" /> {location.name}
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            {location.description}
          </p>

          <div className="space-y-6">
             <h3 className="text-2xl font-semibold text-primary border-b pb-2">Plan Your Trip</h3>
             <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/rentals" passHref>
                 <Button className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                    <Car className="mr-2 h-5 w-5" /> Find Rentals
                 </Button>
                </Link>
                 <Link href="/hotels" passHref>
                 <Button variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Hotel className="mr-2 h-5 w-5" /> Find Hotels Nearby
                 </Button>
                </Link>
             </div>
          </div>

        </div>
      </div>

      {/* Optional: Add more sections like "Things to Do", "Best Time to Visit", Map, etc. */}
      {/* <div className="mt-16">
         <h2 className="text-3xl font-bold text-primary mb-6">More Information</h2>
         ...
      </div> */}
    </div>
  );
}

// Optional: Generate static paths if you know all location IDs beforehand
// export async function generateStaticParams() {
//   // Fetch all location IDs from your data source
//   const locations = await getAllLocationIds(); // Replace with your data fetching logic
//   return locations.map((location) => ({
//     id: location.id,
//   }));
// }
