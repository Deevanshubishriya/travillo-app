import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, TreePine, Waves } from 'lucide-react'; // Example nature icons

// Mock data for hidden locations - replace with API data later
const hiddenLocations = [
  { id: '1', name: 'Khirsu Village', description: 'A serene hill station offering panoramic views of the Himalayas.', imageUrl: 'https://picsum.photos/400/300?random=1', category: 'village', icon: <MapPin className="h-5 w-5 mr-1 text-accent"/>, dataAiHint: 'himalayan village serene' },
  { id: '2', name: 'Chopta Tungnath Trek', description: 'Known as "Mini Switzerland", offering breathtaking meadows and ancient temples.', imageUrl: 'https://picsum.photos/400/300?random=2', category: 'trek', icon: <TreePine className="h-5 w-5 mr-1 text-accent"/>, dataAiHint: 'mountain trek meadow' },
  { id: '3', name: 'Binsar Wildlife Sanctuary', description: 'Home to diverse flora and fauna, perfect for nature lovers.', imageUrl: 'https://picsum.photos/400/300?random=3', category: 'nature', icon: <TreePine className="h-5 w-5 mr-1 text-accent"/>, dataAiHint: 'wildlife sanctuary forest' },
  { id: '4', name: 'Patal Bhuvaneshwar', description: 'A mystical limestone cave temple complex deep underground.', imageUrl: 'https://picsum.photos/400/300?random=4', category: 'spiritual', icon: <MapPin className="h-5 w-5 mr-1 text-accent"/>, dataAiHint: 'cave temple spiritual' },
  { id: '5', name: 'Munsiyari', description: 'A picturesque hamlet offering stunning views of the Panchachuli peaks.', imageUrl: 'https://picsum.photos/400/300?random=5', category: 'viewpoint', icon: <MapPin className="h-5 w-5 mr-1 text-accent"/>, dataAiHint: 'mountain viewpoint snow peaks' },
  { id: '6', name: 'Dodital Lake Trek', description: 'A beautiful freshwater lake surrounded by dense forests.', imageUrl: 'https://picsum.photos/400/300?random=6', category: 'trek', icon: <Waves className="h-5 w-5 mr-1 text-accent"/>, dataAiHint: 'mountain lake forest trek' },
];

// Function to determine icon based on category (can be expanded)
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'village':
    case 'viewpoint':
    case 'spiritual':
      return <MapPin className="h-5 w-5 mr-1 text-accent" />;
    case 'trek':
    case 'nature':
      return <TreePine className="h-5 w-5 mr-1 text-accent" />;
    case 'lake':
      return <Waves className="h-5 w-5 mr-1 text-accent" />;
    default:
      return <MapPin className="h-5 w-5 mr-1 text-accent" />;
  }
};


export default function LocationsPage() {
  return (
    <div className="container py-12 md:py-16">
      <h1 className="mb-8 text-center text-4xl font-bold text-primary">Explore Hidden Locations</h1>
      <p className="mb-12 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
        Discover the lesser-known treasures of Uttarakhand. From tranquil villages to challenging treks, find your next adventure.
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {hiddenLocations.map((location) => (
          <Card key={location.id} className="overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02]">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={location.imageUrl}
                  alt={location.name}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={location.dataAiHint}
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
