
'use server';

// IMPORTANT: This is a simulation. Sending email directly from a server action
// like this without a dedicated email service (like SendGrid, Resend, Mailgun)
// is generally not recommended for production due to security and deliverability issues.
// You would typically call an API route or a dedicated backend service here
// that securely handles email sending using an external provider.

// import { db } from '@/lib/firebase/firebase'; // Keep commented out unless you want both Firestore and email
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Keep commented out

interface FeedbackSubmissionResult {
    success: boolean;
    error?: string;
}

export async function submitFeedback(formData: FormData): Promise<FeedbackSubmissionResult> {
    const name = formData.get('name') as string || 'Anonymous';
    const email = formData.get('email') as string || 'No email provided';
    const feedback = formData.get('feedback') as string;
    const recipientEmail = "deevanshbishirya8126@gmail.com"; // The target email address

    console.log("--- Feedback Received ---");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Feedback:", feedback);
    console.log("Intending to send to:", recipientEmail);
    console.log("-------------------------");

    if (!feedback || feedback.trim().length === 0) {
        return { success: false, error: "Feedback message cannot be empty." };
    }

    // Simulate network delay for email sending API call
    await new Promise(resolve => setTimeout(resolve, 700));

    // ** SIMULATION: Log the email sending attempt **
    // In a real application, replace this section with a call to your email sending service/API.
    try {
        // Example using a hypothetical sendEmail function (replace with actual implementation)
        // await sendEmail({
        //   to: recipientEmail,
        //   from: "feedback@yourdomain.com", // Use a verified sender email
        //   subject: `New Feedback from ${name}`,
        //   text: `Name: ${name}\nEmail: ${email}\n\nFeedback:\n${feedback}`,
        //   html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr><p>${feedback.replace(/\n/g, '<br>')}</p>`, // Basic HTML version
        // });

        console.log(`SIMULATION: Email successfully "sent" to ${recipientEmail}`);
        // If you still want to save to Firestore as well, uncomment the block below
        /*
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
            // Maybe return success anyway, or indicate partial success?
        }
        */
        return { success: true };

    } catch (error) {
        console.error("SIMULATION: Error sending email:", error);
        // If using Firestore as well, you might still attempt to save it here
        // or log the failure more permanently.
        return { success: false, error: "Failed to send feedback email (simulation)." };
    }
}

// NOTE: Implementing a real `sendEmail` function requires:
// 1. Choosing an email service provider (e.g., Resend, SendGrid, Mailgun).
// 2. Installing their SDK (e.g., `npm install resend`).
// 3. Getting API keys from the provider and storing them securely as environment variables (e.g., in `.env.local`, NOT prefixed with NEXT_PUBLIC_ as they are server-side only).
// 4. Writing the server-side logic (likely in an API route or another server action) to use the SDK with your API key to send the email.
// Example using Resend (conceptual):
/*
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(options) {
  await resend.emails.send({
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
  });
}
*/
