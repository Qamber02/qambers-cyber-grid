import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath, URL } from "node:url"; // <-- IMPORT THIS

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      // "@": path.resolve(__dirname, "./src"), // <-- THIS IS THE OLD WAY
      "@": fileURLToPath(new URL("./src", import.meta.url)), // <-- THIS IS THE NEW FIX
    },
  },
}));