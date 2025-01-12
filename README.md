# Torah

React/Vite application for reading and exploring the Tanakh. This application is built to provide a seamless experience for users to browse sections, books, chapters, and verses, with advanced features like search and bookmarking.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
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

---

## Technologies Used

- **React**: Frontend library for building user interfaces.
- **Vite**: Fast build tool for modern web development.
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

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make changes and commit:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Create a Pull Request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgements

- **Radix UI** for accessible components.
- **Lucide React** for icons.
- **Zustand** for state management simplicity.

---
