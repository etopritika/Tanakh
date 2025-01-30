# Torah

React/Vite application for reading and exploring the Tanakh. This application is built to provide a seamless experience for users to browse sections, books, chapters, and verses, with advanced features like search, bookmarking, and user authentication.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Firebase Authentication Setup](#firebase-authentication-setup)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- 📖 Browse sections, books, chapters, and verses.
- 🔍 Full-text search with highlights.
- 📑 Bookmark and navigate to the last-read chapter.
- 📱 Responsive design for mobile and desktop.
- 🌐 Progressive Web App (PWA) support.
- ⚡ Built with modern React and Vite for fast performance.
- 🔐 **User authentication** with email/password, Google, and Facebook.

---

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Vite**: Fast build tool for modern web development.
- **Firebase Authentication**: Secure user authentication.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **Zustand**: Lightweight state management.
- **Radix UI**: Accessible and customizable UI components.
- **Zod**: Schema validation for forms.
- **Lucide React**: Icon library.
- **TypeScript**: For type safety.
- **Vite PWA Plugin**: Adds PWA capabilities.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/etopritika/Tanakh.git
   cd Tanakh
   ```

````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

---

## Usage

1. Open the application in your browser at `http://localhost:5173`.
2. Explore sections like **Torah**, **Neviim**, and **Ketuvim**.
3. Search for specific verses or chapters.
4. Bookmark chapters for easy navigation.
5. Register and sign in to save your bookmarks and personal preferences.

---

## Firebase Authentication Setup

To enable authentication, you need to configure Firebase for your project.

1. **Create a Firebase project** in the [Firebase Console](https://console.firebase.google.com/).
2. **Enable authentication providers** (Email/Password, Google, Facebook, etc.) in the Authentication section of your Firebase project.
3. **Add environment variables**:
   - In the root directory of your project, create a `.env` file with the following variables:
     ```env
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_firebase_app_id
     VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
     ```
4. **Configure OAuth providers** like Google and Facebook:
   - For Google, you'll need to enable the **Google provider** in Firebase and configure the consent screen in the [Google Cloud Console](https://console.cloud.google.com/).
   - For Facebook, you'll need to set up an app in [Facebook Developers](https://developers.facebook.com/), configure the app to use OAuth, and add your app's **App ID** and **App Secret** to Firebase.

---

## Project Structure

```
src/
├── components/       # Reusable React components
├── data/             # Static data for books and chapters
├── hooks/            # Custom React hooks
├── lib/              # Helper functions and utilities
├── pages/            # Application pages
├── store/            # State management (Zustand)
├── index.css         # Global styles
├── App.tsx           # Root component
└── main.tsx          # Application entry point
```

---

## Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the application for production.
- **`npm run preview`**: Preview the production build.
- **`npm run lint`**: Run ESLint to check for code issues.

---

## Acknowledgements

- **Radix UI** for accessible components.
- **Lucide React** for icons.
- **Zustand** for state management simplicity.

---
````
