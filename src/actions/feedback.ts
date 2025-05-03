
'use server';

// Simulate saving feedback to a database or logging service
// In a real application, you would integrate with Firestore, a logging service, or an email API.

interface FeedbackSubmissionResult {
    success: boolean;
    error?: string;
}

export async function submitFeedback(formData: FormData): Promise<FeedbackSubmissionResult> {
    const name = formData.get('name') as string || 'Anonymous';
    const email = formData.get('email') as string || 'No email provided';
    const feedback = formData.get('feedback') as string;

    console.log("--- Feedback Received ---");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Feedback:", feedback);
    console.log("-------------------------");

    if (!feedback || feedback.trim().length === 0) {
        return { success: false, error: "Feedback message cannot be empty." };
    }

    // Simulate potential processing delay or network latency
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate potential errors during submission (e.g., database issue)
    // if (Math.random() > 0.8) { // Simulate a 20% chance of failure
    //   console.error("Simulated feedback submission error.");
    //   return { success: false, error: "Failed to save feedback due to a simulated server issue." };
    // }

    // In a real app:
    // 1. Validate data more thoroughly (e.g., email format).
    // 2. Save to Firestore:
    //    try {
    //      const docRef = await addDoc(collection(db, "feedback"), {
    //        name: name,
    //        email: email,
    //        feedback: feedback,
    //        submittedAt: serverTimestamp(),
    //      });
    //      console.log("Feedback saved with ID: ", docRef.id);
    //    } catch (e) {
    //      console.error("Error adding document: ", e);
    //      return { success: false, error: "Database error occurred while saving feedback." };
    //    }
    // 3. Or send an email notification, log to a service, etc.

    return { success: true };
}
