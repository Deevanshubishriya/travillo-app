
'use client'; // This component needs client-side interactivity

import { useState } from 'react';
import type { Vehicle, VehicleSearchCriteria } from '@/services/rental-cars'; // Ensure this path is correct
import { findAvailableVehicles } from '@/services/rental-cars'; // Ensure this path is correct
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Car, Search, Loader2, ExternalLink } from 'lucide-react';
import { ClientImage } from '@/components/client-image'; // Import the client component
import { useToast } from '@/hooks/use-toast'; // Use the toast hook
// Removed AuthGuard import

export default function RentalsPage() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState<Date | undefined>();
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>();
  const [availableVehicles, setAvailableVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const { toast } = useToast(); // Initialize toast


  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setSearchAttempted(true);
    setAvailableVehicles([]); // Clear previous results

    if (!pickupLocation || !dropoffLocation || !pickupDate || !dropoffDate) {
       toast({
        title: "Missing Information",
        description: "Please fill in all fields to search for rentals.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

     if (dropoffDate <= pickupDate) {
       toast({
        title: "Invalid Dates",
        description: "Drop-off date must be after the pick-up date.",
        variant: "destructive",
      });
       setIsLoading(false);
       return;
     }


    const criteria: VehicleSearchCriteria = {
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate,
    };

    try {
      const vehicles = await findAvailableVehicles(criteria);
      setAvailableVehicles(vehicles);
       if (vehicles.length === 0) {
         toast({
           title: "No Vehicles Found",
           description: "No vehicles match your criteria for the selected dates/locations.",
         });
       }
    } catch (error) {
      console.error("Error finding vehicles:", error);
      toast({
        title: "Search Error",
        description: "Could not retrieve vehicle information. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Removed AuthGuard wrapper
    <div className="container py-12 md:py-16">
      <h1 className="mb-8 text-center text-4xl font-bold text-primary">Find Your Ride</h1>
      <p className="mb-12 text-center text-lg text-muted-foreground max-w-2xl mx-auto">
        Enter your trip details to find available vehicles for your Uttarakhand adventure.
      </p>

      {/* Search Form Card */}
      <Card className="mb-12 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Search Rentals</CardTitle>
          <CardDescription>Fill in the details below to find available cars.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5 items-end">
            <div className="space-y-1">
              <Label htmlFor="pickupLocation">Pick-up Location</Label>
              <Input
                id="pickupLocation"
                placeholder="e.g., Dehradun Airport"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="dropoffLocation">Drop-off Location</Label>
              <Input
                id="dropoffLocation"
                placeholder="e.g., Rishikesh"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                required
              />
            </div>

             <div className="space-y-1">
              <Label htmlFor="pickupDate">Pick-up Date</Label>
               <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${!pickupDate && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {pickupDate ? format(pickupDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={pickupDate}
                    onSelect={setPickupDate}
                    initialFocus
                    disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} // Disable past dates
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-1">
               <Label htmlFor="dropoffDate">Drop-off Date</Label>
               <Popover>
                <PopoverTrigger asChild>
                   <Button
                    variant={"outline"}
                    className={`w-full justify-start text-left font-normal ${!dropoffDate && "text-muted-foreground"}`}
                   >
                     <CalendarIcon className="mr-2 h-4 w-4" />
                     {dropoffDate ? format(dropoffDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dropoffDate}
                    onSelect={setDropoffDate}
                    initialFocus
                     disabled={(date) => // Disable dates before today or before pickupDate
                       date < new Date(new Date().setHours(0,0,0,0)) ||
                       (pickupDate ? date <= pickupDate : false)
                     }
                  />
                </PopoverContent>
              </Popover>
            </div>


            <Button type="submit" disabled={isLoading} className="w-full lg:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Search
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div>
        <h2 className="mb-6 text-2xl font-semibold text-primary">Available Vehicles</h2>
        {isLoading ? (
           <div className="flex justify-center items-center p-8">
             <Loader2 className="h-8 w-8 animate-spin text-primary" />
             <span className="ml-3 text-muted-foreground">Searching for vehicles...</span>
           </div>
        ) : searchAttempted && availableVehicles.length === 0 ? (
          <p className="text-center text-muted-foreground">No vehicles found matching your criteria. Try different locations or dates.</p>
        ) : availableVehicles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {availableVehicles.map((vehicle) => (
              <Card key={vehicle.id} className="overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.02] flex flex-col">
                <CardHeader className="p-0">
                   <div className="relative h-48 w-full bg-muted">
                     {/* Use ClientImage wrapper */}
                     <ClientImage
                       // Use placeholder if imageUrl is invalid or missing, seed with ID for consistency
                       src={vehicle.imageUrl || `https://picsum.photos/seed/${vehicle.id}/400/300`}
                       alt={vehicle.model}
                       layout="fill"
                       objectFit="cover"
                       data-ai-hint={vehicle.dataAiHint || 'rental car vehicle'}
                       // Fallback handled within ClientImage
                     />
                   </div>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                   <CardTitle className="mb-2 text-xl text-primary flex items-center">
                     <Car className="h-5 w-5 mr-2 text-accent"/> {vehicle.model}
                   </CardTitle>
                  <CardDescription className="text-lg font-medium text-secondary-foreground">
                    ₹{vehicle.dailyRate.toLocaleString()}/day
                  </CardDescription>
                   <p className="text-xs text-muted-foreground mt-2">
                     Booking via external provider.
                   </p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                     {/* Replace '#' with actual booking link if available from API */}
                     <a href="#" target="_blank" rel="noopener noreferrer">
                        Book Now <ExternalLink className="ml-2 h-4 w-4"/>
                     </a>
                  </Button>
                   {/* Note: This button would typically link to an external booking site */}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
           searchAttempted ? null : <p className="text-center text-muted-foreground">Enter your search criteria above to see available vehicles.</p> // Initial state message
        )}
      </div>
    </div>
  );
}
