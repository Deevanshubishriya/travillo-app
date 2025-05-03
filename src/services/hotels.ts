/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents a hotel with basic details.
 */
export interface Hotel {
  /**
   * The unique identifier for the hotel.
   */
  id: string;
  /**
   * The name of the hotel.
   */
  name: string;
  /**
   * The URL of an image of the hotel.
   */
  imageUrl: string;
  /**
   * The rating of the hotel (e.g., 4.5 stars).
   */
  rating: number;
  /**
   * AI hint for image generation.
   */
  dataAiHint: string;
}

/**
 * Asynchronously retrieves a list of hotels near a specified location.
 * Simulates an API call.
 *
 * @param location The location around which to search for hotels.
 * @returns A promise that resolves to an array of Hotel objects.
 */
export async function getHotelsNear(location: Location): Promise<Hotel[]> {
  console.log("Searching for hotels near:", location);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate different results based on location (e.g., more hotels near common coordinates)
  const allHotels: Hotel[] = [
    {
      id: 'hotel1',
      name: 'The Himalayan View',
      imageUrl: `https://picsum.photos/400/300?random=${Math.random()}`,
      rating: 4.5,
      dataAiHint: 'mountain resort hotel balcony view'
    },
    {
      id: 'hotel2',
      name: 'Riverside Inn',
      imageUrl: `https://picsum.photos/400/300?random=${Math.random()}`,
      rating: 3.8,
      dataAiHint: 'riverside hotel cozy inn'
    },
    {
      id: 'hotel3',
      name: 'Forest Retreat',
      imageUrl: `https://picsum.photos/400/300?random=${Math.random()}`,
      rating: 4.2,
      dataAiHint: 'forest cabin hotel wood'
    },
     {
      id: 'hotel4',
      name: 'Peak Paradise Lodge',
      imageUrl: `https://picsum.photos/400/300?random=${Math.random()}`,
      rating: 4.8,
      dataAiHint: 'luxury mountain lodge snow view'
    },
    {
      id: 'hotel5',
      name: 'Valley Homestay',
      imageUrl: `https://picsum.photos/400/300?random=${Math.random()}`,
      rating: 4.0,
      dataAiHint: 'homestay local house valley'
    },
    {
      id: 'hotel6',
      name: 'Budget Backpackers Hostel',
       imageUrl: `https://picsum.photos/400/300?random=${Math.random()}`,
      rating: 3.2,
      dataAiHint: 'hostel budget travel backpacker'
    }
  ];

   // Simulate fewer/different hotels based on location coordinates (example logic)
   if (location.lat > 30) { // Northern areas might have luxury lodges
     return allHotels.filter(h => h.rating > 4.0);
   } else if (location.lng < 79) { // Western areas might have more homestays/budget options
      return allHotels.filter(h => h.rating <= 4.0);
   }


  // Default: Return a random subset
  const shuffled = allHotels.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * (allHotels.length - 2)) + 3); // Return 3 to all hotels
}
