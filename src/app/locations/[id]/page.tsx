
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, MapPin, Car, Hotel, Map as MapIconLucide } from 'lucide-react';
import { ClientImage } from '@/components/client-image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LeafletMap from '@/components/leaflet-map'; // Import the LeafletMap component

// Mock data function (replace with actual data fetching)
async function getLocationDetails(id: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));

  const locations = [
    { id: '1', name: 'Khirsu Village', description: 'A serene hill station offering panoramic views of the Himalayas. Perfect for a peaceful getaway, surrounded by oak and deodar forests. Enjoy nature walks and bird watching.', imageUrl: '/image/khirsuVillage.jpg', dataAiHint: 'Khirsu village serene himalayas', coordinates: { lat: 30.1978, lng: 78.8798 } },
    { id: '2', name: 'Chopta Tungnath Trek', description: 'Known as "Mini Switzerland", offering breathtaking meadows and the highest Shiva temple in the world. A moderate trek suitable for most fitness levels.', imageUrl: '/image/Chopta-Tungnath2.jpg', dataAiHint: 'chopta trek', coordinates: { lat: 30.4851, lng: 79.3331 } },
    { id: '3', name: 'Binsar Wildlife Sanctuary', description: 'Home to diverse flora and fauna, perfect for nature lovers exploring dense forests and spotting wildlife.', imageUrl: '/image/binsar-wildlife-sanctuary2.jpg', dataAiHint: 'binsar sanctuary', coordinates: { lat: 29.6949, lng: 79.7534 } },
    { id: '4', name: 'Patal Bhuvaneshwar', description: 'A mystical limestone cave temple complex deep underground, showcasing unique geological formations.', imageUrl: '/image/patal-bhavanashavara2.jpg', dataAiHint: 'patal cave temple', coordinates: { lat: 29.7078, lng: 80.1050 } },
    { id: '5', name: 'Munsiyari', description: 'A picturesque hamlet offering stunning, clear views of the majestic Panchachuli peaks.', imageUrl: '/image/munsiyari2.jpg', dataAiHint: 'munsiyari panchachuli', coordinates: { lat: 30.0667, lng: 80.2333 } },
    { id: '6', name: 'Dodital Lake Trek', description: 'A beautiful freshwater high-altitude lake surrounded by dense forests, requiring a moderate trek.', imageUrl: '/image/Dodital2.jpg', dataAiHint: 'dodital lake forest', coordinates: { lat: 30.8373, lng: 78.4777 } },
    { id: '7', name: 'Lansdowne', description: 'A quiet cantonment town known for its colonial charm and surrounding oak and pine forests. Visit the War Memorial and St. Mary\'s Church.', imageUrl: '/image/Dodital2.jpg', dataAiHint: 'lansdowne colonial', coordinates: { lat: 29.8378, lng: 78.6865 } },
    { id: '8', name: 'Mukteshwar', description: 'Famous for the Mukteshwar Dham temple perched atop a cliff, offering stunning Himalayan panoramas and lush fruit orchards.', imageUrl: '/image/Mukteshwar2.jpg', dataAiHint: 'mukteshwar temple view', coordinates: { lat: 29.4722, lng: 79.6479 } },
    { id: '9', name: 'Chakrata', description: 'A secluded hill station offering pristine natural beauty, Tiger Falls, and opportunities for trekking and exploration.', imageUrl: '/image/chakratas2.jpg', dataAiHint: 'chakrata tiger falls', coordinates: { lat: 30.7026, lng: 77.8694 } },
    { id: '10', name: 'Pauri', description: 'A district headquarters town offering panoramic views of snow-clad Himalayan peaks like Banderpunch, Swargarohini, and Gangotri group.', imageUrl: '/image/pauri2.jpg', dataAiHint: 'pauri himalayan peaks', coordinates: { lat: 30.1498, lng: 78.7748 } },
  ];
  const location = locations.find(loc => loc.id === id);
  if (!location) {
    return { id: 'not-found', name: 'Location Not Found', description: 'The requested location could not be found.', imageUrl: 'https://placehold.co/800x500.png', dataAiHint: 'error mountains', coordinates: null };
  }
  return location;
}

export default async function LocationDetailPage({ params }: { params: { id: string } }) {
  const location = await getLocationDetails(params.id);

  if (location.id === 'not-found' || !location.coordinates) { // Also handle if coordinates are null from the start
    return (
        <div className="container py-12 md:py-16 text-center">
            <h1 className="text-3xl font-bold text-destructive mb-4">{location.name || 'Location Not Found'}</h1>
            <p className="text-lg text-muted-foreground mb-8">
                {location.description || 'The requested location could not be found or map data is unavailable.'}
            </p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left Column: Image and Details */}
        <div className="space-y-8">
           <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
            <ClientImage
              src={location.imageUrl}
              alt={location.name}
              layout="fill"
              objectFit="cover"
              quality={85}
              data-ai-hint={location.dataAiHint}
              priority={true}
            />
          </div>

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
                 <Link href="/rentals">
                   <Button variant="default" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                     <Car className="mr-2 h-5 w-5" /> Find Rentals
                   </Button>
                 </Link>
                 <Link href={`/hotels?location=${encodeURIComponent(location.name)}`}>
                   <Button variant="default" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                     <Hotel className="mr-2 h-5 w-5" /> Find Hotels Nearby
                   </Button>
                 </Link>
               </div>
            </div>
          </div>
        </div>


        {/* Right Column: Map */}
        <div className="md:sticky md:top-24">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-primary">
                 <MapIconLucide className="h-5 w-5 mr-2 text-accent"/> Location Map
              </CardTitle>
            </CardHeader>
            <CardContent>
               {location.coordinates ? (
                 <LeafletMap
                    latitude={location.coordinates.lat}
                    longitude={location.coordinates.lng}
                    locationName={location.name}
                    zoom={13} // Default zoom, can be adjusted
                 />
               ) : (
                 <div className="flex h-96 items-center justify-center rounded-md bg-muted p-4">
                   <p className="text-center text-muted-foreground">Map coordinates are not available for this location.</p>
                 </div>
               )}
               {location.coordinates && (
                 <p className="mt-2 text-xs text-muted-foreground text-center">
                   <a href={`https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                       View on Google Maps (External)
                   </a>
                 </p>
               )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
