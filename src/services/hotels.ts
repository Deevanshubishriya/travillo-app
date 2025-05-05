
/**
 * Represents a geographical location with latitude and longitude coordinates.
 * (Keeping this interface in case it's needed elsewhere, but not used for search anymore)
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
 * Represents a hotel with basic details and booking suggestions.
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
  /**
   * The suggested website for booking this hotel.
   */
  suggestedBookingSite?: string;
  /**
   * The URL to the suggested booking website (can be a generic search or homepage).
   */
  bookingSearchUrl?: string;
}

/**
 * Asynchronously retrieves a list of hotels near a specified location name.
 * Simulates an API call.
 *
 * @param locationName The name of the location (e.g., city, village, landmark) to search for hotels around.
 * @returns A promise that resolves to an array of Hotel objects.
 */
export async function getHotelsByLocationName(locationName: string): Promise<Hotel[]> {
  console.log("Searching for hotels near location name:", locationName);
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate different results based on location name
  // In a real app, this would involve geocoding the name or using a location-name based API.
  const allHotels: Hotel[] = [
    {
      id: 'hotel1',
      name: 'The Himalayan View',
      imageUrl: `https://picsum.photos/400/300?random=himalayan`,
      rating: 4.5,
      dataAiHint: 'mountain resort hotel balcony view',
      suggestedBookingSite: 'Booking.com',
      bookingSearchUrl: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(locationName)}` // Example dynamic search URL
    },
    {
      id: 'hotel2',
      name: 'Riverside Inn',
      imageUrl: `https://picsum.photos/400/300?random=riverside`,
      rating: 3.8,
      dataAiHint: 'riverside hotel cozy inn',
      suggestedBookingSite: 'Agoda',
      bookingSearchUrl: `https://www.agoda.com/search?city=${encodeURIComponent(locationName)}` // Example dynamic search URL
    },
    {
      id: 'hotel3',
      name: 'Forest Retreat',
      imageUrl: `https://picsum.photos/400/300?random=forest`,
      rating: 4.2,
      dataAiHint: 'forest cabin hotel wood',
      suggestedBookingSite: 'MakeMyTrip',
      bookingSearchUrl: `https://www.makemytrip.com/hotels/hotel-listing/?city=${encodeURIComponent(locationName)}` // Example dynamic search URL
    },
     {
      id: 'hotel4',
      name: 'Peak Paradise Lodge',
      imageUrl: `https://picsum.photos/400/300?random=peak`,
      rating: 4.8,
      dataAiHint: 'luxury mountain lodge snow view',
       suggestedBookingSite: 'Goibibo',
       bookingSearchUrl: `https://www.goibibo.com/hotels/find-hotels-in-${encodeURIComponent(locationName.toLowerCase().replace(/\s+/g, '-'))}/` // Example dynamic search URL (approximation)
    },
    {
      id: 'hotel5',
      name: 'Valley Homestay',
      imageUrl: `https://picsum.photos/400/300?random=valley`,
      rating: 4.0,
      dataAiHint: 'homestay local house valley',
       suggestedBookingSite: 'Airbnb',
       bookingSearchUrl: `https://www.airbnb.com/s/${encodeURIComponent(locationName)}/homes` // Example dynamic search URL
    },
    {
      id: 'hotel6',
      name: 'Budget Backpackers Hostel',
       imageUrl: `https://picsum.photos/400/300?random=hostel`,
      rating: 3.2,
      dataAiHint: 'hostel budget travel backpacker',
      suggestedBookingSite: 'Hostelworld',
      bookingSearchUrl: `https://www.hostelworld.com/search?search_keywords=${encodeURIComponent(locationName)}` // Example dynamic search URL
    }
  ];

   // Simulate fewer/different hotels based on location name (example logic)
   const lowerCaseName = locationName.toLowerCase();
   if (lowerCaseName.includes('khirsu')) { // Example: Specific results for 'khirsu'
     return allHotels.filter(h => h.rating > 4.0 || h.id === 'hotel5'); // Himalayan View, Peak Paradise, Valley Homestay
   } else if (lowerCaseName.includes('rishikesh')) { // Example: More options for 'rishikesh'
      return allHotels.filter(h => h.id !== 'hotel4'); // All except Peak Paradise
   } else if (lowerCaseName.includes('remote') || lowerCaseName.includes('trek')) { // Fewer options for generic remote/trek locations
      return allHotels.filter(h => h.rating <= 4.0); // Riverside, Forest Retreat, Valley Homestay, Hostel
   }

  // Default: Return a random subset if no specific match
  const shuffled = allHotels.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * (allHotels.length - 2)) + 3); // Return 3 to all hotels
}
