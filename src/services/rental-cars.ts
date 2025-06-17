
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
 * Implements specific vehicle recommendations based on the number of travelers.
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
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/2018_Suzuki_Dzire_GL_1.2_Front.jpg/640px-2018_Suzuki_Dzire_GL_1.2_Front.jpg',
      dataAiHint: 'Dzire white',
      maxCapacity: 5
    },
    {
      id: '2',
      model: 'Toyota Innova Crysta',
      dailyRate: 4500,
       imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/2020_Toyota_Innova_Crysta_2.4_G_Diesel_Automatic_%28GUN142%29.jpg/640px-2020_Toyota_Innova_Crysta_2.4_G_Diesel_Automatic_%28GUN142%29.jpg',
      dataAiHint: 'Innova Crysta white',
      maxCapacity: 7
    },
    {
      id: '3',
      model: 'Mahindra Marazzo',
      dailyRate: 3800,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Mahindra_Marazzo_-_M2_variant_-_Front.jpg/640px-Mahindra_Marazzo_-_M2_variant_-_Front.jpg',
      dataAiHint: 'Marazzo maroon',
      maxCapacity: 8
    },
    {
      id: '4',
      model: 'Tempo Traveller',
      dailyRate: 6000,
       imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Force_Traveller_3350_School_Bus_in_India.jpg/640px-Force_Traveller_3350_School_Bus_in_India.jpg',
      dataAiHint: 'Tempo Traveller white',
      maxCapacity: 12
    },
     {
      id: '5',
      model: 'Honda Amaze',
      dailyRate: 2700,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Honda_Amaze_VX_i-DTEC_Earth_Dreams_Diesel.JPG/640px-Honda_Amaze_VX_i-DTEC_Earth_Dreams_Diesel.JPG',
      dataAiHint: 'Amaze silver',
      maxCapacity: 5
    },
    {
      id: '6',
      model: 'Maruti Suzuki Ertiga',
      dailyRate: 3500,
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/2018_Suzuki_Ertiga_GL_1.5_GX_Automatic_%28Indonesia%29_front_view_01.jpg/640px-2018_Suzuki_Ertiga_GL_1.5_GX_Automatic_%28Indonesia%29_front_view_01.jpg',
      dataAiHint: 'Ertiga red',
      maxCapacity: 7
    },
  ];

  const dayDiff = (criteria.dropoffDate.getTime() - criteria.pickupDate.getTime()) / (1000 * 3600 * 24);
  if (dayDiff < 1) {
    console.log("Invalid date range, returning empty list.");
    return [];
  }

  let finalFilteredVehicles: Vehicle[] = [];

  if (criteria.numberOfTravelers && criteria.numberOfTravelers > 0) {
    const numTravelers = criteria.numberOfTravelers;
    console.log(`Filtering for ${numTravelers} travelers.`);

    // 1. Filter by general capacity first
    const capableVehicles = allVehicles.filter(vehicle =>
      vehicle.maxCapacity && vehicle.maxCapacity >= numTravelers
    );
    console.log("Capable vehicles after initial capacity filter:", capableVehicles.map(v => v.model));

    // 2. Apply preferential model filtering
    if (numTravelers <= 5) {
      console.log("Applying preference for <= 5 travelers.");
      finalFilteredVehicles = capableVehicles.filter(v =>
        v.model === 'Maruti Suzuki Dzire' || v.model === 'Honda Amaze'
      );
    } else if (numTravelers <= 9) { // This means 6 to 9 travelers
      console.log("Applying preference for 6-9 travelers.");
      finalFilteredVehicles = capableVehicles.filter(v =>
        v.model === 'Toyota Innova Crysta' || v.model === 'Mahindra Marazzo' || v.model === 'Maruti Suzuki Ertiga'
      );
    } else { // numTravelers > 9
      console.log("Applying preference for > 9 travelers.");
      finalFilteredVehicles = capableVehicles.filter(v =>
        v.model === 'Tempo Traveller'
      );
    }
    console.log("Vehicles after preferential model filter:", finalFilteredVehicles.map(v => v.model));
  } else {
    // No traveler preference, or invalid traveler number (already handled by UI validation for positive)
    // consider all vehicles.
    console.log("No specific traveler count preference, considering all vehicles.");
    finalFilteredVehicles = allVehicles;
  }

  // Shuffle the final list of vehicles
  const shuffledVehicles = finalFilteredVehicles.sort(() => 0.5 - Math.random());
  console.log("Returning shuffled vehicles:", shuffledVehicles.map(v => v.model));
  
  // Return all matched and shuffled preferred vehicles.
  // If you want to limit the number of results (e.g., max 3), you can slice it:
  // return shuffledVehicles.slice(0, 3); 
  return shuffledVehicles;
}

