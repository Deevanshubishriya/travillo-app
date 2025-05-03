
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, MapPin, Car, Hotel, Map } from 'lucide-react'; // Added Map icon
import { ClientImage } from '@/components/client-image'; // Import the client component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Added Card components

// Mock data function (replace with actual data fetching)
async function getLocationDetails(id: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay

  // Use location names in picsum URLs for more relevance
  const locations = [
    { id: '1', name: 'Khirsu Village', description: 'A serene hill station offering panoramic views of the Himalayas. Perfect for a peaceful getaway, surrounded by oak and deodar forests. Enjoy nature walks and bird watching.', imageUrl: 'https://picsum.photos/seed/khirsu/800/500', dataAiHint: 'himalayan village serene landscape', staticMapUrl: 'https://picsum.photos/seed/khirsu-map/600/400', mapAiHint: 'map Khirsu Uttarakhand' },
    { id: '2', name: 'Chopta Tungnath Trek', description: 'Known as "Mini Switzerland", offering breathtaking meadows and the highest Shiva temple in the world. A moderate trek suitable for most fitness levels.', imageUrl: 'https://picsum.photos/seed/chopta/800/500', dataAiHint: 'mountain trek meadow temple', staticMapUrl: 'https://picsum.photos/seed/chopta-map/600/400', mapAiHint: 'map Chopta Tungnath Uttarakhand' },
    { id: '3', name: 'Binsar Wildlife Sanctuary', description: 'Home to diverse flora and fauna, perfect for nature lovers exploring dense forests and spotting wildlife.', imageUrl: 'https://picsum.photos/seed/binsar/800/500', dataAiHint: 'wildlife sanctuary forest animals', staticMapUrl: 'https://picsum.photos/seed/binsar-map/600/400', mapAiHint: 'map Binsar Wildlife Sanctuary Uttarakhand' },
    { id: '4', name: 'Patal Bhuvaneshwar', description: 'A mystical limestone cave temple complex deep underground, showcasing unique geological formations.', imageUrl: 'https://picsum.photos/seed/patal/800/500', dataAiHint: 'cave temple spiritual underground', staticMapUrl: 'https://picsum.photos/seed/patal-map/600/400', mapAiHint: 'map Patal Bhuvaneshwar Uttarakhand' },
    { id: '5', name: 'Munsiyari', description: 'A picturesque hamlet offering stunning, clear views of the majestic Panchachuli peaks.', imageUrl: 'https://picsum.photos/seed/munsiyari/800/500', dataAiHint: 'mountain viewpoint snow peaks village', staticMapUrl: 'https://picsum.photos/seed/munsiyari-map/600/400', mapAiHint: 'map Munsiyari Uttarakhand' },
    { id: '6', name: 'Dodital Lake Trek', description: 'A beautiful freshwater high-altitude lake surrounded by dense forests, requiring a moderate trek.', imageUrl: 'https://picsum.photos/seed/dodital/800/500', dataAiHint: 'mountain lake forest trek water', staticMapUrl: 'https://picsum.photos/seed/dodital-map/600/400', mapAiHint: 'map Dodital Lake Uttarakhand' },
    { id: '7', name: 'Lansdowne', description: 'A quiet cantonment town known for its colonial charm and surrounding oak and pine forests. Visit the War Memorial and St. Mary\'s Church.', imageUrl: 'https://picsum.photos/seed/lansdowne/800/500', dataAiHint: 'hill station cantonment colonial architecture', staticMapUrl: 'https://picsum.photos/seed/lansdowne-map/600/400', mapAiHint: 'map Lansdowne Uttarakhand' },
    { id: '8', name: 'Mukteshwar', description: 'Famous for the Mukteshwar Dham temple perched atop a cliff, offering stunning Himalayan panoramas and lush fruit orchards.', imageUrl: 'https://picsum.photos/seed/mukteshwar/800/500', dataAiHint: 'temple town cliffside orchards mountain view', staticMapUrl: 'https://picsum.photos/seed/mukteshwar-map/600/400', mapAiHint: 'map Mukteshwar Uttarakhand' },
    { id: '9', name: 'Chakrata', description: 'A secluded hill station offering pristine natural beauty, Tiger Falls, and opportunities for trekking and exploration.', imageUrl: 'https://picsum.photos/seed/chakrata/800/500', dataAiHint: 'hill station waterfall adventure remote forest', staticMapUrl: 'https://picsum.photos/seed/chakrata-map/600/400', mapAiHint: 'map Chakrata Uttarakhand' },
    { id: '10', name: 'Pauri', description: 'A district headquarters town offering panoramic views of snow-clad Himalayan peaks like Banderpunch, Swargarohini, and Gangotri group.', imageUrl: 'https://picsum.photos/seed/pauri/800/500', dataAiHint: 'mountain viewpoint valley town snow peaks', staticMapUrl: 'https://picsum.photos/seed/pauri-map/600/400', mapAiHint: 'map Pauri Garhwal Uttarakhand' },
  ];
  const location = locations.find(loc => loc.id === id);
  if (!location) {
    // Handle not found case appropriately in a real app
    return { id: 'not-found', name: 'Location Not Found', description: 'The requested location could not be found.', imageUrl: 'https://picsum.photos/800/500?grayscale', dataAiHint: 'placeholder image error', staticMapUrl: '', mapAiHint: '' };
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Left Column: Image and Details */}
        <div className="space-y-8">
           {/* Image Section */}
           <div className="relative aspect-video overflow-hidden rounded-lg shadow-lg">
            <ClientImage
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


        {/* Right Column: Map */}
        <div className="md:sticky md:top-24"> {/* Sticky map on medium screens and up */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-xl text-primary">
                 <Map className="h-5 w-5 mr-2 text-accent"/> Location Map
              </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="relative aspect-square w-full overflow-hidden rounded-md border bg-muted">
                {/* Use ClientImage for the map */}
                <ClientImage
                  src={location.staticMapUrl || `https://picsum.photos/seed/${params.id}-map/600/400?grayscale`} // Fallback to grayscale map placeholder
                  alt={`Map showing ${location.name}`}
                  layout="fill"
                  objectFit="cover"
                  quality={75}
                  data-ai-hint={location.mapAiHint || `map ${location.name}`}
                />
                {/* In a real app, you would embed an interactive map here (e.g., Google Maps iframe or Leaflet) */}
                {/* <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(location.name + ', Uttarakhand')}`} // Replace YOUR_API_KEY
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${location.name}`}
                  className="absolute inset-0"
                ></iframe> */}
               </div>
                <p className="mt-2 text-xs text-muted-foreground text-center">Static map preview. Interactive map would be used in a live application.</p>
            </CardContent>
          </Card>
        </div>

      </div>

    </div>
  );
}
