
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, TreePine, Waves, MountainSnow, Landmark, Building2, Home } from 'lucide-react'; // Added Building2, Home
import { ClientImage } from '@/components/client-image';


// Mock data for hidden locations - replace with API data later
// Use location names in picsum URLs for more relevance
const hiddenLocations = [
  { id: '1', name: 'Khirsu Village', description: 'A serene hill station offering panoramic views of the Himalayas.', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Khirsu_village_2.jpg', category: 'village', dataAiHint: 'khirsu village landscape', coordinates: { lat: 30.1978, lng: 78.8798 } },
  { id: '2', name: 'Chopta Tungnath Trek', description: 'Known as "Mini Switzerland", offering breathtaking meadows and ancient temples.', imageUrl: 'https://picsum.photos/seed/chopta/400/300', category: 'trek', dataAiHint: 'chopta mountains', coordinates: { lat: 30.4851, lng: 79.3331 } },
  { id: '3', name: 'Binsar Wildlife Sanctuary', description: 'Home to diverse flora and fauna, perfect for nature lovers.', imageUrl: 'https://picsum.photos/seed/binsar/400/300', category: 'nature', dataAiHint: 'binsar wildlife', coordinates: { lat: 29.6949, lng: 79.7534 } },
  { id: '4', name: 'Patal Bhuvaneshwar', description: 'A mystical limestone cave temple complex deep underground.', imageUrl: 'https://picsum.photos/seed/patal/400/300', category: 'spiritual', dataAiHint: 'patal cave', coordinates: { lat: 29.7078, lng: 80.1050 } }, // Use Landmark icon
  { id: '5', name: 'Munsiyari', description: 'A picturesque hamlet offering stunning views of the Panchachuli peaks.', imageUrl: 'https://picsum.photos/seed/munsiyari/400/300', category: 'viewpoint', dataAiHint: 'munsiyari peaks', coordinates: { lat: 30.0667, lng: 80.2333 } }, // Use MountainSnow icon
  { id: '6', name: 'Dodital Lake Trek', description: 'A beautiful freshwater lake surrounded by dense forests.', imageUrl: 'https://picsum.photos/seed/dodital/400/300', category: 'trek', dataAiHint: 'dodital lake', coordinates: { lat: 30.8373, lng: 78.4777 } },
  { id: '7', name: 'Lansdowne', description: 'A quiet cantonment town surrounded by thick oak and blue pine forests.', imageUrl: 'https://picsum.photos/seed/lansdowne/400/300', category: 'cantonment', dataAiHint: 'lansdowne town', coordinates: { lat: 29.8378, lng: 78.6865 } }, // Use Building2 icon
  { id: '8', name: 'Mukteshwar', description: 'Known for its cliff-top temple, fruit orchards, and panoramic Himalayan views.', imageUrl: 'https://picsum.photos/seed/mukteshwar/400/300', category: 'temple town', dataAiHint: 'mukteshwar temple', coordinates: { lat: 29.4722, lng: 79.6479 } }, // Use Landmark icon
  { id: '9', name: 'Chakrata', description: 'A secluded hill station with stunning waterfalls and opportunities for adventure.', imageUrl: 'https://picsum.photos/seed/chakrata/400/300', category: 'hill station', dataAiHint: 'chakrata waterfall', coordinates: { lat: 30.7026, lng: 77.8694 } }, // Use MountainSnow icon
  { id: '10', name: 'Pauri', description: 'Offers breathtaking views of snow-capped peaks and lush green valleys.', imageUrl: 'https://picsum.photos/seed/pauri/400/300', category: 'viewpoint', dataAiHint: 'pauri valley', coordinates: { lat: 30.1498, lng: 78.7748 } }, // Use MountainSnow icon

];

// Function to determine icon based on category (can be expanded)
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'village':
      return <Home className="h-5 w-5 mr-1 text-accent" />; // Changed to Home
    case 'trek':
    case 'nature':
      return <TreePine className="h-5 w-5 mr-1 text-accent" />;
    case 'spiritual':
    case 'temple town':
      return <Landmark className="h-5 w-5 mr-1 text-accent" />; // Updated Icon to Landmark
    case 'viewpoint':
    case 'hill station':
       return <MountainSnow className="h-5 w-5 mr-1 text-accent" />; // Updated Icon
    case 'lake':
      return <Waves className="h-5 w-5 mr-1 text-accent" />;
     case 'cantonment':
       return <Building2 className="h-5 w-5 mr-1 text-accent" />; // Added Cantonment icon
    default:
      return <MapPin className="h-5 w-5 mr-1 text-accent" />;
  }
};


export default function LocationsPage() {
  return (

     <div className="container py-12 md:py-16">
       <h1 className="mb-8 text-center text-4xl font-bold text-primary">Explore Hidden Locations</h1>
       <p className="mb-12 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
         Discover lesser-known treasures with Travillo. From tranquil villages to challenging treks, find your next adventure.
       </p>

       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"> {/* Added xl:grid-cols-4 for better layout */}
         {hiddenLocations.map((location) => (
           <Card key={location.id} className="overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
             <CardHeader className="p-0">
               <div className="relative h-48 w-full">
                 {/* Use ClientImage wrapper */}
                 <ClientImage
                   src={location.imageUrl}
                   alt={location.name}
                   layout="fill"
                   objectFit="cover"
                   data-ai-hint={location.dataAiHint}
                   // Fallback handled within ClientImage
                 />
               </div>
             </CardHeader>
             <CardContent className="p-4">
               <CardTitle className="mb-2 text-xl text-primary flex items-center">
                  {getCategoryIcon(location.category)} {location.name}
               </CardTitle>
               <CardDescription className="text-muted-foreground">
                 {location.description}
               </CardDescription>
             </CardContent>
             <CardFooter className="p-4 pt-0">
               {/* Link to a potential location detail page */}
               <Link href={`/locations/${location.id}`} passHref>
                  <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                   Learn More
                 </Button>
               </Link>
             </CardFooter>
           </Card>
         ))}
       </div>
     </div>
  );
}
