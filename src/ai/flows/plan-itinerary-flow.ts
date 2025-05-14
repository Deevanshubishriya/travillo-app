
'use server';
/**
 * @fileOverview An AI-powered itinerary planner for Uttarakhand.
 *
 * - planItinerary - A function that handles the itinerary planning process.
 * - PlanItineraryInput - The input type for the planItinerary function.
 * - PlanItineraryOutput - The return type for the planItinerary function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

const PlanItineraryInputSchema = z.object({
  destination: z.string().describe('The main destination in Uttarakhand (e.g., Rishikesh, Auli, Nainital).'),
  duration: z.number().int().positive().describe('The duration of the trip in days (e.g., 3, 5, 7).'),
  interests: z.string().describe('Comma-separated list of interests (e.g., trekking, spirituality, wildlife, local cuisine, adventure sports).'),
});
export type PlanItineraryInput = z.infer<typeof PlanItineraryInputSchema>;

const PlanItineraryOutputSchema = z.object({
  itineraryPlan: z.string().describe('A detailed day-by-day itinerary plan, formatted in markdown. Include suggestions for activities, places to visit, and potentially food.'),
});
export type PlanItineraryOutput = z.infer<typeof PlanItineraryOutputSchema>;

// Exported async wrapper function
export async function planItinerary(input: PlanItineraryInput): Promise<PlanItineraryOutput> {
  return planItineraryFlow(input);
}

const itineraryPrompt = ai.definePrompt({
  name: 'planItineraryPrompt',
  input: { schema: PlanItineraryInputSchema },
  output: { schema: PlanItineraryOutputSchema },
  prompt: `You are an expert travel planner specializing in Uttarakhand, India.
Generate a day-by-day itinerary based on the following details:

Destination: {{{destination}}}
Duration: {{{duration}}} days
Interests: {{{interests}}}

Please provide a practical and engaging itinerary. Format the output as a single markdown string.
For each day, suggest activities, places to visit, and optionally, local food experiences.
If the destination is not in Uttarakhand, politely state that you specialize in Uttarakhand and cannot plan for that location.
If the duration is too short (e.g., 0 or negative), provide a polite error.
Be creative and helpful!
`,
});

const planItineraryFlow = ai.defineFlow(
  {
    name: 'planItineraryFlow',
    inputSchema: PlanItineraryInputSchema,
    outputSchema: PlanItineraryOutputSchema,
  },
  async (input) => {
    // Basic validation (can be enhanced)
    if (input.duration <= 0) {
      return { itineraryPlan: "Error: Duration must be a positive number of days." };
    }

    const { output } = await itineraryPrompt(input);
    if (!output) {
        return { itineraryPlan: "Sorry, I couldn't generate an itinerary at this time. Please try again."}
    }
    return output;
  }
);
