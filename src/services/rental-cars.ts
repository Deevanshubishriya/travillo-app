
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
   * Maximum passenger capacity of the vehicle.
   */
  maxCapacity?: number;
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
  /**
   * Optional. The number of travelers for the rental.
   */
  numberOfTravelers?: number;
}

/**
 * Asynchronously retrieves available vehicles based on the provided search criteria.
 * Simulates an API call with a delay.
 *
 * @param criteria The search criteria to use when finding vehicles.
 * @returns A promise that resolves to an array of Vehicle objects.
 */
export async function findAvailableVehicles(criteria: VehicleSearchCriteria): Promise<Vehicle[]> {
  console.log("Searching for vehicles with criteria:", criteria);
  await new Promise(resolve => setTimeout(resolve, 1200));

  const allVehicles: Vehicle[] = [
     {
      id: '1',
      model: 'Maruti Suzuki Dzire',
      dailyRate: 2500,
      imageUrl: `https://placehold.co/400x300.png`,
      dataAiHint: 'sedan car white',
      maxCapacity: 5
    },
    {
      id: '2',
      model: 'Toyota Innova Crysta',
      dailyRate: 4500,
       imageUrl: `https://placehold.co/400x300.png`,
      dataAiHint: 'suv car silver',
      maxCapacity: 7
    },
    {
      id: '3',
      model: 'Mahindra Marazzo',
      dailyRate: 3800,
      imageUrl: `https://placehold.co/400x300.png`,
      dataAiHint: 'muv car blue',
      maxCapacity: 8
    },
    {
      id: '4',
      model: 'Tempo Traveller',
      dailyRate: 6000,
       imageUrl: `https://placehold.co/400x300.png`,
      dataAiHint: 'tempo traveller van',
      maxCapacity: 12
    },
     {
      id: '5',
      model: 'Honda Amaze',
      dailyRate: 2700,
      imageUrl: `https://placehold.co/400x300.png`,
      dataAiHint: 'sedan car red',
      maxCapacity: 5
    },
    {
      id: '6',
      model: 'Maruti Suzuki Ertiga',
      dailyRate: 3500,
      imageUrl: `https://placehold.co/400x300.png`,
      dataAiHint: 'muv car grey',
      maxCapacity: 7
    },
  ];

  const dayDiff = (criteria.dropoffDate.getTime() - criteria.pickupDate.getTime()) / (1000 * 3600 * 24);
  if (dayDiff < 1) {
    return [];
  }

  let filteredVehicles = allVehicles;

  if (criteria.numberOfTravelers && criteria.numberOfTravelers > 0) {
    filteredVehicles = filteredVehicles.filter(vehicle =>
      vehicle.maxCapacity && vehicle.maxCapacity >= criteria.numberOfTravelers!
    );
  }

  const shuffled = filteredVehicles.sort(() => 0.5 - Math.random());
  if (criteria.numberOfTravelers && criteria.numberOfTravelers > 0) {
      // If travelers filter is active, return all matches or a subset if too many
      return shuffled.slice(0, Math.max(2, Math.floor(Math.random() * shuffled.length) +1 ));
  }

  return shuffled.slice(0, Math.floor(Math.random() * (allVehicles.length - 1)) + 2);
}
