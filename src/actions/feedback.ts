
'use server';

import { db } from '@/lib/firebase/firebase'; // Keep uncommented if saving to Firestore
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Keep uncommented if saving to Firestore

interface FeedbackSubmissionResult {
    success: boolean;
    error?: string;
}

export async function submitFeedback(formData: FormData): Promise<FeedbackSubmissionResult> {
    const name = formData.get('name') as string || 'Anonymous';
    const email = formData.get('email') as string || 'No email provided';
    const feedback = formData.get('feedback') as string;
    const recipientEmail = "deevanshubishriya8126@gmail.com"; // Updated target email address

    console.log("--- Feedback Received ---");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Feedback:", feedback);
    console.log("Intending to 'send' email to:", recipientEmail);
    console.log("Saving to Firestore collection: feedback");
    console.log("-------------------------");

    if (!feedback || feedback.trim().length === 0) {
        console.error("Feedback submission failed: Feedback message empty.");
        return { success: false, error: "Feedback message cannot be empty." };
    }

    // Simulate network delay for a potential external API call
    await new Promise(resolve => setTimeout(resolve, 700));

    // ** START: EMAIL SIMULATION & FIRESTORE SAVE BLOCK **
    // This block simulates sending an email AND tries to save to Firestore.
    // Replace the email part with real email logic when ready.
    try {
        // --- Email Sending Simulation (Replace with real logic later) ---
        // This part currently does nothing except log.
        console.log(`SIMULATION: Pretending to send email to ${recipientEmail}`);
        // --- End of Email Sending Simulation ---

        // Attempt to save to Firestore
        try {
            const docRef = await addDoc(collection(db, "feedback"), {
                name: name,
                email: email,
                feedback: feedback,
                submittedAt: serverTimestamp(),
                sentToEmail: recipientEmail // Track intended recipient
            });
            console.log("Feedback successfully saved to Firestore with ID: ", docRef.id);
            // Since email is simulated, we return success if Firestore save works.
             return { success: true };
        } catch (e) {
            console.error("Error adding document to Firestore: ", e);
            // If Firestore fails, report the error.
            return { success: false, error: "Feedback email simulated, but failed to save to database. Check Firestore configuration or security rules." };
        }

    } catch (error) {
        // This catch block would handle errors from *real* email sending logic if it were implemented.
        // Since email sending is just a simulation, this block is less likely to be hit unless
        // the simulation code itself throws an unexpected error (unlikely).
        console.error("SIMULATION BLOCK: Unexpected error during simulated email sending:", error);

        // As a fallback, still try to save to Firestore even if the simulated email "failed".
        try {
             const docRef = await addDoc(collection(db, "feedback"), {
                 name: name,
                 email: email,
                 feedback: feedback,
                 submittedAt: serverTimestamp(),
                 emailSendFailed: true // Mark that simulated email sending failed
             });
             console.log("Feedback saved to Firestore after simulated email failure, ID: ", docRef.id);
             // Report failure because the primary (simulated) action failed, but note it was saved.
             return { success: false, error: "Failed to simulate sending feedback email, but feedback was saved to database. Check Firestore configuration or security rules." };
        } catch (dbError) {
             console.error("Error adding document to Firestore after simulated email failure: ", dbError);
             // Both simulation and Firestore save failed.
             return { success: false, error: "Failed to simulate sending feedback email AND failed to save to database. Check Firestore configuration or security rules." };
        }
    }
    // ** END: EMAIL SIMULATION & FIRESTORE SAVE BLOCK **
}

// --- Notes on Implementing Real Email Sending ---
// 1. Choose a Service: Select an email provider (Resend, SendGrid, Mailgun, AWS SES, etc.).
// 2. Sign Up & Get API Key: Create an account and obtain an API key.
// 3. Verify Domain/Sender: Configure and verify your sending domain/email.
// 4. Install SDK: `npm install resend` (or the SDK for your chosen provider).
// 5. Secure API Key: Store your API key in `.env.local` (e.g., `RESEND_API_KEY=your_key`). **Never hardcode it.**
// 6. Implement Sending Logic: Replace the simulation block above with code using the SDK.
// 7. Security: Consider rate limits and CAPTCHA.
// 8. Firestore Integration: Decide how to handle combined success/failure scenarios.
