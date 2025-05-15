import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: './', // ou base: '', selon ton besoin
  plugins: [tailwindcss(), react()],
  server: {
    host: true,
    port: 5173,
  },
});
