
# How to Deploy Your Travillo App for FREE on Vercel
# Vercel par apni Travillo App ko FREE mein kaise live karein

This guide will walk you through deploying your Next.js application for free using Vercel.
Yeh guide aapko Vercel ka istemal karke apni Next.js application ko free mein deploy karne ka tareeka batayegi.

---

### **Part 1: Push Your Code to GitHub (Apna Code GitHub par Daalein)**

Vercel works best with GitHub. If your code is not already on GitHub, follow these steps.
Vercel GitHub ke saath sabse accha kaam karta hai. Agar aapka code pehle se GitHub par nahi hai, toh yeh steps follow karein.

1.  **Create a GitHub Account:**
    *   Go to [GitHub.com](https://github.com/) and create a free account if you don't have one.
    *   [GitHub.com](https://github.com/) par jaayein aur agar aapka account nahi hai toh ek free account banayein.

2.  **Create a New Repository:**
    *   On your GitHub dashboard, click the "+" icon in the top-right and select "New repository".
    *   Give it a name (e.g., `travillo-app`), make sure it's set to "Public" or "Private", and click "Create repository".
    *   Apne GitHub dashboard par, upar-right mein "+" icon par click karke "New repository" select karein.
    *   Isko ek naam dein (jaise `travillo-app`), "Public" ya "Private" chunein, aur "Create repository" par click karein.

3.  **Push Your Project Code:**
    *   Open your terminal in the project directory and run these commands. Replace `YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual details.
    *   Apne project directory mein terminal kholein aur yeh commands chalayein. `YOUR_GITHUB_USERNAME` aur `YOUR_REPOSITORY_NAME` ko apni details se badal dein.

    ```bash
    # Initialize git if you haven't already
    git init

    # Add all your files to be tracked
    git add .

    # Make your first commit (save point)
    git commit -m "Initial commit for Travillo project"

    # Connect your local project to the GitHub repository
    git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git

    # Push your code to GitHub
    git push -u origin main
    ```

---

### **Part 2: Deploy on Vercel (Vercel par Deploy Karein)**

Now that your code is on GitHub, deploying is easy.
Ab jab aapka code GitHub par hai, deployment aasan hai.

1.  **Sign up for Vercel:**
    *   Go to [Vercel.com](https://vercel.com/) and click "Sign Up". Choose "Continue with GitHub".
    *   [Vercel.com](https://vercel.com/) par jaayein aur "Sign Up" par click karein. "Continue with GitHub" chunein.

2.  **Import Your Project:**
    *   After signing up, you will be on your dashboard. Click "Add New..." and then "Project".
    *   Vercel will show your GitHub repositories. Find your `travillo-app` repository and click the "Import" button next to it.
    *   Sign up ke baad, aap apne dashboard par honge. "Add New..." par click karke "Project" chunein.
    *   Vercel aapke GitHub repositories dikhayega. Apni `travillo-app` repository dhoondhein aur uske paas "Import" button par click karein.

3.  **Configure Your Project (VERY IMPORTANT!):**
    *   Vercel will automatically detect that it's a Next.js project. You don't need to change the build settings.
    *   **You MUST add your Environment Variables.** Expand the "Environment Variables" section.
    *   Add each of the following variables one by one. You can find these values in your `.env.local` file and your Firebase/Google AI project settings.
    *   **Aapko apne Environment Variables add karne hi honge.** "Environment Variables" section ko kholein.
    *   Neeche diye gaye har variable ko ek-ek karke add karein. Yeh values aapko apni `.env.local` file aur Firebase/Google AI project settings mein milengi.

    *   `GOOGLE_GENAI_API_KEY`
    *   `NEXT_PUBLIC_FIREBASE_API_KEY`
    *   `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    *   `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    *   `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
    *   `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
    *   `NEXT_PUBLIC_FIREBASE_APP_ID`
    *   `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

4.  **Deploy!**
    *   Click the "Deploy" button.
    *   Vercel will now build and deploy your application. This might take a few minutes.
    *   "Deploy" button par click karein. Vercel ab aapki application ko build aur deploy karega. Ismein kuch minute lag sakte hain.

---

### **Part 3: Final Steps (Aakhri Kadam)**

1.  **Congratulations!**
    *   Once deployment is complete, Vercel will give you a public URL (like `travillo-app.vercel.app`). Your website is now live!
    *   Deployment poora hone par, Vercel aapko ek public URL dega. Aapki website ab live hai!

2.  **Add Domain to Firebase:**
    *   For Firebase Authentication (Login/Signup) to work on your live URL, you need to add your Vercel URL to the list of authorized domains in Firebase.
    *   Go to **Firebase Console** -> **Authentication** -> **Settings** tab -> **Authorized domains**.
    *   Click "Add domain" and enter your Vercel URL (e.g., `travillo-app.vercel.app`).
    *   Firebase Authentication ko live URL par kaam karne ke liye, aapko apna Vercel URL Firebase ke authorized domains mein add karna hoga.
    *   **Firebase Console** -> **Authentication** -> **Settings** tab -> **Authorized domains** par jaayein.
    *   "Add domain" par click karke apna Vercel URL (e.g., `travillo-app.vercel.app`) daalein.

Your website is now live and fully functional. Enjoy!
Aapki website ab live aur poori tarah se functional hai. Enjoy!
