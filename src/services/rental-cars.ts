/**
 * Represents a vehicle available for rent.
 */
export interface Vehicle {
  /**
   * The unique identifier for the vehicle.
   */
  id: string;
  /**
   * The make and model of the vehicle.
   */
  model: string;
  /**
   * The daily rental rate for the vehicle.
   */
  dailyRate: number;
  /**
   * URL of image for the vehicle.
   */
  imageUrl: string;
  /**
   * AI hint for image generation.
   */
  dataAiHint: string;
}

/**
 * Represents search criteria for finding available vehicles.
 */
export interface VehicleSearchCriteria {
  /**
   * The pickup location for the rental.
   */
  pickupLocation: string;
  /**
   * The dropoff location for the rental.
   */
  dropoffLocation: string;
  /**
   * The pickup date for the rental.
   */
  pickupDate: Date;
  /**
   * The dropoff date for the rental.
   */
  dropoffDate: Date;
}

/**
 * Asynchronously retrieves available vehicles based on the provided search criteria.
 * Simulates an API call with a delay.
 *
 * @param criteria The search criteria to use when finding vehicles.
 * @returns A promise that resolves to an array of Vehicle objects.
 */
export async function findAvailableVehicles(criteria: VehicleSearchCriteria): Promise<Vehicle[]> {
  console.log("Searching for vehicles with criteria:", criteria); // Log criteria for debugging
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  // Simulate API response - return different vehicles based on simple criteria matching
  // In a real app, this logic would be on the server/API side.
  const allVehicles: Vehicle[] = [
     {
      id: '1',
      model: 'Maruti Suzuki Swift',
      dailyRate: 2200,
      imageUrl: `https://picsum.photos/seed/swift/400/300`, // Use model name as seed
      dataAiHint: 'compact hatchback car silver'
    },
    {
      id: '2',
      model: 'Hyundai Creta',
      dailyRate: 3000,
       imageUrl: `https://picsum.photos/seed/creta/400/300`,
      dataAiHint: 'suv compact white'
    },
    {
      id: '3',
      model: 'Mahindra Thar',
      dailyRate: 3800,
      imageUrl: `https://picsum.photos/seed/thar/400/300`,
      dataAiHint: 'offroad suv jeep black'
    },
    {
      id: '4',
      model: 'Toyota Innova Crysta',
      dailyRate: 4500,
       imageUrl: `https://picsum.photos/seed/innova/400/300`,
      dataAiHint: 'mpv family car grey'
    },
     {
      id: '5',
      model: 'Tata Nexon EV',
      dailyRate: 3200,
      imageUrl: `https://picsum.photos/seed/nexon/400/300`,
      dataAiHint: 'electric suv blue compact'
    },
  ];

  // Simple filter simulation (e.g., return fewer cars for certain locations)
  if (criteria.pickupLocation.toLowerCase().includes('remote')) {
     // Simulate fewer options for remote locations
     return allVehicles.filter(v => v.model.includes('Mahindra') || v.model.includes('Toyota'));
  }

  // Simulate finding no vehicles if dates are too close
  const dayDiff = (criteria.dropoffDate.getTime() - criteria.pickupDate.getTime()) / (1000 * 3600 * 24);
  if (dayDiff < 1) { // Less than 1 day rental not allowed in simulation
    return [];
  }


  // Default: return a subset for variety, simulating availability
  // Sort randomly and take a slice
  const shuffled = allVehicles.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * (allVehicles.length - 1)) + 2); // Return 2 to all vehicles
}
