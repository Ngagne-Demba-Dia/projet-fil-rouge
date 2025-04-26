import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    host: true, // écoute sur 0.0.0.0
    port: 5173, // (optionnel) précise le port si tu veux
  },
});
