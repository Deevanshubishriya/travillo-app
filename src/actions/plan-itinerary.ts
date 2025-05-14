'use server';

import { planItinerary, type PlanItineraryInput, type PlanItineraryOutput } from '@/ai/flows/plan-itinerary-flow';

interface ItineraryActionResult {
    success: boolean;
    itineraryPlan?: string;
    error?: string;
}

export async function generateItineraryAction(
    destination: string,
    duration: number,
    interests: string
): Promise<ItineraryActionResult> {
    if (!destination || !interests || duration <= 0) {
        return { success: false, error: "Please provide a valid destination, duration, and interests." };
    }

    const input: PlanItineraryInput = {
        destination,
        duration,
        interests,
    };

    try {
        const result: PlanItineraryOutput = await planItinerary(input);
        if (result.itineraryPlan.toLowerCase().startsWith("error:")) {
             return { success: false, error: result.itineraryPlan };
        }
        return { success: true, itineraryPlan: result.itineraryPlan };
    } catch (e: any) {
        console.error("Error generating itinerary:", e);
        return { success: false, error: "Failed to generate itinerary. Please try again later." };
    }
}
