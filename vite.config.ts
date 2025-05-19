import path from "path";

import react from "@vitejs/plugin-react";
// import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";

const manifest: Partial<ManifestOptions> | false = {
  theme_color: "#faf3e8",
  background_color: "#faf3e8",
  icons: [
    {
      src: "icon192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "icon512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
  ],
  screenshots: [
    {
      src: "/screenshots/desktop.png",
      type: "image/png",
      sizes: "1919x822",
      form_factor: "wide",
    },
    {
      src: "/screenshots/mobile.png",
      type: "image/png",
      sizes: "288x631",
      form_factor: "narrow",
    },
  ],
  orientation: "any",
  display: "standalone",
  lang: "ru",
  name: "Torah",
  short_name: "Torah",
  start_url: "/",
  scope: "/",
  description: "An application for reading and exploring the Tanakh.",
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // visualizer({ open: true }),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{html,css,js,json,ico,png,svg}", "data/*.json"],
        runtimeCaching: [
          {
            urlPattern: /\/data\/.*\.json$/,
            handler: "CacheFirst",
            options: {
              cacheName: "book-json-cache",
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      manifest,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("firebase")) return "firebase";
            if (id.includes("react-router-dom")) return "router";
            if (id.includes("@radix-ui")) return "radix";
            if (id.includes("zod")) return "zod";
            if (id.includes("date-fns")) return "date";
            if (id.includes("zustand")) return "zustand";
            return "vendor";
          }
        },
      },
      treeshake: true,
    },
  },
});
