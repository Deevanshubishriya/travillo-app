'use client'; // Needs client-side interaction for search

import { useState } from 'react';
import type { Hotel, Location } from '@/services/hotels'; // Adjust path if necessary
import { getHotelsNear } from '@/services/hotels'; // Adjust path if necessary
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Hotel as HotelIcon, Search, Loader2, Star, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function HotelsPage() {
  const [locationQuery, setLocationQuery] = useState('');
  const [nearbyHotels, setNearbyHotels] = useState<Hotel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const { toast } = useToast();

  // Basic location parsing (Improve with a Geocoding API in a real app)
  const parseLocation = (query: string): Location | null => {
    // Example: Try to extract coordinates like "29.38, 79.45"
    const coords = query.match(/([-+]?\d*\.?\d+)\s*,\s*([-+]?\d*\.?\d+)/);
    if (coords && coords.length === 3) {
      const lat = parseFloat(coords[1]);
      const lng = parseFloat(coords[2]);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }
    // In a real app, use a geocoding service to convert place names to coordinates
    // For now, return null if it's not coordinates
     toast({
       title: "Location Format",
       description: "Please enter coordinates like '29.38, 79.45' or use a geocoding service for place names.",
       variant: "destructive"
     });
    return null;
  };

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setSearchAttempted(true);
    setNearbyHotels([]);

    if (!locationQuery) {
      toast({
        title: "Missing Location",
        description: "Please enter a location or coordinates to search for hotels.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Placeholder for location resolution - ideally use Geocoding API
    const location: Location | null = parseLocation(locationQuery);

    if (!location) {
        // Error handled within parseLocation via toast
      setIsLoading(false);
      return; // Stop if location couldn't be parsed
    }


    try {
      // Pass the actual location object to the service
      const hotels = await getHotelsNear(location);
      setNearbyHotels(hotels);
       if (hotels.length === 0) {
         toast({
           title: "No Hotels Found",
           description: "No hotels found near the specified location.",
         });
       }
    } catch (error) {
      console.error("Error finding hotels:", error);
      toast({
        title: "Search Error",
        description: "Could not retrieve hotel information. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

   // Helper to render star ratings
   const renderStars = (rating: number) => {
     const fullStars = Math.floor(rating);
     const halfStar = rating % 1 >= 0.5;
     const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
     return (
       <div className="flex items-center">
         {Array(fullStars).fill(0).map((_, i) => (
           <Star key={`full-${i}`} className="h-4 w-4 fill-accent text-accent" />
         ))}
         {halfStar && <Star key="half" className="h-4 w-4 fill-accent text-accent" style={{ clipPath: 'inset(0 50% 0 0)' }} />}
         {Array(emptyStars).fill(0).map((_, i) => (
           <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground/50" />
         ))}
         <span className="ml-1 text-xs text-muted-foreground">({rating.toFixed(1)})</span>
       </div>
     );
   };


  return (
    <div className="container py-12 md:py-16">
      <h1 className="mb-8 text-center text-4xl font-bold text-primary">Find Hotels Nearby</h1>
      <p className="mb-12 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
        Enter a location (or coordinates like "lat, lng") to discover hotels near hidden gems and get suggestions for booking sites.
      </p>

      {/* Search Form Card */}
      <Card className="mb-12 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Search Hotels</CardTitle>
          <CardDescription>Enter a location to find nearby accommodation.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="space-y-1 flex-grow">
              <Label htmlFor="locationQuery">Location / Coordinates</Label>
              <Input
                id="locationQuery"
                placeholder="e.g., Khirsu Village or 29.38, 79.45"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                required
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Search Hotels
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div>
        <h2 className="mb-6 text-2xl font-semibold text-primary">Nearby Hotels</h2>
         {isLoading ? (
           <div className="flex justify-center items-center p-8">
             <Loader2 className="h-8 w-8 animate-spin text-primary" />
             <span className="ml-3 text-muted-foreground">Searching for hotels...</span>
           </div>
        ) : searchAttempted && nearbyHotels.length === 0 ? (
           <p className="text-center text-muted-foreground">No hotels found for this location. Please refine your search.</p>
        ) : nearbyHotels.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nearbyHotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] flex flex-col">
                 <CardHeader className="p-0">
                   <div className="relative h-48 w-full bg-muted">
                     <Image
                       src={hotel.imageUrl || `https://picsum.photos/400/300?random=${hotel.id}`} // Use ID for slightly more consistent placeholder
                       alt={hotel.name}
                       layout="fill"
                       objectFit="cover"
                       data-ai-hint={hotel.dataAiHint || 'hotel building exterior'}
                       onError={(e) => { e.currentTarget.src = 'https://picsum.photos/400/300?grayscale&blur=2';}} // Fallback image
                     />
                   </div>
                 </CardHeader>
                <CardContent className="p-4 flex-grow">
                   <CardTitle className="mb-2 text-xl text-primary flex items-center">
                    <HotelIcon className="h-5 w-5 mr-2 text-accent"/> {hotel.name}
                   </CardTitle>
                   {renderStars(hotel.rating)}
                   {hotel.suggestedBookingSite && hotel.bookingSearchUrl && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Try searching on: {hotel.suggestedBookingSite}
                    </p>
                   )}
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  {hotel.bookingSearchUrl ? (
                    <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href={hotel.bookingSearchUrl} target="_blank" rel="noopener noreferrer">
                         Search on {hotel.suggestedBookingSite || 'Booking Site'} <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  ) : (
                     <Button disabled className="w-full bg-muted text-muted-foreground cursor-not-allowed">
                        Booking Info Unavailable
                     </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
           searchAttempted ? null : <p className="text-center text-muted-foreground">Enter a location above to find nearby hotels.</p> // Initial state
        )}
      </div>
    </div>
  );
}
