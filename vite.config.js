import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001", // Replace with your API server
        changeOrigin: true,
        secure: false, // Set to true if using HTTPS and a valid certificate
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: remove '/api' prefix
      },
    },
  },
});
