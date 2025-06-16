
'use server';
/**
 * @fileOverview An AI flow to generate a detailed description of the Travillo website.
 *
 * - generateWebsiteDescription - A function that generates the website description.
 * - GenerateWebsiteDescriptionOutput - The return type for the generateWebsiteDescription function.
 */

import { ai } from '@/ai/ai-instance';
import { z } from 'genkit';

const GenerateWebsiteDescriptionOutputSchema = z.object({
  websiteDescription: z.string().describe('A detailed and engaging description of the Travillo website, formatted in Markdown.'),
});
export type GenerateWebsiteDescriptionOutput = z.infer<typeof GenerateWebsiteDescriptionOutputSchema>;

export async function generateWebsiteDescription(): Promise<GenerateWebsiteDescriptionOutput> {
  return websiteDescriptionFlow();
}

const descriptionPrompt = ai.definePrompt({
  name: 'generateTravilloDescriptionPrompt',
  output: { schema: GenerateWebsiteDescriptionOutputSchema },
  prompt: `You are a skilled marketing copywriter tasked with creating a comprehensive and engaging description of the "Travillo" website. Travillo is a travel platform designed to help users discover hidden gems, plan itineraries, and facilitate travel arrangements.

Based on the following key features and sections of the Travillo website, generate a detailed description. Highlight its unique selling points and the benefits it offers to travelers. The description should be suitable for an "About Us" page or a promotional summary.

Key Features & Sections:

*   **Homepage:**
    *   Inspiring hero section showcasing travel possibilities.
    *   Features highlighting:
        *   **Hidden Location Showcase:** Curated guides to lesser-known destinations.
        *   **Easy Transportation:** Vehicle rental search and booking (via partner).
        *   **Nearby Hotel Stays:** Hotel search and booking suggestions (via partners).
    *   **AI-Powered Itinerary Planner:** Specifically for Uttarakhand, India, allowing users to input destination, duration, and interests to get a custom travel plan.
    *   Feedback mechanism for user input.
    *   Call to action encouraging exploration.

*   **Locations Pages:**
    *   A browsable list of "hidden gem" locations with images, brief descriptions, and categories (e.g., village, trek, nature, spiritual).
    *   Detailed pages for each location, featuring:
        *   Larger image and in-depth description.
        *   Interactive map (Leaflet) showing the location's coordinates.
        *   Convenient links to "Find Rentals" and "Find Hotels Nearby" sections.

*   **Rentals Page:**
    *   Search functionality for vehicle rentals based on pickup/dropoff locations and dates.
    *   Displays available vehicles (e.g., sedans, SUVs, vans like Maruti Dzire, Toyota Innova) with daily rates, capacity, and images.
    *   Directs users to a partner website (Haridwar Taxi Rental) for actual booking.

*   **Hotels Page:**
    *   Search functionality for hotels by location name (e.g., village, city, landmark).
    *   Displays nearby hotels with images, star ratings, and booking suggestions (e.g., Booking.com, Agoda, MakeMyTrip).
    *   Links to external partner sites for booking.

*   **User Accounts:**
    *   Secure Login and Signup functionality (powered by Firebase).

*   **AI Integration:**
    *   The Itinerary Planner is a key AI feature, demonstrating personalized travel planning capabilities.

*   **Overall Goal:** To help users move beyond typical tourist trails and experience more authentic journeys, primarily focused on exploring Uttarakhand.

**Output Format:**
Produce a well-structured description in Markdown format. It should be engaging, informative, and highlight the benefits of using Travillo for travel planning.
Start with a captivating introduction, detail the core functionalities, and end with a concluding statement that encourages users to use the platform.

For example:
"Welcome to Travillo, your ultimate companion for..."
"Discover a world of untrodden paths with our Hidden Locations feature..."
"Planning your trip is a breeze with..."
"Travillo is more than just a travel site; it's your partner in crafting unforgettable adventures."
`,
});

const websiteDescriptionFlow = ai.defineFlow(
  {
    name: 'websiteDescriptionFlow',
    outputSchema: GenerateWebsiteDescriptionOutputSchema,
  },
  async () => {
    const { output } = await descriptionPrompt({}); // Pass empty object as per current prompt setup
    if (!output) {
        throw new Error("Failed to generate website description: No output from prompt.");
    }
    return output;
  }
);
