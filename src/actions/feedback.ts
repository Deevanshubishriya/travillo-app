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

    console.log("--- Feedback Received (Simulation) ---");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Feedback:", feedback);
    console.log("Intending to 'send' to:", recipientEmail);
    console.log("--------------------------------------");

    if (!feedback || feedback.trim().length === 0) {
        console.error("Feedback submission failed: Feedback message empty.");
        return { success: false, error: "Feedback message cannot be empty." };
    }

    // Simulate network delay for a potential external API call
    await new Promise(resolve => setTimeout(resolve, 700));

    // ** START: SIMULATION BLOCK **
    // This block simulates the process of sending an email.
    // In a real application, you would replace this with a call to your chosen email service provider's API.
    try {
        // --- Replace this section with actual email sending logic ---
        // Example conceptual implementation using Resend (requires setup):
        /*
        import { Resend } from 'resend';
        if (!process.env.RESEND_API_KEY) {
            throw new Error("RESEND_API_KEY environment variable is not set.");
        }
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: 'Feedback <feedback@yourverifieddomain.com>', // Replace with your verified sender
            to: [recipientEmail], // Uses the updated email address
            subject: `New Feedback from ${name} via Travillo`,
            html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr><p>${feedback.replace(/\n/g, '<br>')}</p>`,
        });
        console.log(`Real email successfully sent to ${recipientEmail}`);
        */
        // --- End of replacement section ---

        // If the code reaches here without throwing an error in the *real* implementation,
        // it means the email was likely sent successfully.
        console.log(`SIMULATION: Email successfully "sent" to ${recipientEmail}`);

        // Optionally, save to Firestore as well
        try {
            const docRef = await addDoc(collection(db, "feedback"), {
                name: name,
                email: email,
                feedback: feedback,
                submittedAt: serverTimestamp(),
                sentToEmail: recipientEmail // Optional: Track if email was intended
            });
            console.log("Feedback also saved to Firestore with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document to Firestore: ", e);
            // Decide how to handle Firestore error if email sending succeeded
            // If email is primary, maybe return success anyway but log the Firestore error?
            // If both are required, return failure if Firestore fails.
             return { success: false, error: "Feedback email sent (simulation) but failed to save to database." };
        }

        return { success: true };

    } catch (error) {
        // This catch block would handle errors from the *real* email sending service.
        console.error("SIMULATION: Error sending email:", error);
        // Log the failure more permanently or attempt to save to Firestore as a fallback.
        // Consider saving to Firestore even if email fails
        try {
             const docRef = await addDoc(collection(db, "feedback"), {
                 name: name,
                 email: email,
                 feedback: feedback,
                 submittedAt: serverTimestamp(),
                 emailSendFailed: true // Mark that email sending failed
             });
             console.log("Feedback saved to Firestore after email failure, ID: ", docRef.id);
             // Return success because it was saved, but indicate email failure?
             // Or return failure because the primary action (email) failed? Depends on requirements.
             return { success: false, error: "Failed to send feedback email (simulation), but feedback was saved to database." };
        } catch (dbError) {
             console.error("Error adding document to Firestore after email failure: ", dbError);
             return { success: false, error: "Failed to send feedback email (simulation) and failed to save to database." };
        }
    }
    // ** END: SIMULATION BLOCK **
}

// --- Notes on Implementing Real Email Sending ---
// 1. Choose a Service: Select an email provider (Resend, SendGrid, Mailgun, AWS SES, etc.).
// 2. Sign Up & Get API Key: Create an account and obtain an API key from the provider.
// 3. Verify Domain/Sender: Configure and verify your sending domain or email address with the provider. This is crucial for deliverability.
// 4. Install SDK: Install the provider's Node.js SDK (e.g., `npm install resend`).
// 5. Secure API Key: Store your API key securely as an environment variable (e.g., `RESEND_API_KEY` in `.env.local`). **Do not hardcode it.**
// 6. Implement Sending Logic: Replace the simulation block above with code that uses the SDK and your API key to send the email. Ensure proper error handling.
// 7. Security: Be mindful of rate limits and potential abuse. Consider adding CAPTCHA or other security measures to your form.
// 8. Firestore Integration: Decide on the desired behavior if Firestore saving fails or succeeds when email sending fails/succeeds.