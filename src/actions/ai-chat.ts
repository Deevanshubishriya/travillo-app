
'use server';

import { askUttarakhandQuestion, type UttarakhandInfoInput, type UttarakhandInfoOutput } from '@/ai/flows/uttarakhand-info-flow';

interface ChatActionResult {
  success: boolean;
  response?: string;
  error?: string;
}

export async function handleUserChatQuery(query: string): Promise<ChatActionResult> {
  if (!query || query.trim().length === 0) {
    return { success: false, error: "Query cannot be empty." };
  }

  try {
    const input: UttarakhandInfoInput = { query };
    const result: UttarakhandInfoOutput = await askUttarakhandQuestion(input);
    return { success: true, response: result.response };
  } catch (error) {
    console.error("Error processing chat query with Genkit flow:", error);
    let errorMessage = "An unexpected error occurred while processing your request.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}
