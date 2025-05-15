
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
  /**
   * Capacity of the vehicle (e.g., "4 Seater", "7 Seater").
   */
  capacity?: string;
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
  // Vehicles updated to be more representative of haridwartaxirental.com
  const allVehicles: Vehicle[] = [
     {
      id: '1',
      model: 'Maruti Suzuki Dzire', // Common sedan
      dailyRate: 2500,
      imageUrl: `https://placehold.co/400x300.png`,
      dataAiHint: 'sedan car white',
      capacity: '4 Seater'
    },
    {
      id: '2',
      model: 'Toyota Innova Crysta', // Common MUV/SUV
      dailyRate: 4500,
       imageUrl: `https://placehold.co/400x300.png`,
      dataAiHint: 'suv car silver',
      capacity: '6-7 Seater'
    },
    {
      id: '3',
      model: 'Mahindra Marazzo', // MUV
      dailyRate: 3800,
      imageUrl: `https://placehold.co/400x300.png`,
      dataAiHint: 'muv car blue',
      capacity: '7 Seater'
    },
    {
      id: '4',
      model: 'Tempo Traveller', // Van
      dailyRate: 6000,
       imageUrl: `https://placehold.co/400x300.png`,
      dataAiHint: 'tempo traveller van',
      capacity: '12 Seater'
    },
     {
      id: '5',
      model: 'Honda Amaze', // Another common sedan
      dailyRate: 2700,
      imageUrl: `https://placehold.co/400x300.png`,
      dataAiHint: 'sedan car red',
      capacity: '4 Seater'
    },
    {
      id: '6',
      model: 'Maruti Suzuki Ertiga', // Common MUV
      dailyRate: 3500,
      imageUrl: `https://placehold.co/400x300.png`,
      dataAiHint: 'muv car grey',
      capacity: '7 Seater'
    },
  ];

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
