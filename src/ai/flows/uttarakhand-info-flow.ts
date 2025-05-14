
'use server';
/**
 * @fileOverview A Genkit flow to answer questions about Uttarakhand.
 *
 * - askUttarakhandQuestion - A function that handles queries about Uttarakhand.
 * - UttarakhandInfoInput - The input type for the askUttarakhandQuestion function.
 * - UttarakhandInfoOutput - The return type for the askUttarakhandQuestion function.
 */

import {ai} from '@/ai/ai-instance'; // Use pre-configured ai instance
import {z} from 'genkit';

const UttarakhandInfoInputSchema = z.object({
  query: z.string().describe('The user query about Uttarakhand.'),
});
export type UttarakhandInfoInput = z.infer<typeof UttarakhandInfoInputSchema>;

const UttarakhandInfoOutputSchema = z.object({
  response: z.string().describe('The AI-generated answer about Uttarakhand.'),
});
export type UttarakhandInfoOutput = z.infer<typeof UttarakhandInfoOutputSchema>;

export async function askUttarakhandQuestion(input: UttarakhandInfoInput): Promise<UttarakhandInfoOutput> {
  return uttarakhandInfoFlow(input);
}

const prompt = ai.definePrompt({
  name: 'uttarakhandInfoPrompt',
  input: {schema: UttarakhandInfoInputSchema},
  output: {schema: UttarakhandInfoOutputSchema},
  prompt: `You are Travillo AI, a friendly and knowledgeable assistant for the Travillo website.
Your ONLY expertise is providing information about the state of Uttarakhand, India. This includes its geography, culture, tourism, history, hidden gems, travel tips, local cuisine, wildlife, and any other aspects related to Uttarakhand.

If a user asks a question that is NOT about Uttarakhand, you MUST politely decline to answer and gently remind them that your knowledge is limited to Uttarakhand.
Do not attempt to answer questions about other topics, general knowledge, or engage in off-topic conversations.

User's question about Uttarakhand: {{{query}}}

Provide a helpful and concise answer based on this query.
`,
});

const uttarakhandInfoFlow = ai.defineFlow(
  {
    name: 'uttarakhandInfoFlow',
    inputSchema: UttarakhandInfoInputSchema,
    outputSchema: UttarakhandInfoOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      return { response: "I'm sorry, I couldn't generate a response for that. Please try rephrasing your question about Uttarakhand." };
    }
    return output;
  }
);
